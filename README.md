

Lojinha online que vende **arroz, feijão, macarrão e café**, com um assistente de
conversa chamado **Dona Graça** que responde de verdade usando IA.

## O que o projeto tem

- Vitrine com produtos e preços
- Carrinho para montar a compra
- Chat com a Dona Graça (ela conta preços, sugere receitas e ajuda a somar a compra)

## Requisitos

- **Node.js 20 ou mais novo** (recomendado: versão LTS) — baixe em <https://nodejs.org>
- **npm** (já vem junto com o Node.js)

## Como rodar no seu computador

```sh
npm install
npm run dev
```

Depois abra no navegador o endereço que aparece no terminal — normalmente
`http://localhost:5173`.

> Para parar, aperte `Ctrl + C` no terminal.

## Como gerar a versão final (para publicar)

```sh
npm run build
npm run preview
```

O `build` cria a pasta de publicação e o `preview` sobe o site pronto localmente
para conferir.

## A chave da IA — leia antes de rodar o chat

O robô de conversa precisa de uma chave secreta no servidor. O código procura a
variável **`LOVABLE_API_KEY`** (dentro do Lovable ela já existe automaticamente,
e por isso não está no repositório).

**Rodando no seu computador:** crie um arquivo chamado `.env` na pasta do projeto
com este conteúdo:

```
LOVABLE_API_KEY=sua-chave-aqui
```

**Sem essa chave a loja abre normalmente** — produtos, carrinho e visual
funcionam. Só o chat responde `IA não configurada.`

## Onde mexer

|
 Arquivo 
|
 O que faz 
|
|
---
|
---
|
|
`src/lib/products.ts`
|
 Lista de produtos e preços — é aqui que você troca a mercadoria 
|
|
`src/routes/index.tsx`
|
 Página da loja (vitrine e carrinho) 
|
|
`src/components/ShopBot.tsx`
|
 A janelinha do chat 
|
|
`src/routes/api/chat.ts`
|
 As instruções da Dona Graça e a chamada da IA 
|
|
`src/assets/`
|
 Imagens do site 
|

## Outros comandos

```sh
npm run lint      # verifica problemas no código
npm run format    # organiza a formatação do código
npm test          # roda os testes
```

## Aviso sobre GitHub Pages

O GitHub Pages só serve arquivos parados. Como o chat precisa de um servidor com
a chave da IA, no Pages a loja apareceria mas a Dona Graça não responderia. Para
ter o bot funcionando, publique em um serviço que rode o servidor do projeto.

## Feito com

TanStack Start · React 19 · TypeScript · Tailwind CSS v4 · AI SDK


















# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
