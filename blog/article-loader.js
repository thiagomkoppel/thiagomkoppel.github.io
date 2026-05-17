function getSlugFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug");
}

function formatDate(dateValue) {
  if (!dateValue || dateValue.toLowerCase?.() === "em breve") return dateValue || "";

  const date = new Date(`${dateValue}T12:00:00`);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseInlineFormatting(text) {
  let html = escapeHtml(text);
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  return html;
}

function txtToHtml(text) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let listOpen = false;

  function closeList() {
    if (listOpen) {
      html.push("</ul>");
      listOpen = false;
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      closeList();
      continue;
    }

    if (line.startsWith("### ")) {
      closeList();
      html.push(`<h3>${parseInlineFormatting(line.slice(4))}</h3>`);
    } else if (line.startsWith("## ")) {
      closeList();
      html.push(`<h2>${parseInlineFormatting(line.slice(3))}</h2>`);
    } else if (line.startsWith("# ")) {
      closeList();
      html.push(`<h1>${parseInlineFormatting(line.slice(2))}</h1>`);
    } else if (line.startsWith("- ")) {
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${parseInlineFormatting(line.slice(2))}</li>`);
    } else if (line.startsWith("> ")) {
      closeList();
      html.push(`<blockquote>${parseInlineFormatting(line.slice(2))}</blockquote>`);
    } else {
      closeList();
      html.push(`<p>${parseInlineFormatting(line)}</p>`);
    }
  }

  closeList();
  return html.join("\n");
}

async function loadArticle() {
  const slug = getSlugFromUrl();
  const article = ARTICLES.find((item) => item.slug === slug);

  const titleEl = document.getElementById("article-title");
  const metaEl = document.getElementById("article-meta");
  const summaryEl = document.getElementById("article-summary");
  const tagsEl = document.getElementById("article-tags");
  const contentEl = document.getElementById("article-content");
  const coverEl = document.getElementById("article-cover");

  if (!article) {
    titleEl.textContent = "Artigo não encontrado";
    contentEl.innerHTML = `<p>Volte para a página principal do blog e selecione um artigo válido.</p>`;
    return;
  }

  document.title = `${article.title} | Thiago Koppel`;
  titleEl.textContent = article.title;
  summaryEl.textContent = article.summary;
  tagsEl.innerHTML = article.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
  metaEl.innerHTML = `
    <span>Por Thiago Koppel</span>
    <span>•</span>
    <span>${formatDate(article.date)}</span>
    <span>•</span>
    <span>${article.readTime}</span>
  `;
  coverEl.innerHTML = `<span>${article.category}</span>`;

  try {
    const response = await fetch(`articles/${article.file}`);

    if (!response.ok) {
      throw new Error("Não foi possível carregar o arquivo do artigo.");
    }

    const text = await response.text();
    contentEl.innerHTML = txtToHtml(text);
  } catch (error) {
    contentEl.innerHTML = `
      <p><strong>Erro ao carregar o artigo.</strong></p>
      <p>Confira se o arquivo <code>blog/articles/${article.file}</code> existe no repositório e se o nome está igual ao campo <code>file</code> em <code>articles.js</code>.</p>
    `;
  }
}

loadArticle();
