# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FROSTR website (frostr.org) - Marketing/informational site for the FROSTR protocol, a t-of-n remote signing and key rotation protocol for Nostr using FROST (Flexible Round-Optimized Schnorr Threshold signatures).

## Commands

```bash
npm run dev      # Start development server (Vite)
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Architecture

**Stack**: React 18 + Vite + Tailwind CSS + shadcn/ui components

**Routing**: React Router v7 with nested routes
- `App.jsx` - Root component with BrowserRouter, fetches public GitHub profile data
- `Layout.jsx` - Shell with header navigation and mobile menu
- Routes in `src/components/routes/`: About, Apps, Media, Roadmap

**Key patterns**:
- Path alias `@/` maps to `src/` (configured in vite.config.mjs)
- UI components in `src/components/ui/` follow shadcn/ui patterns (Card, Button, Alert, Input)
- Uses `class-variance-authority` and `tailwind-merge` for component variants
- Public GitHub profile and members use unauthenticated requests; see AGENTS.md for credential rules.

**Data flow**:
- `App.jsx` fetches the public FROSTR-ORG README and public members
- `orgData` passed to About page (displays README from .github repo + team members)
- Roadmap routing is disabled; authenticated Projects requests have been removed.
- Apps and Media pages use static data arrays defined in their respective components
