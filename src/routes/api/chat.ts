import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, type UIMessage } from "ai";
import { createResponsesCall } from "@/lib/ai/responses.server";
import { PRODUCTS, brl } from "@/lib/products";

const catalog = PRODUCTS.map((p) => `- ${p.name} (${p.unit}): ${brl(p.price)}`).join("\n");

const INSTRUCTIONS = `Você é a Dona Graça, atendente simpática da "Mercearia da Graça", uma lojinha online que vende arroz, feijão, macarrão e café.
Responda sempre em português do Brasil, de forma calorosa, curta e prática.
Catálogo atual (preços em reais):
${catalog}
Regras: só ofereça produtos do catálogo; nunca invente preços; ajude a montar a compra, somar valores e sugerir receitas simples com esses itens. Para finalizar a compra, oriente o cliente a usar o botão "Adicionar" nos produtos e o carrinho da página.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "IA não configurada." }, { status: 500 });
        const body = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(body.messages)) return Response.json({ error: "Mensagens inválidas." }, { status: 400 });
        const messages = await convertToModelMessages(body.messages);
        return createResponsesCall(
          request,
          { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, model: "openai/gpt-6-astra" },
          messages,
          INSTRUCTIONS,
        ).response();
      },
    },
  },
});
