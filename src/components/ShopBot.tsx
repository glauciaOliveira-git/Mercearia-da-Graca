import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import botImg from "@/assets/bot.png";

export function ShopBot() {
  const [error, setError] = useState<string | null>(null);
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (e) => {
      const m = e.message || "";
      setError(m.includes("402") ? "Os créditos de IA acabaram." : m.includes("429") ? "Muitas mensagens, espere um pouquinho." : "Não consegui responder agora. Tente de novo.");
    },
  });
  const busy = status === "submitted" || status === "streaming";

  return (
    <div className="flex h-[620px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-warm">
      <div className="flex items-center gap-3 border-b border-border bg-primary px-5 py-3 text-primary-foreground">
        <img src={botImg} alt="Dona Graça" width={44} height={44} className="h-11 w-11 rounded-full bg-accent object-cover" />
        <div>
          <p className="font-display text-lg leading-tight">Dona Graça</p>
          <p className="text-xs opacity-80">Atendente com IA · responde na hora</p>
        </div>
      </div>
      <Conversation className="flex-1">
        <ConversationContent>
          {messages.length === 0 && (
            <ConversationEmptyState title="Oi! Posso ajudar?" description="Pergunte preços, peça sugestões ou monte sua compra do mês." />
          )}
          {messages.map((m) => (
            <Message from={m.role} key={m.id}>
              <MessageContent>
                {m.parts.map((p, i) => (p.type === "text" ? <MessageResponse key={i}>{p.text}</MessageResponse> : null))}
              </MessageContent>
            </Message>
          ))}
          {status === "submitted" && <Shimmer className="text-sm">Dona Graça está digitando...</Shimmer>}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="border-t border-border p-3">
        <PromptInput
          onSubmit={({ text }) => {
            if (!text?.trim() || busy) return;
            setError(null);
            sendMessage({ text });
          }}
        >
          <PromptInputTextarea autoFocus placeholder="Ex: quanto custa o café extra forte?" />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} onStop={stop} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
