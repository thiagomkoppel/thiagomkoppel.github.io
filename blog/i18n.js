const translations = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navProjects: "Projects",
    navContact: "Contact",
    navBlog: "Blog",
    heroLabel: "Football Analytics Blog",
    heroTitle: "Articles about football, data and artificial intelligence.",
    heroText: "Simple and objective studies about performance analysis, xG, decision-making, data visualization and AI applications in football.",
    latestArticles: "Latest articles",
    latestDescription: "Texts published in a technical analysis format.",
    aboutBlogTitle: "About this blog",
    aboutBlogText: "This space brings together football analysis using data, AI in football, Python, video review and tactical interpretation.",
    publishTitle: "How publishing works",
    publishText: "",
    topicsTitle: "Topics",
    topics: ["Machine Learning", "Artificial Intelligence", "Computer Vision", "Python", "Football Analytics"],
    readMore: "Read article →",
    backToBlog: "← Back to blog",
    loadingArticle: "Loading article...",
    articleNotFound: "Article not found",
    articleNotFoundText: "Go back to the blog page and choose an available article.",
    fileErrorTitle: "Could not load the article file.",
    fileErrorHelp: "Check if the DOCX file exists inside the blog/articles folder."
  }
};

const currentLanguage = "en";

function getSavedLanguage() {
  return "en";
}

function setLanguage() {
  const html = document.documentElement;
  html.lang = "en";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");

    if (translations.en[key]) {
      element.textContent = translations.en[key];
    }
  });

  const topicsList = document.getElementById("topics-list");
  if (topicsList) {
    topicsList.innerHTML = translations.en.topics
      .map(topic => `<li>${topic}</li>`)
      .join("");
  }

  const backLink = document.getElementById("back-link");
  if (backLink) {
    backLink.textContent = translations.en.backToBlog;
    backLink.href = "index.html";
  }
}

function changeUrlLanguage() {
  const url = new URL(window.location.href);
  url.searchParams.delete("lang");
  window.history.replaceState({}, "", url);
}

setLanguage();
