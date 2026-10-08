import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingBasket, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopBot } from "@/components/ShopBot";
import { PRODUCTS, brl } from "@/lib/products";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mercearia da Graça — arroz, feijão, macarrão e café" },
      { name: "description", content: "Lojinha de mercearia com atendente de IA que responde de verdade." },
      { property: "og:title", content: "Mercearia da Graça" },
      { property: "og:description", content: "Arroz, feijão, macarrão e café com atendimento por IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const change = (id: string, d: number) =>
    setCart((c) => {
      const n = Math.max(0, (c[id] ?? 0) + d);
      const next = { ...c, [id]: n };
      if (!n) delete next[id];
      return next;
    });
  const total = PRODUCTS.reduce((s, p) => s + (cart[p.id] ?? 0) * p.price, 0);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <h1 className="font-display text-2xl text-primary">Mercearia da Graça</h1>
        <div className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">
          <ShoppingBasket className="h-4 w-4" /> {count} itens · {brl(total)}
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-6">
        <img src={hero} alt="Arroz, feijão, macarrão e café" width={1600} height={912} className="h-72 w-full rounded-3xl object-cover md:h-96" />
        <div className="absolute inset-x-6 bottom-0 rounded-b-3xl bg-gradient-hero p-8">
          <p className="font-display text-4xl text-primary-foreground md:text-5xl">O básico bem feito.</p>
          <p className="mt-2 text-primary-foreground/85">Arroz, feijão, macarrão e café — e a Dona Graça pra te ajudar.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1fr_400px]">
        <div>
          <h2 className="mb-5 font-display text-3xl text-foreground">Produtos</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {PRODUCTS.map((p) => (
              <article key={p.id} className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-foreground">{p.category}</span>
                  <h3 className="mt-1 text-lg font-semibold text-card-foreground">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.unit}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-2xl text-primary">{brl(p.price)}</span>
                  {cart[p.id] ? (
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="outline" onClick={() => change(p.id, -1)} aria-label="Remover"><Minus className="h-4 w-4" /></Button>
                      <span className="w-6 text-center font-semibold">{cart[p.id]}</span>
                      <Button size="icon" onClick={() => change(p.id, 1)} aria-label="Adicionar mais"><Plus className="h-4 w-4" /></Button>
                    </div>
                  ) : (
                    <Button onClick={() => change(p.id, 1)}>Adicionar</Button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <ShopBot />
        </aside>
      </section>
    </main>
  );
}
