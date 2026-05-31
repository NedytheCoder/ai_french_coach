# API Contract

**Project:** AI Language Coach  
**Base URL:** `https://ai-french-coach.vercel.app` (production) | `http://localhost:8000` (development)  
**Version:** v1  
**Auth:** Bearer JWT token in `Authorization: Bearer <token>` header

All request and response bodies are `application/json` unless noted.

---

## Conventions

- All timestamps are ISO 8601 UTC strings: `"2026-05-30T12:00:00Z"`
- All IDs are integers
- `400` — validation error (malformed request)
- `401` — unauthenticated
- `403` — authenticated but not authorised
- `404` — resource not found
- `422` — business logic error (e.g. language pair already exists)
- `500` — unexpected server error

---

## 1. Auth

### `POST /auth/register`

Create a new user account.

**Request**

| Field | Type | Required | Notes |
|---|---|---|---|
| `email` | string | Yes | Valid email |
| `password` | string | Yes | Min 8 characters |
| `display_name` | string | Yes | |
| `source_language_code` | string | Yes | IETF code, e.g. `"en"`, `"de"` |

```json
{
  "email": "learner@example.com",
  "password": "securepass123",
  "display_name": "Ahmed",
  "source_language_code": "ar"
}
```

**Response `201`**

```json
{
  "user": {
    "id": 1,
    "email": "learner@example.com",
    "display_name": "Ahmed",
    "source_language_code": "ar",
    "created_at": "2026-05-30T12:00:00Z"
  },
  "access_token": "<jwt>",
  "refresh_token": "<jwt>"
}
```

---

### `POST /auth/login`

**Request**

| Field | Type | Required |
|---|---|---|
| `email` | string | Yes |
| `password` | string | Yes |

**Response `200`**

```json
{
  "user": { "id": 1, "email": "...", "display_name": "Ahmed" },
  "access_token": "<jwt>",
  "refresh_token": "<jwt>"
}
```

---

### `POST /auth/refresh`

Exchange a refresh token for a new access token.

**Request**

```json
{ "refresh_token": "<jwt>" }
```

**Response `200`**

```json
{ "access_token": "<jwt>" }
```

---

### `POST /auth/logout`

Invalidate the refresh token server-side.

**Response `204`** — no body.

---

### `GET /auth/me`

Return the currently authenticated user.

**Response `200`**

```json
{
  "id": 1,
  "email": "learner@example.com",
  "display_name": "Ahmed",
  "source_language_code": "ar",
  "created_at": "2026-05-30T12:00:00Z"
}
```

---

## 2. Languages

### `GET /languages`

List all languages the platform supports.

**Response `200`**

```json
{
  "languages": [
    { "id": 1, "code": "en", "name": "English", "native_name": "English", "is_active": true, "is_rtl": false },
    { "id": 2, "code": "fr", "name": "French",  "native_name": "Français",  "is_active": true, "is_rtl": false },
    { "id": 3, "code": "de", "name": "German",  "native_name": "Deutsch",   "is_active": true, "is_rtl": false },
    { "id": 4, "code": "ar", "name": "Arabic",  "native_name": "العربية",   "is_active": true, "is_rtl": true  }
  ]
}
```

`is_rtl` indicates right-to-left script; the frontend must use this flag to set text direction.

---

## 3. User Language Pairs

### `GET /user/language-pairs`

List all language pairs for the authenticated user.

**Response `200`**

```json
{
  "pairs": [
    {
      "id": 7,
      "source_language": { "code": "en", "name": "English" },
      "target_language": { "code": "fr", "name": "French" },
      "current_level": "A1",
      "total_xp": 340,
      "streak_days": 5,
      "created_at": "2026-05-01T09:00:00Z"
    }
  ]
}
```

---

### `POST /user/language-pairs`

Add a new language pair for the user.

**Request**

| Field | Type | Required | Notes |
|---|---|---|---|
| `source_language_code` | string | Yes | Language the user knows |
| `target_language_code` | string | Yes | Language to learn |

```json
{
  "source_language_code": "en",
  "target_language_code": "ja"
}
```

**Response `201`**

```json
{
  "id": 8,
  "source_language": { "code": "en", "name": "English" },
  "target_language": { "code": "ja", "name": "Japanese" },
  "current_level": "A0",
  "total_xp": 0,
  "streak_days": 0,
  "created_at": "2026-05-30T12:00:00Z"
}
```

---

### `DELETE /user/language-pairs/{pair_id}`

Remove a language pair and all associated data.

**Response `204`** — no body.

---

## 4. Assessment

### `POST /assessment/start`

Begin a placement or progress assessment for a language pair.

**Request**

| Field | Type | Required | Notes |
|---|---|---|---|
| `pair_id` | integer | Yes | |
| `assessment_type` | string | Yes | `"placement"` or `"progress"` |
| `skills` | array of string | Yes | e.g. `["reading", "listening", "writing", "speaking"]` |

```json
{
  "pair_id": 7,
  "assessment_type": "placement",
  "skills": ["reading", "listening", "writing", "speaking"]
}
```

**Response `201`**

```json
{
  "assessment_id": 12,
  "questions": [
    {
      "id": "q1",
      "skill": "reading",
      "type": "multiple_choice",
      "level": "A0",
      "passage": "Bonjour",
      "question": "What does this word mean?",
      "options": ["Goodbye", "Hello", "Please"],
      "xp_reward": 10,
      "instructions": "Read carefully and select your answer"
    },
    {
      "id": "q2",
      "skill": "writing",
      "type": "open_response",
      "level": "A0",
      "question": "Write your name and age in the target language.",
      "placeholder": "Type here...",
      "xp_reward": 10,
      "instructions": "Write at least 3 words"
    }
  ]
}
```

---

### `POST /assessment/{assessment_id}/submit`

Submit all answers for an assessment.

**Request**

```json
{
  "answers": [
    { "question_id": "q1", "skill": "reading", "answer": "1" },
    { "question_id": "q2", "skill": "writing", "answer": "Je m'appelle Ahmed. J'ai 28 ans." }
  ]
}
```

**Response `200`**

```json
{
  "assessment_id": 12,
  "result": {
    "overall_level": "A1",
    "skill_levels": {
      "reading": "A1",
      "listening": "A0",
      "writing": "A1",
      "speaking": "A0"
    },
    "total_xp_awarded": 85,
    "feedback": "Great start! You have a solid reading foundation. Focus on listening next."
  }
}
```

---

### `GET /assessment/{assessment_id}/result`

Retrieve a previously completed assessment result.

**Response `200`** — same shape as `POST /assessment/{id}/submit` response.

---

## 5. Lessons

### `POST /lesson/generate`

Generate (or retrieve cached) a lesson for a language pair and level.

**Request**

| Field | Type | Required | Notes |
|---|---|---|---|
| `pair_id` | integer | Yes | |
| `level` | string | Yes | `"A0"` – `"C2"` |
| `lesson_type` | string | Yes | `"vocabulary"` \| `"grammar"` \| `"reading"` \| `"listening"` \| `"writing"` \| `"speaking"` |
| `topic` | string | No | Optional focus topic, e.g. `"greetings"` |

```json
{
  "pair_id": 7,
  "level": "A1",
  "lesson_type": "vocabulary",
  "topic": "food"
}
```

**Response `200`**

```json
{
  "lesson_id": 55,
  "pair_id": 7,
  "level": "A1",
  "lesson_type": "vocabulary",
  "title": "Food Vocabulary",
  "xp_reward": 25,
  "content": {
    "items": [
      {
        "target_word": "le pain",
        "source_translation": "bread",
        "example_sentence": "Je mange du pain le matin.",
        "example_translation": "I eat bread in the morning."
      }
    ]
  },
  "is_completed": false,
  "created_at": "2026-05-30T12:00:00Z"
}
```

The shape of `content` varies by `lesson_type`. The `content` field is always a JSON object; its internal structure is defined by convention in the AI layer, not by the database schema.

---

### `GET /lesson/{lesson_id}`

Retrieve a specific lesson.

**Response `200`** — same shape as generate response.

---

### `POST /lesson/{lesson_id}/complete`

Mark a lesson as completed and award XP.

**Request**

```json
{ "score": 8, "max_score": 10 }
```

**Response `200`**

```json
{
  "lesson_id": 55,
  "xp_awarded": 20,
  "total_xp": 360,
  "level_up": false,
  "new_level": null
}
```

If the user's XP crosses the threshold for the next level, `level_up` is `true` and `new_level` contains the new level code.

---

## 6. Chat

### `POST /chat`

Send a message to the AI tutor. The AI responds in context of the active language pair.

**Request**

| Field | Type | Required | Notes |
|---|---|---|---|
| `pair_id` | integer | Yes | |
| `session_id` | integer | No | If omitted, a new session is created |
| `message` | string | Yes | User's message |
| `mode` | string | No | `"general"` (default) \| `"introduction"` \| `"travelling"` \| `"daily_life"` |

```json
{
  "pair_id": 7,
  "session_id": null,
  "message": "Bonjour, je m'appelle Ahmed.",
  "mode": "introduction"
}
```

**Response `200`**

```json
{
  "session_id": 33,
  "reply": "Bonjour Ahmed ! Très bien ! Maintenant, peux-tu me dire quel âge tu as ? (How old are you?)",
  "xp_awarded": 5,
  "vocabulary_saved": ["bonjour", "je m'appelle"]
}
```

---

### `GET /chat/sessions`

List conversation sessions for a language pair.

**Query params:** `pair_id` (required), `limit` (default 20), `offset` (default 0)

**Response `200`**

```json
{
  "sessions": [
    {
      "id": 33,
      "pair_id": 7,
      "mode": "introduction",
      "message_count": 12,
      "created_at": "2026-05-28T10:00:00Z",
      "last_message_at": "2026-05-28T10:15:00Z"
    }
  ]
}
```

---

### `GET /chat/sessions/{session_id}/messages`

Retrieve the full message history for a session.

**Response `200`**

```json
{
  "session_id": 33,
  "messages": [
    { "id": 1, "role": "user", "content": "Bonjour, je m'appelle Ahmed.", "created_at": "..." },
    { "id": 2, "role": "assistant", "content": "Bonjour Ahmed ! ...", "created_at": "..." }
  ]
}
```

---

## 7. Progress

### `GET /progress/{pair_id}`

Get the overall learning progress for a language pair.

**Response `200`**

```json
{
  "pair_id": 7,
  "current_level": "A1",
  "total_xp": 360,
  "streak_days": 5,
  "longest_streak": 12,
  "lessons_completed": 14,
  "messages_sent": 78,
  "daily_history": [
    { "date": "2026-05-30", "xp_earned": 45, "lessons_completed": 2 },
    { "date": "2026-05-29", "xp_earned": 30, "lessons_completed": 1 }
  ],
  "level_progress": {
    "current_level": "A1",
    "xp_in_level": 60,
    "xp_required": 150,
    "percent": 40
  }
}
```

---

## 8. Vocabulary

### `GET /vocabulary`

List vocabulary items for a language pair.

**Query params:** `pair_id` (required), `due_for_review` (boolean, default false), `limit` (default 50)

**Response `200`**

```json
{
  "items": [
    {
      "id": 101,
      "target_word": "le pain",
      "source_translation": "bread",
      "context_sentence": "Je mange du pain le matin.",
      "times_seen": 3,
      "times_correct": 2,
      "next_review_at": "2026-06-01T00:00:00Z"
    }
  ]
}
```

---

### `POST /vocabulary/{item_id}/review`

Record the result of a vocabulary review.

**Request**

```json
{ "correct": true }
```

**Response `200`**

```json
{
  "item_id": 101,
  "next_review_at": "2026-06-04T00:00:00Z",
  "xp_awarded": 2
}
```

---

## 9. Speaking Assessment (Audio)

### `POST /assessment/score-speaking`

Submit an audio recording for AI scoring. Uses `multipart/form-data`.

**Form fields**

| Field | Type | Notes |
|---|---|---|
| `audio` | file | `.webm` format |
| `pair_id` | string | |
| `question` | string | The question being answered |
| `level` | string | CEFR level |
| `xp_reward` | string | Max XP for this question |

**Response `200`**

```json
{
  "is_correct": true,
  "feedback": "Great pronunciation! Work on verb agreement.",
  "xp_awarded": 18,
  "transcription": "Je m'appelle Ahmed et j'ai vingt-huit ans."
}
```

---

## 10. Writing Assessment

### `POST /assessment/score-writing`

Submit a written answer for AI scoring.

**Request**

```json
{
  "pair_id": 7,
  "question": "Describe your daily routine.",
  "level": "A2",
  "user_answer": "Je me lève à sept heures. Je mange le petit-déjeuner...",
  "xp_reward": 20
}
```

**Response `200`**

```json
{
  "is_correct": true,
  "feedback": "Good structure! Watch your article agreement.",
  "xp_awarded": 16
}
```
