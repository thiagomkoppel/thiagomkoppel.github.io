const languageScreen = document.getElementById("language-screen");
const blogContent = document.getElementById("blog-content");
const list = document.getElementById("articles-list");
const changeLanguageButton = document.getElementById("change-language-button");

let currentLanguage = getSavedLanguage();

function articleUrl(article, lang) {
  return `article.html?id=${encodeURIComponent(article.id)}&lang=${lang}`;
}

function renderArticles(lang) {
  if (!list) return;

  list.innerHTML = articles.map(article => {
    const thumb = article.cover
      ? `<img class="article-thumb" src="${article.cover}" alt="">`
      : `<div class="article-thumb-placeholder">Article</div>`;

    return `
      <article class="article-card">
        <a href="${articleUrl(article, lang)}">${thumb}</a>

        <div>
          <p class="section-label">${article.category[lang]}</p>
          <h3><a href="${articleUrl(article, lang)}">${article.title[lang]}</a></h3>
          <p class="card-meta">${article.date[lang]} • ${article.readingTime[lang]}</p>
          <p class="article-summary">${article.summary[lang]}</p>
          <a class="read-more" href="${articleUrl(article, lang)}">${translations[lang].readMore}</a>
        </div>
      </article>
    `;
  }).join("");
}

function showBlog(lang) {
  currentLanguage = lang;
  setLanguage(lang);
  changeUrlLanguage(lang);

  languageScreen.classList.add("hidden");
  blogContent.classList.remove("hidden");

  renderArticles(lang);
}

function showLanguageScreen() {
  languageScreen.classList.remove("hidden");
  blogContent.classList.add("hidden");
}

document.querySelectorAll(".language-choice").forEach(button => {
  button.addEventListener("click", () => {
    showBlog(button.dataset.lang);
  });
});

if (changeLanguageButton) {
  changeLanguageButton.addEventListener("click", () => {
    localStorage.removeItem("blogLanguage");
    showLanguageScreen();
  });
}

if (currentLanguage === "en" || currentLanguage === "pt") {
  showBlog(currentLanguage);
} else {
  showLanguageScreen();
}
