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
    cover: "assets/flamengo-volume-sem-veneno.png"
  },
    {
    id: "pitch_perfect_evaluating_segmentation_approaches_for_football_line_detection",
    category: {
      en: "Computer Vision / Artificial Intelligence",
      pt: "Computer Vision / Artificial Intelligence"
    },
    title: {
      en: "Pitch Perfect: Evaluating Segmentation Approaches for Football Line Detection",
      pt: "Pitch Perfect: Avaliando Abordagens de Segmentação para Detecção de Linhas em Futebol"
    },
    date: {
      en: "2026",
      pt: "2026"
    },
    readingTime: {
      en: "10 min read",
      pt: "10 min de leitura"
    },
    summary: {
      en: "This article examines the performance trade-offs between classical computer vision techniques and modern deep learning approaches",
      pt: "Este artigo examina as vantagens e limitações das técnicas de visão computacional clássica em comparação com métodos de aprendizado profundo"
    },
    files: {
      en: "en/pitch_perfect_evaluating_segmentation_approaches_for_football_line_detection.docx",
      pt: "pt/Pitch_Perfect_Avaliando_Abordagens_de_Segmentação_para_Detecção_de_Linhas_em_Futebol.docx"
    },
    cover: "assets/pitch_perfect_evaluating_segmentation_approaches_for_football_line_detection.png"
  }
];
