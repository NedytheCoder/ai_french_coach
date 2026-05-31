import translations from "../i18n/translations"

describe("Translations", () => {
  const languages = ["en", "fr", "de", "zh"] as const
  const requiredKeys = [
    // Navigation
    "nav_your_journey",
    "nav_skills",
    "nav_how_to_play",

    // Hero
    "hero_begin_your",
    "hero_highlight",
    "hero_adventure",
    "hero_subtitle",

    // Learning Path
    "level_A0",
    "level_A1",
    "level_A2",
    "level_B1",
    "level_B2",
    "level_C1",
    "level_C2",

    // Features
    "feature_speaking_title",
    "feature_listening_title",
    "feature_reading_title",
    "feature_writing_title",

    // Testimonials
    "testimonials_title",
    "testimonials_subtitle",
    "testimonial_sarah_quote",
    "testimonial_james_quote",
    "testimonial_emma_quote",

    // Language names
    "lang_en",
    "lang_fr",
    "lang_de",
    "lang_zh",

    // CTA and misc
    "cta_begin_adventure",
    "free_forever",
    "footer_about",
    "footer_privacy",
  ]

  test("all languages exist", () => {
    languages.forEach((lang) => {
      expect(translations[lang]).toBeDefined()
    })
  })

  test("all required keys exist in all languages", () => {
    languages.forEach((lang) => {
      const langTranslations = translations[lang]
      requiredKeys.forEach((key) => {
        expect(langTranslations[key]).toBeDefined()
        expect(typeof langTranslations[key]).toBe("string")
        expect(langTranslations[key].length).toBeGreaterThan(0)
      })
    })
  })

  test("translations are not empty", () => {
    languages.forEach((lang) => {
      const langTranslations = translations[lang]
      const keys = Object.keys(langTranslations)
      expect(keys.length).toBeGreaterThan(50)
    })
  })

  test("French testimonials are different from English", () => {
    expect(translations.fr.testimonial_sarah_quote).not.toEqual(translations.en.testimonial_sarah_quote)
    expect(translations.fr.testimonial_sarah_quote).toContain("débutante")
  })

  test("German testimonials are different from English", () => {
    expect(translations.de.testimonial_james_quote).not.toEqual(translations.en.testimonial_james_quote)
    expect(translations.de.testimonial_james_quote).toContain("täglich")
  })

  test("Chinese testimonials are translated", () => {
    expect(translations.zh.testimonial_emma_quote).not.toEqual(translations.en.testimonial_emma_quote)
    expect(translations.zh.testimonial_emma_quote).toContain("应用")
  })

  test("language names are localized", () => {
    expect(translations.en.lang_fr).toBe("Français")
    expect(translations.fr.lang_en).toBe("English")
    expect(translations.de.lang_de).toBe("Deutsch")
    expect(translations.zh.lang_zh).toBe("中文")
  })

  test("no untranslated placeholder strings", () => {
    languages.forEach((lang) => {
      const langTranslations = translations[lang]
      Object.entries(langTranslations).forEach(([key, value]) => {
        expect(value).not.toMatch(/\[.*\]/) // Check for [TODO] style placeholders
        expect(value).not.toMatch(/TRANSLATE:/) // Check for TRANSLATE: prefix
        expect(value.length).toBeGreaterThan(0)
      })
    })
  })
})
