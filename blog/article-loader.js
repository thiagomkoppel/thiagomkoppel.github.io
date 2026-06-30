function getArticleId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || articles[0].id;
}

function getArticleFile(article) {
  return article.file || "";
}

function removeLanguageParameterFromUrl() {
  const url = new URL(window.location.href);

  if (url.searchParams.has("lang")) {
    url.searchParams.delete("lang");
    window.history.replaceState({}, "", url);
  }
}

async function loadArticle() {
  removeLanguageParameterFromUrl();

  const articleId = getArticleId();
  const article = articles.find(item => item.id === articleId);

  const title = document.getElementById("article-title");
  const category = document.getElementById("article-category");
  const meta = document.getElementById("article-meta");
  const content = document.getElementById("article-content");
  const coverWrapper = document.getElementById("article-cover-wrapper");
  const cover = document.getElementById("article-cover");

  if (!article) {
    document.title = "Article not found | Thiago Koppel";
    title.textContent = "Article not found";
    content.innerHTML = "<p>Go back to the blog page and choose an available article.</p>";
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
      <p>Could not load the article file.</p>
      <p>Mammoth.js did not load. Check your internet connection.</p>
    `;
    return;
  }

  const articleFile = getArticleFile(article);

  try {
    const response = await fetch(`articles/${articleFile}`);
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

    content.innerHTML = result.value || "<p>The file loaded, but no content was available.</p>";

    if (result.messages && result.messages.length) {
      console.log("Mammoth conversion messages:", result.messages);
    }
  } catch (error) {
    content.innerHTML = `
      <p>Could not load the article file.</p>
      <p>Check if the DOCX file exists inside the blog/articles folder.</p>
      <p><strong>File:</strong> articles/${articleFile}</p>
      <p><strong>Details:</strong> ${error.message}</p>
    `;
  }
}

loadArticle();
