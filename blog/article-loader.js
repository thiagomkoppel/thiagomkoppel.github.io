function getArticleId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || articles[0].id;
}

async function loadArticle() {
  const articleId = getArticleId();
  const article = articles.find(item => item.id === articleId);

  const title = document.getElementById("article-title");
  const category = document.getElementById("article-category");
  const meta = document.getElementById("article-meta");
  const content = document.getElementById("article-content");
  const coverWrapper = document.getElementById("article-cover-wrapper");
  const cover = document.getElementById("article-cover");

  if (!article) {
    title.textContent = "Artigo não encontrado";
    content.innerHTML = "<p>Volte para a página principal do blog e escolha um artigo disponível.</p>";
    return;
  }

  document.title = `${article.title} | Thiago Koppel`;
  title.textContent = article.title;
  category.textContent = article.category;
  meta.textContent = `${article.date} • ${article.readingTime}`;

  if (article.cover) {
    cover.src = article.cover;
    cover.alt = article.title;
    coverWrapper.classList.remove("hidden");
  }

  if (!window.mammoth) {
    content.innerHTML = `
      <p>Não foi possível carregar o leitor de arquivos .docx.</p>
      <p>Verifique sua conexão ou use a versão alternativa em .txt/.html.</p>
    `;
    return;
  }

  try {
    const response = await fetch(`articles/${article.file}`);
    if (!response.ok) throw new Error("Article file not found");

    const arrayBuffer = await response.arrayBuffer();

    const result = await mammoth.convertToHtml(
      { arrayBuffer },
      {
        styleMap: [
          "p[style-name='Title'] => h1:fresh",
          "p[style-name='Subtitle'] => p.subtitle:fresh",
          "p[style-name='Heading 1'] => h2:fresh",
          "p[style-name='Heading 2'] => h3:fresh",
          "p[style-name='Heading 3'] => h4:fresh",
          "b => strong",
          "i => em"
        ],
        convertImage: mammoth.images.imgElement(function(image) {
          return image.read("base64").then(function(imageBuffer) {
            return {
              src: "data:" + image.contentType + ";base64," + imageBuffer
            };
          });
        })
      }
    );

    content.innerHTML = result.value || "<p>O arquivo foi carregado, mas não havia conteúdo para exibir.</p>";

    if (result.messages && result.messages.length) {
      console.log("Mammoth conversion messages:", result.messages);
    }
  } catch (error) {
    content.innerHTML = `
      <p>Não foi possível carregar o arquivo do artigo.</p>
      <p>Verifique se o arquivo <strong>${article.file}</strong> existe dentro da pasta <strong>blog/articles/</strong>.</p>
      <p>Detalhe técnico: ${error.message}</p>
    `;
  }
}

loadArticle();
