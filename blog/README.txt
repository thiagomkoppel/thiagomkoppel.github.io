BLOG SIMPLES PARA GITHUB PAGES
===============================

Como usar:

1. Coloque a pasta blog dentro da raiz do seu site:
   thiagomkoppel.github.io/blog/

2. A página principal será:
   https://thiagomkoppel.github.io/blog/

3. Para criar um novo artigo:
   - Crie um arquivo .txt dentro da pasta:
     blog/articles/

   Exemplo:
     meu-novo-artigo.txt

4. Abra o arquivo:
   blog/articles.js

5. Adicione um novo item na lista:

{
  id: "meu-novo-artigo",
  title: "Meu novo artigo",
  category: "Football Analytics",
  date: "2026",
  readingTime: "8 min de leitura",
  summary: "Resumo curto do artigo.",
  file: "meu-novo-artigo.txt",
  cover: ""
}

6. O link do artigo será:
   https://thiagomkoppel.github.io/blog/article.html?id=meu-novo-artigo

OBS:
- Os artigos aceitam títulos com #, ##, ###, tabelas simples e citações com >.
- O design foi feito para parecer mais simples, branco e jornalístico.
