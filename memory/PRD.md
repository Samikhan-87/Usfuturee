# Usfuturee — Educational Social Platform (PRD)

## Original Problem Statement
Create "Usfuturee", a modern educational social platform. Stack requested: React + Tailwind + shadcn/ui + React Router v6 + Zustand + Axios. Facebook-style blue (#1877F2), white light mode, deep dark mode (#0F0F0F bg / #1C1C1C cards), Zustand ThemeProvider with localStorage persistence. "Love at first sight" UI. (Delivered on CRA+craco template instead of Vite per platform constraints.)

## User Choices
- Build exactly the requested scaffold + UI
- Auth: email/password — UI only, **NO BACKEND YET** (frontend mock)
- No AI features
- Default theme: light mode

## Architecture
- Frontend: React 19 (CRA + craco), Tailwind v3 (class dark mode), shadcn/ui, lucide-react, sonner
- State: Zustand (themeStore, authStore, feedStore) with localStorage persistence
- Routing: react-router-dom v7 with ProtectedRoute
- Axios instance ready in src/services/api.js (mockRequest simulates network) — backend not wired yet
- Folder structure: components, pages, layouts, store, hooks, services, utils, assets

## Implemented (2026-06-05)
- ThemeProvider + Zustand theme toggle, persisted, light default; deep-dark mode with blue accents
- Login/Register page: split-screen blue visual, mock auth (any email/password logs in)
- Home feed: stories row, post composer (creates posts live), interactive post cards (like toggle)
- Profile page: banner, stats, recent activity
- Study Groups page: join/leave toggle with toasts
- Sticky glass navbar (search, nav, theme toggle, profile menu), left & right sidebars
- Full data-testid coverage; lint clean

## MOCKED / NOT REAL
- All auth & data are frontend-only mock (no FastAPI/MongoDB backend). Posts/groups reset on reload (in-memory except theme & auth session).

## Implemented (2026-06-05 — Update 2)
- Auth: role-aware Zustand store (user, role, token, isAuthenticated, login, logout)
- Login: split-screen branding ("Welcome to Usfuturee"), forgot-password, 4 demo accounts (Student/Teacher/Principal/Parent one-click login), link to signup
- Signup: role selector (Student/Teacher/Principal), name/email/institution/password/confirm with match validation
- Layout: EduConnect navbar (EC mark, nav tabs Home/Groups/Events/AI Chat, desktop search + mobile search icon, chat, notifications w/ badge, Portal btn, profile menu, theme toggle, mobile hamburger). Right sidebar: Follow Institutions, Upcoming Events, footer links
- Home feed: stories ("Your Story" + image stories), create-post box → modal (textarea + image upload preview), feed cards with institution avatar, verified blue tick, follow toggle, 3-dot menu (save/hide/report)
- Profile: cover + Edit Cover, overlapping avatar + role badge, Edit Profile + report dropdown, bio box, tabs (Posts/About/Followers w/ follow-back), Achievements sidebar box

## Implemented (2026-06-05 — Update 3)
- Reverted to blue (#1877F2) primary + gradient hero panels; renamed brand EduConnect -> Usfuturee (U mark)
- Global font switched to Plus Jakarta Sans; Login polished (white form panel, 10px button, inline "Reset link sent!", 2x2 outlined demo buttons that console.log role)
- BACKEND (first real integration): POST /api/chat/edubot — EduBot assistant via Claude Sonnet 4.6 (Emergent LLM key in backend/.env), messages persisted to MongoDB
- Groups page: tabs Posts / Your Groups (public-private badges, View+settings) / Discover (search, suggested+Join, category pills) + Create Group modal (name, desc, category, public/private toggle, cover upload)
- Events page: Upcoming/Past tabs, event cards (category badge, date/time/location, organizer, Register+Details), search, Filter popover (region/institution/category), principal-only "+ Create Event" modal
- AI Chat (EduBot): suggested questions panel + chat UI, real Claude replies, thumbs up/down, clear chat
- Role inferred from demo email so principal@usfuturee.com unlocks principal-only UI
- Tested by testing agent: 100% backend + frontend pass, no bugs

## Backlog
- P0: Replace remaining mock data/auth with real FastAPI + MongoDB (real auth, posts, groups, events, follows)
- P1: EduBot chat history retrieval endpoint, rate limiting/auth on chat; persist created groups/events
- P2: Build Courses/Saved/Trending pages, messaging, notifications
