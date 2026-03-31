# Grimoire API

Backend REST API for Grimoire, a personal life organization app.

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication + bcrypt

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the server directory:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

### Run the server

```bash
npm run dev
```

## API Routes

### Auth

| Method | Route              | Description       | Protected |
| ------ | ------------------ | ----------------- | --------- |
| POST   | /api/auth/register | Register new user | No        |
| POST   | /api/auth/login    | Login user        | No        |
| GET    | /api/auth/me       | Get current user  | Yes       |

### Chapters

| Method | Route             | Description              | Protected |
| ------ | ----------------- | ------------------------ | --------- |
| GET    | /api/chapters     | Get all chapters         | Yes       |
| POST   | /api/chapters     | Create chapter           | Yes       |
| PUT    | /api/chapters/:id | Update chapter           | Yes       |
| DELETE | /api/chapters/:id | Delete chapter + entries | Yes       |

### Entries

| Method | Route                            | Description     | Protected |
| ------ | -------------------------------- | --------------- | --------- |
| GET    | /api/chapters/:chapterId/entries | Get all entries | Yes       |
| POST   | /api/chapters/:chapterId/entries | Create entry    | Yes       |
| PUT    | /api/chapters/:id/entries/:id    | Update entry    | Yes       |
| DELETE | /api/chapters/:id/entries/:id    | Delete entry    | Yes       |

## Entry Types

Each chapter has a type that determines its entry fields:

- **Tracker** — status, priority, dueDate (job hunt, habits, goals)
- **List** — status, rating (books, shows, recipes)
- **Journal** — body, mood, date (writing, dreams, ideas)
- **Reference** — body (important info to store)
