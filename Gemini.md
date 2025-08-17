# Project Iron - Master Project Brief & Memory

- **Document Version:** 1.0
- **Last Updated:** 2025-07-29 12:03 PM PDT

---

## 1.0 Mission & Vision (The "Why")

- **Mission Statement:** "A social media platform where iron sharpens iron, building each other for the better of society."
- **Brand Identity:** The "Chick-fil-A Model." A platform for everyone, built on a foundation of faith-based principles. The public-facing brand emphasizes universal values: trust, safety, kindness, and growth.
- **Core Principles:**
    - **Trust through Verification:** The community's foundation is the certainty that users are real people.
    - **Safety by Design:** The architecture is built to protect users, especially younger ones.
    - **Constructive Dialogue:** System mechanics are designed to encourage thoughtful, respectful interaction.
    - **Principled Privacy:** User data will be collected minimally, protected rigorously, and never sold.

---

## 2.0 Target Audience (The "Who")

- **Beachhead Audience:** The church community, with a specific focus on youth groups, students, and their families.
- **Key Personas:**
    - **The Guardian:** A parent or youth leader concerned with online safety and positive influences.
    - **The Dependent:** A user under 16 whose account is linked to and managed by a Guardian.
    - **The Verified Adult:** Any user over 16 who has completed the verification process.

---

## 3.0 Core Product Architecture (The "How")

- **Key Differentiators:**
    - **Mandatory KYC:** Full participation requires Photo ID verification to eliminate anonymity and bots.
    - **Guardian Mode:** A system requiring parental/leader approval for posts made by users under 16.
    - **Fact/Opinion Framework:** A UI mechanism that requires users to declare their post's intent, with `#fact`-based posts requiring a source.
- **User Tiers:**
    - **Verified:** User has completed KYC. Their content is visible by default.
    - **Unverified:** User has not completed KYC. Their content is hidden by default.

---

## 4.0 MVP 1.0 Scope (The "What")

### **4.1 IN SCOPE (Features for Version 1.0)**

- **Onboarding & Verification:**
    - Phone number signup.
    - Third-party KYC Photo ID verification flow.
- **Guardian System (V1):**
    - Guardian can create one linked Dependent account.
    - A Guardian must approve a Dependent's posts via a simple queue before they become public.
- **Core Social Features:**
    - Simple user profiles (name, picture, bio).
    - Post creation (text and one image).
    - Post-intent signifier (`#fact`/`#opinion`).
    - A single, reverse-chronological main feed.
    - Commenting on posts.
- **Safety & Moderation (Founder-Led):**
    - "Report" button on all user-generated content.
    - A secure Admin Dashboard for the founder to review reports and ban users.
    - A public "Code of Ethics" document.
- **Settings:**
    - A user setting to "Show content from Unverified users" (default: OFF).
- **Business Model (V1):**
    - A static "Support Us" page with a link to an external donation platform.

### **4.2 OUT OF SCOPE (Features for Post-MVP)**

- **The "Subject Expert" & "Community Tribunal" systems.**
- **Direct Messaging.**
- **Following users, creating groups.**
- **Video or audio content.**
- **Algorithmic or personalized feeds.**
- **Advanced Guardian controls.**
- **Integrated marketplace, courses, or donation perks.**

---

## 5.0 Recommended Technology Stack

- **iOS Application:** Swift language with SwiftUI framework.
- **Backend Platform:** Google Firebase (utilizing Authentication, Firestore, Cloud Storage, and Cloud Functions).
- **Third-Party Integrations:**
    - **KYC:** Stripe Identity (recommended).
    - **Donations:** Stripe, Patreon, or Buy Me a Coffee (external link).

---

## 6.0 High-Level Roadmap & Timeline

- **Estimated MVP Development Time:** 5-8 months for a solo developer.
- **Q3 2025:** Foundation & Design (Legal, UI/UX).
- **Q4 2025:** Core MVP Development (Heads-down coding).
- **Q1 2026:** Internal Alpha & Founding Council Onboarding.
- **Q2 2026:** Private Beta (50-150 users via TestFlight).
- **Q3 2026:** Public Launch on the Apple App Store.

---

## 7.0 Current Status & Next Steps

- **Current Phase:** Market Research & Validation.
- **Rationale:** Pausing development to validate the core value proposition and analyze the competitive landscape before committing to the 5-8 month development timeline.
- **Immediate Next Step:** Conduct market research using the provided AI prompts for competitor analysis and simulated audience analysis. Concurrently, arrange and conduct 3-5 real-world interviews with target users (pastors, parents) to gather qualitative feedback.