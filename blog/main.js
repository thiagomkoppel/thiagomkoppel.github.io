const list = document.getElementById("articles-list");
const topicsList = document.getElementById("topics-list");

const topics = [
  "Machine Learning",
  "Artificial Intelligence",
  "Computer Vision",
  "Python",
  "Software Engineering"
];

function articleUrl(article) {
  return `article.html?id=${encodeURIComponent(article.id)}`;
}

function renderTopics() {
  if (!topicsList) return;

  topicsList.innerHTML = topics
    .map(topic => `<li>${topic}</li>`)
    .join("");
}

function renderArticles() {
  if (!list) return;

  list.innerHTML = articles.map(article => {
    const thumb = article.cover
      ? `<img class="article-thumb" src="${article.cover}" alt="${article.title}">`
      : `<div class="article-thumb-placeholder">Article</div>`;

    return `
      <article class="article-card">
        <a href="${articleUrl(article)}">${thumb}</a>

        <div>
          <p class="section-label">${article.category}</p>
          <h3><a href="${articleUrl(article)}">${article.title}</a></h3>
          <p class="card-meta">${article.date} • ${article.readingTime}</p>
          <p class="article-summary">${article.summary}</p>
          <a class="read-more" href="${articleUrl(article)}">Read article →</a>
        </div>
      </article>
    `;
  }).join("");
}

renderTopics();
renderArticles();
