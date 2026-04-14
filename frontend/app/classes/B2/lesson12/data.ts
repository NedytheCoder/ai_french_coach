// B2 Lesson 12 — Argumentation & Analysis
export const sectionIds = ["intro", "thesis", "evidence", "reasoning", "objection", "conclusion", "hedging", "practice", "completion"];

export const lessonMeta = {
  title: "Argumentation & Analysis",
  subtitle: "Master the language of critical thinking: thesis, evidence, reasoning, objection, and conclusion. Build persuasive, analytical discourse in French.",
  lessonNumber: 12,
};

export const introSections = [
  {
    title: "The Architecture of Argument",
    content: "B2 argumentation requires clear thesis statements, logical reasoning, evidence presentation, and acknowledgment of counterarguments. You move beyond opinion to structured, persuasive discourse.",
  },
  {
    title: "Rhetorical Strategies",
    content: "Argumentation uses connectors, hedging devices, emphasis techniques, and metadiscourse. These tools guide readers through your reasoning and establish your analytical authority.",
  },
];

export const thesisSection = {
  title: "Thesis Statement Formulations",
  explanation: "A clear thesis announces your position and previews your argument structure.",
  patterns: [
    { pattern: "Direct assertion", example: "Je soutiens que cette politique est nécessaire.", strength: "Clear, confident" },
    { pattern: "It appears that", example: "Il apparaît que les bénéfices dépassent les risques.", strength: "Measured, analytical" },
    { pattern: "The question is", example: "La question n'est pas de savoir si, mais comment.", strength: "Reframes debate" },
    { pattern: "This essay argues", example: "Cette analyse démontre que...", strength: "Academic register" },
  ],
};

export const evidenceSection = {
  title: "Introducing Evidence",
  explanation: "Evidence grounds arguments in reality. How you introduce it affects credibility.",
  markers: [
    { marker: "Selon X", meaning: "According to X", example: "Selon l'INSEE, le chômage a baissé.", note: "Attribute source" },
    { marker: "Les données montrent", meaning: "Data show", example: "Les données montrent une tendance claire.", note: "Empirical authority" },
    { marker: "Par exemple", meaning: "For example", example: "Par exemple, le cas de l'Allemagne...", note: "Illustration" },
    { marker: "En l'occurrence", meaning: "In this instance", example: "En l'occurrence, nous constatons...", note: "Specific case" },
    { marker: "Il est établi que", meaning: "It is established that", example: "Il est établi que le réchauffement s'accélère.", note: "Accepted fact" },
  ],
};

export const reasoningSection = {
  title: "Logical Reasoning Connectors",
  explanation: "Reasoning connectors make your logic explicit and transparent.",
  categories: [
    { category: "Deduction", markers: ["donc", "par conséquent", "dès lors", "il s'ensuit que"], example: "Il pleut; par conséquent, je reste." },
    { category: "Induction", markers: ["en général", "dans la plupart des cas", "il semble que"], example: "En général, les prix augmentent." },
    { category: "Analogy", markers: ["de même", "de façon similaire", "à l'instar de"], example: "De même, l'économie suit des cycles." },
    { category: "Causation", markers: ["parce que", "en raison de", "grâce à", "à cause de"], example: "Grâce à cette réforme, les résultats s'améliorent." },
  ],
};

export const objectionSection = {
  title: "Acknowledging and Refuting Objections",
  explanation: "Addressing counterarguments strengthens your position by showing you've considered alternatives.",
  strategies: [
    { strategy: "Concede then refute", pattern: "Certes... mais/cependant", example: "Certes, cette solution coûte cher; néanmoins, elle est durable." },
    { strategy: "Admit limitation", pattern: "Il est vrai que... toutefois", example: "Il est vrai que le délai est court; toutefois, c'est faisable." },
    { strategy: "Anticipate objection", pattern: "On pourrait objecter que... cependant", example: "On pourrait objecter que... cependant, les données prouvent..." },
    { strategy: "Reject entirely", pattern: "Cette critique néglige...", example: "Cette critique néglige l'aspect économique." },
  ],
};

export const conclusionSection = {
  title: "Conclusion Strategies",
  explanation: "Conclusions summarize, synthesize, and extend your argument.",
  techniques: [
    { technique: "Summary restatement", example: "En résumé, nous avons démontré que...", function: "Recap main points" },
    { technique: "Thesis echo", example: "Ainsi, comme nous l'avons soutenu...", function: "Return to opening" },
    { technique: "Extension", example: "Cette analyse ouvre des perspectives pour...", function: "Future implications" },
    { technique: "Call to action", example: "Il est impératif que nous agissions.", function: "Urgency" },
    { technique: "Rhetorical question", example: "Comment pourrions-nous ignorer ces faits?", function: "Engage reader" },
  ],
};

export const hedgingSection = {
  title: "Hedging and Qualification",
  explanation: "Hedging softens claims appropriately, showing intellectual honesty without weakening your position.",
  devices: [
    { device: "Modal adverbs", examples: ["probablement", "vraisemblablement", "peut-être", "sans doute"], example: "Cela réussira probablement." },
    { device: "Approximators", examples: ["environ", "à peu près", "plus ou moins"], example: "Environ 30% des cas." },
    { device: "Scope limiters", examples: ["en général", "dans la plupart des cas", "tendance"], example: "Dans la plupart des cas, cela fonctionne." },
    { device: "Probability markers", examples: ["il est probable que", "il semble que", "on peut supposer que"], example: "Il est probable que cette tendance continue." },
  ],
};

export const practiceQuestions = [
  { id: 1, topic: "thesis", prompt: "Formal thesis statement pattern:", options: ["Je soutiens que...", "Je pense que...", "Je crois que..."], correct: 0, explanation: "Je soutiens que = I maintain that (formal, strong)" },
  { id: 2, topic: "evidence", prompt: "'According to INSEE' in French:", options: ["Selon l'INSEE", "D'après l'INSEE", "Les deux sont corrects"], correct: 2, explanation: "Both selon and d'après work for attribution" },
  { id: 3, topic: "deduction", prompt: "Strong formal 'therefore':", options: ["par conséquent", "alors", "donc"], correct: 0, explanation: "Par conséquent = very formal therefore" },
  { id: 4, topic: "concession", prompt: "Pattern: 'Admittedly... however':", options: ["Certes... mais/cependant", "Peut-être... donc", "Sans doute... et"], correct: 0, explanation: "Certes... mais/cependant = concede then refute" },
  { id: 5, topic: "objection", prompt: "'One might object that...':", options: ["On pourrait objecter que...", "Tu dois objecter que...", "Il faut objecter que..."], correct: 0, explanation: "On pourrait = impersonal, polite objection" },
  { id: 6, topic: "conclusion", prompt: "'In summary' (formal):", options: ["En résumé", "Bref", "Finalement"], correct: 0, explanation: "En résumé = formal summary opening" },
  { id: 7, topic: "hedging", prompt: "Hedging adverb for 'probably':", options: ["probablement", "certainement", "sûrement"], correct: 0, explanation: "Probablement = softened certainty" },
  { id: 8, topic: "scope", prompt: "'In most cases' (scope limiter):", options: ["dans la plupart des cas", "toujours", "jamais"], correct: 0, explanation: "Dans la plupart des cas = qualified generalization" },
  { id: 9, topic: "established", prompt: "'It is established that' =", options: ["Il est établi que", "On sait que", "Je pense que"], correct: 0, explanation: "Il est établi que = accepted fact" },
  { id: 10, topic: "perspective", prompt: "'This opens perspectives for...' =", options: ["extension/implications", "summary", "concession"], correct: 0, explanation: "Opens perspectives = future implications" },
  { id: 11, topic: "analogy", prompt: "Connector for 'similarly':", options: ["de même", "cependant", "donc"], correct: 0, explanation: "De même = similarly/by the same token" },
  { id: 12, topic: "gratitude", prompt: "'Thanks to' (positive cause) =", options: ["grâce à", "à cause de", "malgré"], correct: 0, explanation: "Grâce à = positive cause (favorable)" },
  { id: 13, topic: "negative-cause", prompt: "'Because of' (negative) =", options: ["à cause de", "grâce à", "selon"], correct: 0, explanation: "À cause de = negative cause (unfavorable)" },
  { id: 14, topic: "reject", prompt: "To reject a criticism entirely:", options: ["Cette critique néglige...", "Cette critique a raison...", "Cette critique est bonne..."], correct: 0, explanation: "Cette critique néglige = this criticism ignores (rejection)" },
  { id: 15, topic: "appears", prompt: "'It appears that' (measured) =", options: ["Il apparaît que", "Je suis sûr que", "Certainement"], correct: 0, explanation: "Il apparaît que = measured, analytical tone" },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Argumentation language requires practice. Focus on thesis patterns (je soutiens que), evidence markers (selon), and concession structures (certes... mais).", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are developing argumentative skills. Focus on hedging devices and conclusion strategies for sophisticated discourse.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You command the language of argumentation. You can construct persuasive, analytical discourse with appropriate hedging and sophisticated connectors.", emoji: "🌟", color: "green" as const };
}
