const list = document.getElementById("articles-list");

const currentLanguage = "en";

function articleUrl(article) {
  return `article.html?id=${encodeURIComponent(article.id)}`;
}

function getText(value) {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    return value.en || "";
  }

  return "";
}

function renderArticles() {
  if (!list) return;

  list.innerHTML = articles.map(article => {
    const thumb = article.cover
      ? `<img class="article-thumb" src="${article.cover}" alt="">`
      : `<div class="article-thumb-placeholder">Article</div>`;

    const category = getText(article.category);
    const title = getText(article.title);
    const date = getText(article.date);
    const readingTime = getText(article.readingTime);
    const summary = getText(article.summary);

    return `
      <article class="article-card">
        <a href="${articleUrl(article)}">${thumb}</a>

        <div>
          <p class="section-label">${category}</p>
          <h3><a href="${articleUrl(article)}">${title}</a></h3>
          <p class="card-meta">${date} • ${readingTime}</p>
          <p class="article-summary">${summary}</p>
          <a class="read-more" href="${articleUrl(article)}">Read more</a>
        </div>
      </article>
    `;
  }).join("");
}

renderArticles();
