function formatDate(dateValue) {
  if (!dateValue || dateValue.toLowerCase?.() === "em breve") return dateValue || "";

  const date = new Date(`${dateValue}T12:00:00`);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function createTag(tag) {
  return `<span class="tag">${tag}</span>`;
}

function renderArticles() {
  const grid = document.getElementById("article-grid");

  if (!grid) return;

  grid.innerHTML = ARTICLES.map((article) => {
    const tags = article.tags.map(createTag).join("");
    const href = article.date === "Em breve"
      ? "#"
      : `article.html?slug=${encodeURIComponent(article.slug)}`;
    const featuredClass = article.featured ? " featured-card" : "";

    return `
      <article class="article-card${featuredClass}">
        <div class="article-thumb">
          <span>${article.category}</span>
        </div>
        <div class="article-card-content">
          <div class="tags">${tags}</div>
          <h3>${article.title}</h3>
          <p>${article.summary}</p>
          <div class="meta">
            <span>${formatDate(article.date)}</span>
            <span>•</span>
            <span>${article.readTime}</span>
          </div>
          <a class="read-link" href="${href}">${article.date === "Em breve" ? "Em breve" : "Ler análise"} <span>→</span></a>
        </div>
      </article>
    `;
  }).join("");
}

renderArticles();
