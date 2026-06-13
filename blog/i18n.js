const translations = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navProjects: "Projects",
    navContact: "Contact",
    navBlog: "Blog",
    changeLanguage: "Change language",
    heroLabel: "Football Analytics Blog",
    heroTitle: "Articles about football, data and artificial intelligence.",
    heroText: "Simple and objective studies about performance analysis, xG, decision-making, data visualization and AI applications in football.",
    latestArticles: "Latest articles",
    latestDescription: "Texts published in a technical analysis format.",
    aboutBlogTitle: "About this blog",
    aboutBlogText: "This space brings together football analysis using data, AI in Football, Python, video review and tactical interpretation.",
    publishTitle: "How publishing works",
    publishText: "",
    topicsTitle: "Topics",
    topics: ["Machine Learning", "Artificial Inteligence", "Computer Vision", "Python", "Football Analytics"],
    readMore: "Read article →",
    backToBlog: "← Back to blog",
    loadingArticle: "Loading article...",
    articleNotFound: "Article not found",
    articleNotFoundText: "Go back to the blog page and choose an available article.",
    fileErrorTitle: "Could not load the article file.",
    fileErrorHelp: "Check if the DOCX file exists inside the blog/articles folder."
  },
  pt: {
    navHome: "Início",
    navAbout: "Sobre",
    navProjects: "Projetos",
    navContact: "Contato",
    navBlog: "Blog",
    changeLanguage: "Trocar idioma",
    heroLabel: "Blog de Análise de Futebol",
    heroTitle: "Artigos sobre futebol, dados e inteligência artificial.",
    heroText: "Estudos simples e objetivos sobre análise de desempenho, xG, tomada de decisão, visualização de dados e aplicações de IA no futebol.",
    latestArticles: "Últimos artigos",
    latestDescription: "Textos publicados em formato de análise técnica.",
    aboutBlogTitle: "Sobre o blog",
    aboutBlogText: "Este espaço reúne análises de futebol usando dados, IA no futebol, Python, revisão de vídeo e interpretação tática.",
    publishTitle: "Como publicar",
    publishText: "",
    topicsTitle: "Temas",
    topics: ["Machine Learning", "Artificial Inteligence", "Computer Vision", "Python", "Football Analytics"],
    readMore: "Ler artigo →",
    backToBlog: "← Voltar para o blog",
    loadingArticle: "Carregando artigo...",
    articleNotFound: "Artigo não encontrado",
    articleNotFoundText: "Volte para a página principal do blog e escolha um artigo disponível.",
    fileErrorTitle: "Não foi possível carregar o arquivo do artigo.",
    fileErrorHelp: "Verifique se o arquivo DOCX existe dentro da pasta blog/articles."
  }
};

function getSavedLanguage() {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get("lang");

  if (urlLang === "en" || urlLang === "pt") {
    localStorage.setItem("blogLanguage", urlLang);
    return urlLang;
  }

  return localStorage.getItem("blogLanguage");
}

function setLanguage(lang) {
  localStorage.setItem("blogLanguage", lang);

  const html = document.documentElement;
  html.lang = lang === "pt" ? "pt-BR" : "en";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  const changeButton = document.getElementById("change-language-button") || document.getElementById("switch-article-language");
  if (changeButton) {
    changeButton.textContent = translations[lang].changeLanguage;
  }

  const topicsList = document.getElementById("topics-list");
  if (topicsList) {
    topicsList.innerHTML = translations[lang].topics.map(topic => `<li>${topic}</li>`).join("");
  }

  const backLink = document.getElementById("back-link");
  if (backLink) {
    backLink.textContent = translations[lang].backToBlog;
    backLink.href = `index.html?lang=${lang}`;
  }
}

function changeUrlLanguage(lang) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url);
}
