<p align="center">
  <img src="https://i.imgur.com/8x83SAJ.png" alt="Vattles Logo" width="200"/>
</p>

<h1 align="center">Vattles</h1>

<p align="center">
  <strong>The Live Arena for AI-Powered Coding Battles.</strong>
  <br />
  <em>An eSport for the new creative age.</em>
</p>

<p align="center">
  <a href="https://github.com/your-username/vattles/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/your-username/vattles/ci.yml?branch=main&style=for-the-badge&logo=github" alt="Build Status">
  </a>
  <a href="https://github.com/your-username/vattles/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/your-username/vattles?style=for-the-badge" alt="License">
  </a>
  <a href="https://discord.gg/your-invite-code">
    <img src="https://img.shields.io/discord/your-server-id?style=for-the-badge&logo=discord&label=Join%20Community" alt="Discord">
  </a>
</p>

---

## 🚀 The Vision

Vattles is a first-of-its-kind competitive platform at the nexus of three explosive trends: **AI content creation, community-driven gaming, and the learn-to-code movement.**

We are forging a new digital frontier—a world where the line between developer, artist, and competitor dissolves. We're building the global arena where the fusion of human ingenuity and artificial intelligence is the most thrilling eSport of our time. A place where the merit of an idea, executed with speed, skill, and pure *vibe*, determines the champion.

## ✨ Core Features (MVP)

The current build focuses on delivering the complete, core gameplay loop.

*   👤 **User Authentication & Profiles:** Secure sign-up/log-in with a simple profile page tracking W/L ratio and battle history.
*   ⚔️ **Battle Creation & Lobby:** A dynamic dashboard to discover, spectate, or join open Vattles.
*   💻 **The Live Vattle Arena:** A purpose-built workspace with a countdown timer, vibe prompt, and curated links to free-to-use AI generation tools.
*   🗳️ **Community-Powered Voting:** A side-by-side interface for the community to interact with both live app demos and cast their vote.
*   🏆 **Results & Permanent Replays:** Every battle generates a shareable replay page to showcase the results and creations, building an evergreen content library.

## How It Works: The Vattle Flow

1.  **CHALLENGE:** A user initiates a Vattle, defining a theme (e.g., "Minimalist Music Player"), a time limit (e.g., 1 hour), and opens it as a challenge.
2.  **CREATE:** Two Vattlers accept the challenge. The clock starts. They must use their coding skills and free AI tools to build and deploy a live web app that best captures the vibe.
3.  **VOTE:** Submissions are locked. The community and spectators can now interact with both live app demos, side-by-side. They vote on which app better fulfills the theme and has the superior "vibe."
4.  **VICTORY:** Votes are tallied, a winner is declared, and the battle replay is archived for all to see.

## 🛠️ Tech Stack

Vattles is being built with a modern, scalable, and powerful tech stack.

*   **Frontend:** [Next.js](https://nextjs.org/) with [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Backend & Database:** [Supabase](https://supabase.io/) (PostgreSQL, Auth, Storage)
*   **Real-time Features:** [Supabase Realtime](https://supabase.com/docs/guides/realtime)
*   **Deployment:** [Vercel](https://vercel.com/)

## 🏁 Getting Started (Development)

Ready to set up your local development environment? Follow these steps.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/vattles.git
    cd vattles
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Make a copy of the example environment file:
        ```bash
        cp .env.example .env.local
        ```
    -   Set up a new Supabase project and fill in the required keys (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in your `.env.local` file.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open your browser:** Navigate to [http://localhost:3000](http://localhost:3000) to see the app running!

## 🤝 Contributing

We are building Vattles in the open and welcome contributions from the community! Whether you're fixing bugs, adding new features, or improving the documentation, your help is valued.

Please read our [**CONTRIBUTING.md**](CONTRIBUTING.md) guide to get started with the development process and a look at our [**Code of Conduct**](CODE_OF_CONDUCT.md).

## 🗺️ Roadmap

The MVP is just the beginning. Our vision for Vattles is to build a global phenomenon.

*   **✅ Phase 1: Launch The Arena (MVP)** - Establish the core game loop.
*   **⏳ Phase 2: Forge The League** - Introduce Leaderboards, Tournaments, and Social Features.
*   **🚀 Phase 3: The Creator & Monetization Engine** - Launch Vattles Pro, Seasonal Battle Passes, and a Sandbox mode.
*   **🌍 Phase 4: The Ecosystem Engine** - Release a Public API, integrate Team functionality, and secure major eSport sponsorships.

## 💬 Community

Join the conversation and help shape the future of Vattles!

*   **Discord:** [Join our Vattles Community Discord](https://discord.gg/your-invite-code)
*   **Twitter:** [@VattlesHQ](https://twitter.com/VattlesHQ)

---

<p align="center">Licensed under the [MIT License](LICENSE).</p>

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy this MVP using Gemini AI Studio 

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1-AlvcG-JRzIoHtkO9o4H4eIi2SAh3Unm

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
