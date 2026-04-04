# Grimoire

> One book. Your whole life.

A full-stack personal organization app that lets users create flexible "chapters" for different areas of their life — job hunt, reading list, journal, recipes, habits, and more. Each chapter holds entries with fields tailored to its type.

**Live app:** https://grimoire-ks.netlify.app

---

## Tech Stack

**Frontend**
- React + Vite
- React Router
- Context API
- CSS3 with custom design system

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication + bcrypt
- REST API

**Deployed on**
- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

---

## Features

- JWT authentication — register, login, logout, protected routes
- Create, edit, and delete Chapters with custom name, color, and emoji icon
- Four chapter types with type-aware entry fields:
  - **Tracker** — status, priority, due date (job hunt, habits, goals)
  - **List** — status, rating (books, shows, movies, recipes)
  - **Journal** — rich body, mood (writing, dreams, ideas)
  - **Reference** — body, links (important info to store)
- Full entry CRUD — create, edit, delete entries within each chapter
- Tracker entries sortable by priority, status, and due date
- Global tag search — search entries across all chapters by tag
- Tags and links on every entry
- Loading states on auth forms
- Mobile responsive with iOS safe area support
- Dark, elegant aesthetic with EB Garamond + Inter typography

---

## Architecture

The core technical challenge is the flexible entry system. A single `Entry` model uses a `Mixed` fields object as a discriminated pattern — each entry type populates it differently without requiring separate collections or a massively sparse schema.
grimoire/
├── client/                  # React + Vite frontend
│   └── src/
│       ├── api/             # Axios instance with auth interceptor
│       ├── context/         # AuthContext — JWT state management
│       ├── components/      # ChapterCard, EntryCard, EntryForm, Navbar, TagSearch
│       └── pages/           # Login, Register, Dashboard, ChapterView, Landing
│
└── server/                  # Express backend
├── controllers/         # authController, chapterController, entryController
├── middleware/          # verifyToken — JWT verification
├── models/              # User, Chapter, Entry (Mixed fields pattern)
└── routes/              # auth, chapters, entries

---

## API Routes

### Auth
| Method | Route | Description | Protected |
|--------|-------|-------------|-----------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login user | No |
| GET | /api/auth/me | Get current user | Yes |

### Chapters
| Method | Route | Description | Protected |
|--------|-------|-------------|-----------|
| GET | /api/chapters | Get all chapters | Yes |
| POST | /api/chapters | Create chapter | Yes |
| PUT | /api/chapters/:id | Update chapter | Yes |
| DELETE | /api/chapters/:id | Delete chapter + entries | Yes |

### Entries
| Method | Route | Description | Protected |
|--------|-------|-------------|-----------|
| GET | /api/chapters/:chapterId/entries | Get all entries | Yes |
| POST | /api/chapters/:chapterId/entries | Create entry | Yes |
| PUT | /api/chapters/:chapterId/entries/:id | Update entry | Yes |
| DELETE | /api/chapters/:chapterId/entries/:id | Delete entry | Yes |
| GET | /api/entries/search?tag= | Search entries by tag | Yes |

---

## Running Locally

### Prerequisites
- Node.js
- MongoDB Atlas account

### Backend
```bash
cd server
npm install
```

Create `server/.env`:
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```bash
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

---

## Design Decisions

**Why a `Mixed` fields schema instead of separate collections?**
Four entry types with different fields could be modeled as four separate collections, a union schema with many nullable fields, or a single flexible schema. The `Mixed` fields pattern keeps the data model clean — one collection, one query pattern, type-specific data stored without nulls. The `type` field on both Chapter and Entry acts as the discriminator.

**Why React + Vite instead of Next.js?**
Grimoire is a single-page application with client-side routing and no SEO requirements. Vite provides fast dev tooling without the framework opinions of Next.js, keeping the architecture simple and fully within my control.

**Why a cron job instead of a paid tier?**
Render's free tier spins down after inactivity. Rather than upgrading, a scheduled ping every 10 minutes keeps the backend warm at no cost — appropriate for a portfolio project.

---

## Author

Kierstin Sachs — [GitHub](https://github.com/KierstinS2024) | [LinkedIn](https://www.linkedin.com/in/KierstinSachs/)