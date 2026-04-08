export const readingExamQuestions = [
  {
    id: 1,
    topic: 'pronouns',
    type: 'multiple-choice',
    difficulty: 'easy',
    prompt: 'Choose the correct French pronoun for “they” (feminine).',
    options: ['elles', 'ils', 'vous'],
    correct: 0,
    explanation: '“Elles” is used for a feminine plural group.'
  },
  {
    id: 2,
    topic: 'articles',
    type: 'multiple-choice',
    difficulty: 'easy',
    prompt: 'Choose the correct article: ___ école',
    options: ['le', 'la', 'l’'],
    correct: 2,
    explanation: 'Use “l’” before a vowel.'
  },
  {
    id: 3,
    topic: 'nouns',
    type: 'multiple-choice',
    difficulty: 'easy',
    prompt: 'What does “la voiture rouge” mean?',
    options: ['the red car', 'the red house', 'the blue car'],
    correct: 0,
    explanation: '“La voiture rouge” means “the red car.”'
  },
  {
    id: 4,
    topic: 'verbs',
    type: 'multiple-choice',
    difficulty: 'medium',
    prompt: 'Choose the correct sentence.',
    options: ['Nous allons à l’école.', 'Nous allez à l’école.', 'Nous vont à l’école.'],
    correct: 0,
    explanation: 'With “nous”, the correct form of aller is “allons”.'
  },
  {
    id: 5,
    topic: 'sentence-structure',
    type: 'multiple-choice',
    difficulty: 'medium',
    prompt: 'Choose the sentence with the correct word order.',
    options: ['Je parle français.', 'Je français parle.', 'Parle je français.'],
    correct: 0,
    explanation: 'Basic French sentence order is subject + verb + complement.'
  },
  {
    id: 6,
    topic: 'prepositions',
    type: 'multiple-choice',
    difficulty: 'medium',
    prompt: 'Choose the correct sentence.',
    options: ['Le livre est sur la table.', 'Le livre est sous la table.', 'Le livre est avec la table.'],
    correct: 0,
    explanation: '“Sur” means “on”, so this is the best match.'
  },
  {
    id: 7,
    topic: 'adjectives-adverbs',
    type: 'multiple-choice',
    difficulty: 'medium',
    prompt: 'Which sentence uses an adverb correctly?',
    options: ['Il court rapide.', 'Il court rapidement.', 'Il rapidement court.'],
    correct: 1,
    explanation: '“Rapidement” is the correct adverb form.'
  },
  {
    id: 8,
    topic: 'negation',
    type: 'multiple-choice',
    difficulty: 'medium',
    prompt: 'Choose the correct negative sentence.',
    options: ['Je ne parle pas anglais.', 'Je pas parle anglais.', 'Je ne anglais parle pas.'],
    correct: 0,
    explanation: 'The correct negative structure is ne + verb + pas.'
  },
  {
    id: 9,
    topic: 'past-tense',
    type: 'multiple-choice',
    difficulty: 'hard',
    prompt: 'Choose the correct sentence in the passé composé.',
    options: ['Elle est arrivée tôt.', 'Elle a arrivée tôt.', 'Elle arrive tôt.'],
    correct: 0,
    explanation: '“Arriver” is an être verb in the passé composé.'
  },
  {
    id: 10,
    topic: 'reading-comprehension',
    type: 'short-passage',
    difficulty: 'hard',
    prompt:
      'Read the text: “Marie est allée au marché ce matin. Elle a acheté du pain et des fruits. Ensuite, elle est rentrée à la maison.” What did Marie do after going to the market?',
    options: [
      'She went to school.',
      'She bought bread and fruit, then went home.',
      'She stayed at the market all day.'
    ],
    correct: 1,
    explanation: 'The passage says she bought bread and fruit, then returned home.'
  },
  {
    id: 11,
    topic: 'verb-groups',
    type: 'multiple-choice',
    difficulty: 'medium',
    prompt: 'Which verb belongs to the 1st group?',
    options: ['parler', 'finir', 'être'],
    correct: 0,
    explanation: '“Parler” is a regular -er verb, so it belongs to the 1st group.'
  },
  {
    id: 12,
    topic: 'pronunciation-recognition',
    type: 'multiple-choice',
    difficulty: 'medium',
    prompt: 'Which word likely has the letter “s” pronounced like a “z” sound?',
    options: ['salut', 'maison', 'sport'],
    correct: 1,
    explanation: 'In “maison”, the s is between vowels, so it sounds like z.'
  },
  {
    id: 13,
    topic: 'prepositions',
    type: 'multiple-choice',
    difficulty: 'medium',
    prompt: 'Choose the correct sentence meaning “She comes from France.”',
    options: ['Elle vient à France.', 'Elle vient de France.', 'Elle vient en France.'],
    correct: 1,
    explanation: '“Venir de” means “to come from”.'
  },
  {
    id: 14,
    topic: 'adjectives',
    type: 'multiple-choice',
    difficulty: 'medium',
    prompt: 'Choose the correct sentence.',
    options: ['Une voiture rouge.', 'Une rouge voiture.', 'Rouge une voiture.'],
    correct: 0,
    explanation: 'Most descriptive adjectives like “rouge” come after the noun.'
  },
  {
    id: 15,
    topic: 'negation-past-tense',
    type: 'multiple-choice',
    difficulty: 'hard',
    prompt: 'Choose the correct negative sentence in the passé composé.',
    options: ['Je n’ai pas mangé.', 'Je ne mangé pas.', 'Je n’ai mangé pas.'],
    correct: 0,
    explanation:
      'In the passé composé, negation goes around the auxiliary verb: ne + auxiliary + pas + participle.'
  }
] as const

export type ReadingExamQuestion = (typeof readingExamQuestions)[number]
