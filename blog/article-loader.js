function getArticleId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || articles[0].id;
}

let currentLanguage = getSavedLanguage() || "en";

function setArticleUrlLang(lang) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url);
}

async function loadArticle() {
  setLanguage(currentLanguage);
  setArticleUrlLang(currentLanguage);

  const articleId = getArticleId();
  const article = articles.find(item => item.id === articleId);

  const title = document.getElementById("article-title");
  const category = document.getElementById("article-category");
  const meta = document.getElementById("article-meta");
  const content = document.getElementById("article-content");
  const coverWrapper = document.getElementById("article-cover-wrapper");
  const cover = document.getElementById("article-cover");

  if (!article) {
    title.textContent = translations[currentLanguage].articleNotFound;
    content.innerHTML = `<p>${translations[currentLanguage].articleNotFoundText}</p>`;
    return;
  }

  document.title = `${article.title[currentLanguage]} | Thiago Koppel`;
  title.textContent = article.title[currentLanguage];
  category.textContent = article.category[currentLanguage];
  meta.textContent = `${article.date[currentLanguage]} • ${article.readingTime[currentLanguage]}`;

  if (article.cover) {
    cover.src = article.cover;
    cover.alt = article.title[currentLanguage];
    coverWrapper.classList.remove("hidden");
  }

  if (!window.mammoth) {
    content.innerHTML = `
      <p>${translations[currentLanguage].fileErrorTitle}</p>
      <p>Mammoth.js did not load. Check your internet connection.</p>
    `;
    return;
  }

  try {
    const response = await fetch(`articles/${article.files[currentLanguage]}`);
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
      <p>${translations[currentLanguage].fileErrorTitle}</p>
      <p>${translations[currentLanguage].fileErrorHelp}</p>
      <p><strong>File:</strong> articles/${article.files[currentLanguage]}</p>
      <p><strong>Details:</strong> ${error.message}</p>
    `;
  }
}

const switchButton = document.getElementById("switch-article-language");
if (switchButton) {
  switchButton.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "pt" : "en";
    localStorage.setItem("blogLanguage", currentLanguage);
    loadArticle();
  });
}

loadArticle();
