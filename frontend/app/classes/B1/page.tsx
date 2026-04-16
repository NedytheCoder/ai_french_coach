/**
 * B1 Level Welcome Page
 * =====================
 *
 * Purpose:
 * --------
 * Landing page for B1 (intermediate) level French learners.
 * Marks the transition from basic sentences to real communication,
 * with focus on expressing opinions and handling everyday conversations.
 *
 * Page Structure:
 * ---------------
 * 1. LevelHeader - Badge, title, subtitle with emerald branding
 * 2. InfoSection (What you'll learn) - Grammar and communication topics
 * 3. InfoSection (What changes) - Learning approach evolution
 * 4. InfoSection (What you'll be able to do) - Skill outcomes
 * 5. OutcomeCard - Summary of B1 achievement
 * 6. CTAButton - Navigation to first B1 lesson
 *
 * Color Scheme:
 * -------------
 * - Emerald/Teal gradient for B1 branding
 * - Emerald color scheme for all components
 * - Matches intermediate level progression
 *
 * Navigation:
 * -----------
 * - "Start B1" button → /classes/B1/lesson1
 *
 * Components Used:
 * ----------------
 * - LevelWelcome components (different design system from A0-A2)
 */

"use client";

import React from "react";
import { LevelHeader, InfoSection, BulletList, CTAButton, OutcomeCard } from "../welcome_components/LevelWelcome";

/**
 * B1WelcomePage Component
 *
 * The main landing page for B1 (intermediate) level.
 * Uses LevelWelcome component library for consistent design.
 *
 * @returns {JSX.Element} The rendered B1 welcome page
 */
export default function B1WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <LevelHeader
          level="B1 — Intermediate"
          title="Welcome to B1"
          subtitle="Moving from basic sentences to real communication. You're ready to express opinions, tell stories, and handle everyday conversations with more confidence."
          color="emerald"
        />

        <div className="space-y-6 mb-12">
          <InfoSection title="What you'll learn" color="emerald" delay={0.1}>
            <BulletList
              color="emerald"
              items={[
                "Conditional sentences and hypotheses",
                "Reported speech and indirect questions",
                "More complex sentence structures",
                "Expressing ideas clearly and connecting thoughts",
              ]}
            />
          </InfoSection>

          <InfoSection title="What changes at this level" color="emerald" delay={0.2}>
            <BulletList
              color="emerald"
              items={[
                "Less memorization, more natural communication",
                "Building longer, more complete sentences",
                "Combining multiple ideas fluently",
                "Moving from phrases to paragraphs",
              ]}
            />
          </InfoSection>

          <InfoSection title="What you'll be able to do" color="emerald" delay={0.3}>
            <p className="text-slate-700">
              You'll move from reacting to situations to <strong>initiating conversations</strong>.
              You'll handle travel, work discussions, and social situations with greater ease.
              You'll express opinions, explain choices, and tell stories from your life.
            </p>
          </InfoSection>
        </div>

        <OutcomeCard
          color="emerald"
          text="You'll be able to hold real conversations and explain your thoughts more clearly."
        />

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-8 text-lg">
            Ready to bridge the gap between basics and fluency?
          </p>
          <CTAButton href="/classes/B1/lesson1" text="Start B1" color="emerald" />
        </div>
      </div>
    </div>
  );
}
