# Usfuturee — PRD

## Original Problem Statement
User asked to clone `https://github.com/Samikhan-87/Usfuturee.git` and fix 4
`Module not found` errors:
- `@/pages/Settings`
- `@/pages/Institution`
- `@/pages/TeacherPortal`
- `@/pages/PrincipalPortal`

User then specified the full feature set each of these pages must contain.

## Architecture
- Frontend: React 19 + CRA(craco) + Tailwind + Radix UI + zustand store, sonner toasts
- Path alias `@` → `src/` (jsconfig + craco)
- Frontend-only mock auth (`useAuthStore` + persist) — no backend wiring on auth yet
- Routes (in `App.js`): `/login`, `/signup`, `/`, `/profile`, `/groups`, `/events`, `/ai-chat`, `/portal`, `/settings`, `/institution`
- `/portal` dispatches to `StudentPortal`, `TeacherPortal`, `PrincipalPortal` based on `useAuth().role`

## User Personas
- Student — views portal (assignments, MCQ tests, fees)
- Teacher — manages courses, grades assignments, weekly schedule
- Principal — runs admissions, fees, lists of students/teachers
- Parent — read-only community member
- Public visitor — institution profile + admission application

## What's been implemented (Jan 2026 / iteration 1)
- Cloned full Usfuturee repo into `/app` (after user made repo public)
- Installed all yarn deps (zustand, sonner, recharts, etc.) and pip deps
- Created `/app/frontend/src/pages/Settings.jsx` — 5 menu sidebar (Account, Security, Visibility, Privacy, Notifications) with toggles, dark-mode switch wired to themeStore, delete-account confirm modal
- Created `/app/frontend/src/pages/Institution.jsx` — banner, verified badge, follow + "Apply for Admission" button, books, uniforms, school message, 4-step admission modal (personal → class → terms → payment with QR + receipt upload), email logged on submit
- Created `/app/frontend/src/pages/TeacherPortal.jsx` — 4 stat cards, tabs Dashboard / My Courses / Assignments / Schedule, today's classes, assignment progress bars, recent messages, quick actions, grading modal with marks input per student, weekly schedule grid
- Created `/app/frontend/src/pages/PrincipalPortal.jsx` — 4 stat cards, tabs Dashboard / Students / Teachers / Admissions / Fees, approve/reject admissions (logs email), set fee per class, mark fees paid, overdue alert
- All four pages: dark/light mode, responsive, Plus Jakarta Sans heading font, sonner bottom-right toasts, full `data-testid` coverage
- Frontend now compiles with **0 errors** (`webpack compiled successfully`)

## Iteration 2 (Jan 2026) — Notifications + Messaging
- Created `/app/frontend/src/components/NotificationsDropdown.jsx` — Radix Popover from bell icon, All/Unread tabs, 6 notification types (follower, like, comment, event, fee, assignment) with avatar + type-icon badge, timestamps, blue unread dot, "Mark all as read", clicking navigates to relevant page; live unread count drives bell badge
- Created `/app/frontend/src/pages/Messages.jsx` (route `/messages`) — left conversation list with search + unread badges + online dots; right active conversation with header (online status), date-grouped messages (sent blue right / received gray left), timestamps, input with Enter-to-send. Mobile shows one panel at a time with back button. Empty state "Select a conversation to start messaging"
- Wired Navbar: bell now opens NotificationsDropdown, chat icon navigates to `/messages`
- Added `/messages` route in `App.js`

## Iteration 3 (Jan 2026) — Demo logins + sidebar pages
- Fixed `Login.jsx` demo buttons: clicking Student → `/`, Teacher → `/portal` (Teacher dashboard), Principal → `/portal` (Principal dashboard), Parent → `/`. Each populates the zustand `useAuthStore` with the matching `DEMO_ACCOUNTS` entry (role, name, avatar, headline, institution) and `isAuthenticated = true`. Success toast on each login.
- Created `/app/frontend/src/pages/Courses.jsx` — 6 course cards with subject, teacher avatar, progress bar, lessons count, gradient backgrounds
- Created `/app/frontend/src/pages/Saved.jsx` — reuses existing `PostCard` to show saved posts, with proper empty state ("No content yet" + bookmark icon)
- Created `/app/frontend/src/pages/Trending.jsx` — trending tags strip + PostCards sorted by likes, with #1 / #2 / #3 rank badges
- Updated `LeftSidebar.jsx` so Courses, Saved, Events, Trending point to their real routes (previously all pointed to `/`)
- Added `/courses`, `/saved`, `/trending` routes in `App.js` (Events route already existed)
- `ComingSoon.jsx` is no longer referenced by any active route

## Backlog / Not Yet Implemented
- P1: Wire demo-account buttons in `Login.jsx` so they actually authenticate (currently only `console.log`)
- P1: Real Notifications dropdown from bell icon (spec'd by user but not implemented this iteration)
- P1: Full Messaging page from chat icon
- P2: Connect admission/grading/fee writes to backend
- P2: Real email integration (SendGrid) — currently `console.log` placeholder

## Next Tasks
1. Activate demo login buttons so portals can be visited end-to-end
2. Build Notifications dropdown + Messaging page
3. Optional: hook admission + grades to FastAPI backend
