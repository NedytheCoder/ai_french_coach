/**
 * C1 Level Welcome Page
 * =====================
 *
 * Purpose:
 * --------
 * Landing page for C1 (advanced) level French learners.
 * Focuses on refinement, style, and expressing complex ideas
 * with elegance and precision. Moving from fluent to natural.
 *
 * Page Structure:
 * ---------------
 * 1. LevelHeader - Badge, title, subtitle with violet branding
 * 2. InfoSection (What you'll learn) - Nuance and advanced expression
 * 3. InfoSection (What changes) - Refinement and thinking in French
 * 4. InfoSection (What you'll be able to do) - Professional-level fluency
 * 5. OutcomeCard - Summary of C1 achievement
 * 6. CTAButton - Navigation to first C1 module
 *
 * Color Scheme:
 * -------------
 * - Violet/Purple gradient for C1 branding
 * - Violet color scheme for all components
 *
 * Navigation:
 * -----------
 * - "Start C1" button → /classes/C1/module1
 */

"use client";

import React from "react";
import { LevelHeader, InfoSection, BulletList, CTAButton, OutcomeCard } from "../welcome_components/LevelWelcome";

/**
 * C1WelcomePage Component
 *
 * The main landing page for C1 (advanced) level.
 *
 * @returns {JSX.Element} The rendered C1 welcome page
 */
export default function C1WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <LevelHeader
          level="C1 — Advanced"
          title="Welcome to C1"
          subtitle="Moving from fluent to precise and natural. You're ready to focus on style, refinement, and expressing complex ideas with elegance."
          color="violet"
        />

        <div className="space-y-6 mb-12">
          <InfoSection title="What you'll learn" color="violet" delay={0.1}>
            <BulletList
              color="violet"
              items={[
                "Nuance and register control across contexts",
                "Advanced connectors and discourse flow",
                "Natural phrasing and idiomatic expression",
                "Argument structuring and persuasive techniques",
              ]}
            />
          </InfoSection>

          <InfoSection title="What changes at this level" color="violet" delay={0.2}>
            <BulletList
              color="violet"
              items={[
                "Fewer rules, more refinement",
                "Improving clarity and elegance of expression",
                "Thinking more directly in French",
                "Controlling tone for different audiences",
              ]}
            />
          </InfoSection>

          <InfoSection title="What you'll be able to do" color="violet" delay={0.3}>
            <p className="text-slate-700">
              You'll express ideas <strong>fluently and spontaneously</strong> without much obvious searching for expressions.
              You'll use language flexibly and effectively for social, academic, and professional purposes.
              You'll produce clear, well-structured, detailed text on complex subjects.
            </p>
          </InfoSection>
        </div>

        <OutcomeCard
          color="violet"
          text="You'll express yourself clearly, naturally, and with confidence in complex situations."
        />

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-8 text-lg">
            Ready to refine your French and achieve true fluency?
          </p>
          <CTAButton href="/classes/C1/module1" text="Start C1" color="violet" />
        </div>
      </div>
    </div>
  );
}
