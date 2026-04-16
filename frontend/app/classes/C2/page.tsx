/**
 * C2 Level Welcome Page
 * =====================
 *
 * Purpose:
 * --------
 * Landing page for C2 (mastery/proficiency) level French learners.
 * Represents the highest level of language proficiency with near-native
 * control, intellectual expression, and stylistic flexibility.
 *
 * Page Structure:
 * ---------------
 * 1. LevelHeader - Badge, title, subtitle with slate branding
 * 2. InfoSection (What you'll learn) - Rhetorical and persuasive mastery
 * 3. InfoSection (What changes) - Nuance and complete communication control
 * 4. InfoSection (What you'll be able to do) - Near-native proficiency
 * 5. OutcomeCard - Summary of C2 mastery achievement
 * 6. CTAButton - Navigation to first C2 module
 *
 * Color Scheme:
 * -------------
 * - Slate/Gray gradient for C2 branding (sophisticated, mature)
 * - Slate color scheme for all components
 *
 * Navigation:
 * -----------
 * - "Start C2" button → /classes/C2/module1
 */

"use client";

import React from "react";
import { LevelHeader, InfoSection, BulletList, CTAButton, OutcomeCard } from "../welcome_components/LevelWelcome";

/**
 * C2WelcomePage Component
 *
 * The main landing page for C2 (mastery/proficiency) level.
 * Represents the pinnacle of French language learning.
 *
 * @returns {JSX.Element} The rendered C2 welcome page
 */
export default function C2WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <LevelHeader
          level="C2 — Mastery"
          title="Welcome to C2"
          subtitle="Near-native control. You're ready for intellectual expression, stylistic flexibility, and the highest level of linguistic sophistication."
          color="slate"
        />

        <div className="space-y-6 mb-12">
          <InfoSection title="What you'll learn" color="slate" delay={0.1}>
            <BulletList
              color="slate"
              items={[
                "Rhetorical expression and persuasive mastery",
                "Advanced argumentation and critical analysis",
                "Interpretation and analysis of implicit meaning",
                "Precise, powerful, and elegant language use",
              ]}
            />
          </InfoSection>

          <InfoSection title="What changes at this level" color="slate" delay={0.2}>
            <BulletList
              color="slate"
              items={[
                "Focus on nuance and subtle meaning",
                "High-level communication across all contexts",
                "Mastery of tone, register, and intent",
                "Understanding everything, expressing anything",
              ]}
            />
          </InfoSection>

          <InfoSection title="What you'll be able to do" color="slate" delay={0.3}>
            <p className="text-slate-700">
              You'll express yourself with <strong>precision and nuance</strong> even in most complex situations.
              You'll understand with ease virtually everything heard or read.
              You'll summarize information from different spoken and written sources, reconstructing arguments coherently.
            </p>
          </InfoSection>
        </div>

        <OutcomeCard
          color="slate"
          text="You'll communicate with precision, depth, and sophistication across any context."
        />

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-8 text-lg">
            Ready to achieve mastery and express yourself at the highest level?
          </p>
          <CTAButton href="/classes/C2/module1" text="Start C2" color="slate" />
        </div>
      </div>
    </div>
  );
}
