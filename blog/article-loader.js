function getArticleId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || articles[0].id;
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatInlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");
}

function markdownToHtml(markdown) {
  const lines = markdown.split("\n");
  let html = "";
  let inTable = false;
  let tableRows = [];

  function flushTable() {
    if (!inTable) return;
    const rows = tableRows.filter(row => row.trim() !== "");
    if (rows.length > 0) {
      html += "<table>";
      rows.forEach((row, index) => {
        if (row.includes("---")) return;
        const cells = row.split("|").map(cell => cell.trim()).filter(Boolean);
        if (cells.length === 0) return;
        const tag = index === 0 ? "th" : "td";
        html += "<tr>" + cells.map(cell => `<${tag}>${formatInlineMarkdown(cell)}</${tag}>`).join("") + "</tr>";
      });
      html += "</table>";
    }
    inTable = false;
    tableRows = [];
  }

  lines.forEach(line => {
    const trimmed = line.trim();

    if (trimmed.includes("|") && trimmed.startsWith("|")) {
      inTable = true;
      tableRows.push(trimmed);
      return;
    } else {
      flushTable();
    }

    if (!trimmed) return;

    if (trimmed.startsWith("# ")) {
      html += `<h1>${formatInlineMarkdown(trimmed.slice(2))}</h1>`;
    } else if (trimmed.startsWith("## ")) {
      html += `<h2>${formatInlineMarkdown(trimmed.slice(3))}</h2>`;
    } else if (trimmed.startsWith("### ")) {
      html += `<h3>${formatInlineMarkdown(trimmed.slice(4))}</h3>`;
    } else if (trimmed.startsWith("> ")) {
      html += `<blockquote>${formatInlineMarkdown(trimmed.slice(2))}</blockquote>`;
    } else {
      html += `<p>${formatInlineMarkdown(trimmed)}</p>`;
    }
  });

  flushTable();
  return html;
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

  try {
    const response = await fetch(`articles/${article.file}`);
    if (!response.ok) throw new Error("Article file not found");

    const markdown = await response.text();
    content.innerHTML = markdownToHtml(markdown);
  } catch (error) {
    content.innerHTML = `
      <p>Não foi possível carregar o arquivo do artigo.</p>
      <p>Verifique se o arquivo <strong>${article.file}</strong> existe dentro da pasta <strong>blog/articles/</strong>.</p>
    `;
  }
}

loadArticle();
