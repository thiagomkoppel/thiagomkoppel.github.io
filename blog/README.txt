BLOG FOLDER STRUCTURE

Place this entire folder inside your GitHub Pages repository:

blog/
  index.html
  article.html
  style.css
  main.js
  article-loader.js
  articles.js
  articles/
    flamengo-volume-sem-veneno.txt
    como-avaliar-uma-finalizacao.txt

HOW TO OPEN THE BLOG

If your website is:
https://thiagomkoppel.github.io/

Your blog will be:
https://thiagomkoppel.github.io/blog/

HOW TO ADD A NEW ARTICLE

1. Create a new .txt file inside:
blog/articles/

Example:
blog/articles/nome-do-artigo.txt

2. Write your article using simple formatting:

# Main title
## Section title
### Subsection title
- Bullet point
> Highlight quote
**bold text**
*italic text*

3. Open blog/articles.js and add a new item:

{
  slug: "nome-do-artigo",
  title: "Título do artigo",
  date: "2026-05-20",
  readTime: "10 min de leitura",
  category: "Análise de Dados",
  tags: ["Flamengo", "xG"],
  summary: "Resumo curto do artigo.",
  file: "nome-do-artigo.txt",
  featured: false
}

4. Commit and push to GitHub.
