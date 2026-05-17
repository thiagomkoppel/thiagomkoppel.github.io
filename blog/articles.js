// Bilingual article index.
// Add a new object for each article.
// Each article needs one Portuguese DOCX and one English DOCX.

const articles = [
  {
    id: "flamengo-volume-sem-veneno",
    category: {
      en: "Football Analytics",
      pt: "Análise de Futebol"
    },
    title: {
      en: "Volume Without Venom: Flamengo’s Finishing Efficiency Crisis",
      pt: "Volume sem veneno: a crise de eficiência ofensiva do Flamengo"
    },
    date: {
      en: "2026",
      pt: "2026"
    },
    readingTime: {
      en: "12 min read",
      pt: "12 min de leitura"
    },
    summary: {
      en: "An analysis of 46 shots, 4.57 xG and only 1 goal across Flamengo’s matches against Grêmio and Vitória.",
      pt: "Uma análise sobre 46 finalizações, 4,57 xG e apenas 1 gol nos jogos contra Grêmio e Vitória."
    },
    files: {
      en: "en/flamengo-volume-without-venom.docx",
      pt: "pt/flamengo-volume-sem-veneno.docx"
    },
    cover: ""
  }
];
