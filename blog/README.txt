BILINGUAL DOCX BLOG FOR GITHUB PAGES
====================================

Folder structure:

blog/
  index.html
  article.html
  style.css
  main.js
  article-loader.js
  i18n.js
  articles.js
  articles/
    en/
      flamengo-volume-without-venom.docx
    pt/
      flamengo-volume-sem-veneno.docx

HOW IT WORKS
------------

1. When someone opens:
   https://thiagomkoppel.github.io/blog/

   They see a language selection screen:
   English / Português

2. After they choose a language, the blog loads in that language.

3. Each article has the same ID, but two DOCX files:
   one English file and one Portuguese file.

4. Example article URLs:
   English:
   https://thiagomkoppel.github.io/blog/article.html?id=flamengo-volume-sem-veneno&lang=en

   Portuguese:
   https://thiagomkoppel.github.io/blog/article.html?id=flamengo-volume-sem-veneno&lang=pt

HOW TO ADD A NEW ARTICLE
------------------------

1. Create two DOCX files:

   blog/articles/en/my-article.docx
   blog/articles/pt/meu-artigo.docx

2. Open:
   blog/articles.js

3. Add a new item:

{
  id: "my-article",
  category: {
    en: "Football Analytics",
    pt: "Análise de Futebol"
  },
  title: {
    en: "My English Title",
    pt: "Meu Título em Português"
  },
  date: {
    en: "2026",
    pt: "2026"
  },
  readingTime: {
    en: "8 min read",
    pt: "8 min de leitura"
  },
  summary: {
    en: "Short English summary.",
    pt: "Resumo curto em português."
  },
  files: {
    en: "en/my-article.docx",
    pt: "pt/meu-artigo.docx"
  },
  cover: ""
}

IMPORTANT
---------

- The browser does not read DOCX by itself.
- This blog uses Mammoth.js from a CDN:
  https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js

- This works on GitHub Pages, but it needs internet to load Mammoth.js.
- Keep DOCX formatting simple:
  Title, Heading 1, Heading 2, paragraphs, lists, tables, and images.
- Avoid complex Word layouts like text boxes, columns, shapes, and floating objects.

UPLOAD
------

Rename this folder to:

blog

Then upload it to the root of your GitHub Pages repository:

thiagomkoppel.github.io/
  index.html
  blog/
    index.html
    article.html
    ...
