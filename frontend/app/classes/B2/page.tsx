/**
 * B2 Level Welcome Page
 * =====================
 *
 * Purpose:
 * --------
 * Landing page for B2 (upper intermediate) level French learners.
 * Focuses on moving from basic communication to precision, nuance,
 * and understanding complex texts with detailed expression.
 *
 * Page Structure:
 * ---------------
 * 1. LevelHeader - Badge, title, subtitle with blue branding
 * 2. InfoSection (What you'll learn) - Advanced grammar and expression
 * 3. InfoSection (What changes) - Nuance and control development
 * 4. InfoSection (What you'll be able to do) - Complex discussion skills
 * 5. OutcomeCard - Summary of B2 achievement
 * 6. CTAButton - Navigation to first B2 lesson
 *
 * Color Scheme:
 * -------------
 * - Blue/Indigo gradient for B2 branding
 * - Blue color scheme for all components
 *
 * Navigation:
 * -----------
 * - "Start B2" button → /classes/B2/lesson1
 */

"use client";

import React from "react";
import { LevelHeader, InfoSection, BulletList, CTAButton, OutcomeCard } from "../welcome_components/LevelWelcome";

/**
 * B2WelcomePage Component
 *
 * The main landing page for B2 (upper intermediate) level.
 *
 * @returns {JSX.Element} The rendered B2 welcome page
 */
export default function B2WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <LevelHeader
          level="B2 — Upper Intermediate"
          title="Welcome to B2"
          subtitle="Moving from communication to precision and nuance. You're ready to understand complex texts and express detailed opinions with confidence."
          color="blue"
        />

        <div className="space-y-6 mb-12">
          <InfoSection title="What you'll learn" color="blue" delay={0.1}>
            <BulletList
              color="blue"
              items={[
                "Advanced grammar in real-world contexts",
                "Argumentation and persuasive expression",
                "Complex sentence structures and subordination",
                "Discourse markers and natural flow",
              ]}
            />
          </InfoSection>

          <InfoSection title="What changes at this level" color="blue" delay={0.2}>
            <BulletList
              color="blue"
              items={[
                "Adding nuance to your statements",
                "Greater control over tone and register",
                "Stronger comprehension of complex content",
                "Expressing subtle distinctions in meaning",
              ]}
            />
          </InfoSection>

          <InfoSection title="What you'll be able to do" color="blue" delay={0.3}>
            <p className="text-slate-700">
              You'll engage in <strong>meaningful discussions</strong> on abstract topics.
              You'll understand the main ideas of complex text, including technical discussions in your field.
              You'll interact with fluency and spontaneity, making regular interaction with native speakers possible.
            </p>
          </InfoSection>
        </div>

        <OutcomeCard
          color="blue"
          text="You'll be able to discuss ideas, argue points, and understand complex content."
        />

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-8 text-lg">
            Ready to sharpen your French and add depth to your expression?
          </p>
          <CTAButton href="/classes/B2/lesson1" text="Start B2" color="blue" />
        </div>
      </div>
    </div>
  );
}
