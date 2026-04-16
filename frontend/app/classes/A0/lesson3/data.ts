/**
 * A0 Lesson 3 - French Greetings Data
 * ====================================
 *
 * This file contains the data for A0 Lesson 3: French Greetings.
 * It defines the greeting vocabulary, pronunciations, and section groupings
 * used in the lesson page.
 *
 * Data Structure:
 * ---------------
 * - Greeting interface: Type definition for greeting objects
 * - greetings array: All 16 greetings with French, English, phonetic, and audio
 * - Section interface: Type for grouping greetings into categories
 * - sections array: Defines the 3 sections (Basic Hellos, Farewells, Polite Conversation)
 *
 * Audio Files:
 * ------------
 * All audio files are stored in /public/audio/greetings/
 * Files are named according to the greeting id (e.g., bonjour.mp3)
 */

/**
 * Greeting Interface
 * ------------------
 * Defines the structure for a French greeting entry.
 *
 * @property id - Unique identifier (used for keys and audio file names)
 * @property french - The French greeting phrase
 * @property english - English translation/meaning
 * @property phonetic - Phonetic pronunciation guide
 * @property audioSrc - Path to the audio file
 */
export interface Greeting {
  id: string
  french: string
  english: string
  phonetic: string
  audioSrc: string
}

/**
 * Greetings Data Array
 * --------------------
 * Contains all 16 greetings taught in A0 Lesson 3.
 * Organized by category: Hellos (0-3), Farewells (4-10), Polite Conversation (11-15)
 */
export const greetings: Greeting[] = [
  // ===== BASIC HELLOS (indices 0-3) =====
  {
    id: "bonjour",
    french: "Bonjour",
    english: "Hello / Good morning",
    phonetic: "bohn-zhoor",
    audioSrc: "/audio/greetings/bonjour.mp3"
  },
  {
    id: "bonsoir",
    french: "Bonsoir",
    english: "Good evening",
    phonetic: "bohn-swahr",
    audioSrc: "/audio/greetings/bonsoir.mp3"
  },
  {
    id: "salut",
    french: "Salut",
    english: "Hi / Bye (informal)",
    phonetic: "sah-lu",
    audioSrc: "/audio/greetings/salut.mp3"
  },
  {
    id: "coucou",
    french: "Coucou",
    english: "Hey / Hi (very informal)",
    phonetic: "koo-koo",
    audioSrc: "/audio/greetings/coucou.mp3"
  },

  // ===== FAREWELLS (indices 4-10) =====
  {
    id: "au-revoir",
    french: "Au revoir",
    english: "Goodbye",
    phonetic: "oh ruh-vwahr",
    audioSrc: "/audio/greetings/au-revoir.mp3"
  },
  {
    id: "a-bientot",
    french: "À bientôt",
    english: "See you soon",
    phonetic: "ah byan-toh",
    audioSrc: "/audio/greetings/a-bientot.mp3"
  },
  {
    id: "a-demain",
    french: "À demain",
    english: "See you tomorrow",
    phonetic: "ah duh-man",
    audioSrc: "/audio/greetings/a-demain.mp3"
  },
  {
    id: "a-plus-tard",
    french: "À plus tard",
    english: "See you later",
    phonetic: "ah plu tar",
    audioSrc: "/audio/greetings/a-plus-tard.mp3"
  },
  {
    id: "bonne-nuit",
    french: "Bonne nuit",
    english: "Good night",
    phonetic: "bun nwee",
    audioSrc: "/audio/greetings/bonne-nuit.mp3"
  },
  {
    id: "bonne-journee",
    french: "Bonne journée",
    english: "Have a nice day",
    phonetic: "bun zhoor-nay",
    audioSrc: "/audio/greetings/bonne-journee.mp3"
  },
  {
    id: "bonne-soiree",
    french: "Bonne soirée",
    english: "Have a nice evening",
    phonetic: "bun swah-ray",
    audioSrc: "/audio/greetings/bonne-soiree.mp3"
  },

  // ===== POLITE CONVERSATION (indices 11-15) =====
  {
    id: "comment-ca-va",
    french: "Comment ça va ?",
    english: "How are you?",
    phonetic: "koh-mahn sah vah",
    audioSrc: "/audio/greetings/comment-ca-va.mp3"
  },
  {
    id: "ca-va-bien",
    french: "Ça va bien",
    english: "I'm doing well",
    phonetic: "sah vah byan",
    audioSrc: "/audio/greetings/ca-va-bien.mp3"
  },
  {
    id: "ca-va-mal",
    french: "Ça va mal",
    english: "I'm not doing well",
    phonetic: "sah vah mahl",
    audioSrc: "/audio/greetings/ca-va-mal.mp3"
  },
  {
    id: "enchante",
    french: "Enchanté / Enchantée",
    english: "Nice to meet you",
    phonetic: "ahn-shahn-tay",
    audioSrc: "/audio/greetings/enchante.mp3"
  },
  {
    id: "bienvenue",
    french: "Bienvenue",
    english: "Welcome",
    phonetic: "byan-vuh-new",
    audioSrc: "/audio/greetings/bienvenue.mp3"
  }
]

/**
 * Section Interface
 * -----------------
 * Defines a grouping of greetings for visual organization in the lesson.
 *
 * @property name - Display name for the section
 * @property start - Starting index in the greetings array (inclusive)
 * @property end - Ending index in the greetings array (exclusive)
 */
export interface Section {
  name: string
  start: number
  end: number
}

/**
 * Sections Data Array
 * -------------------
 * Defines how greetings are grouped into visual sections on the lesson page.
 * These groupings help learners organize greetings by function/purpose.
 */
export const sections: Section[] = [
  { name: "Basic Hellos", start: 0, end: 4 },      // First 4 greetings
  { name: "Farewells", start: 4, end: 11 },       // Next 7 greetings
  { name: "Polite Conversation", start: 11, end: 16 }  // Last 5 greetings
]
