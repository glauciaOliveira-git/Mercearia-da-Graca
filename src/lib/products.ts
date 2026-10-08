export type Product = { id: string; name: string; unit: string; price: number; category: string };

export const PRODUCTS: Product[] = [
  { id: "arroz-5", name: "Arroz Branco Tipo 1", unit: "pacote 5 kg", price: 27.9, category: "Arroz" },
  { id: "arroz-int", name: "Arroz Integral", unit: "pacote 1 kg", price: 8.5, category: "Arroz" },
  { id: "feijao-carioca", name: "Feijão Carioca", unit: "pacote 1 kg", price: 8.9, category: "Feijão" },
  { id: "feijao-preto", name: "Feijão Preto", unit: "pacote 1 kg", price: 9.5, category: "Feijão" },
  { id: "macarrao-esp", name: "Macarrão Espaguete", unit: "pacote 500 g", price: 4.99, category: "Macarrão" },
  { id: "macarrao-paraf", name: "Macarrão Parafuso", unit: "pacote 500 g", price: 5.49, category: "Macarrão" },
  { id: "cafe-trad", name: "Café Torrado e Moído Tradicional", unit: "pacote 500 g", price: 18.9, category: "Café" },
  { id: "cafe-forte", name: "Café Extra Forte", unit: "pacote 500 g", price: 21.5, category: "Café" },
];

export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
