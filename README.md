# TaskFlow — MERN Task Management App

A responsive full-stack task manager built with MongoDB, Express, React and Node.js.

## Features
- User registration and login with JWT authentication
- Password hashing with bcrypt
- Private task data for each signed-in user
- Create, view, edit and delete tasks
- Task priority: Low, Medium, High
- Task status: Pending, In Progress, Completed
- Dashboard summary cards
- Search and status filtering
- Responsive layout for desktop and mobile
- REST API with protected routes

## Project structure
```text
mern-task-manager/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   └── package.json
├── server/                 # Express + MongoDB backend
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── docs/
    ├── architecture.md
    └── wireframes.md
```

## Requirements
- Node.js 18 or later
- npm
- MongoDB Atlas account (or local MongoDB)

## Run locally

### 1. Backend
```bash
cd server
npm install
```
Copy `.env.example` to `.env` and fill in your values:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/taskflow
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```
Start the API:
```bash
npm run dev
```
The API runs at `http://localhost:5000`.

### 2. Frontend
Open a second terminal:
```bash
cd client
npm install
```
Copy `.env.example` to `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```
Start React:
```bash
npm run dev
```
Open `http://localhost:5173`.

## API endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Create account | No |
| POST | `/api/auth/login` | Log in | No |
| GET | `/api/auth/me` | Current user | Yes |
| GET | `/api/tasks` | List own tasks | Yes |
| POST | `/api/tasks` | Create task | Yes |
| PUT | `/api/tasks/:id` | Update own task | Yes |
| DELETE | `/api/tasks/:id` | Delete own task | Yes |

All protected endpoints require:
`Authorization: Bearer <token>`

## Deployment outline
1. Create a MongoDB Atlas database and copy its connection string.
2. Push this project to GitHub.
3. Deploy `server` to a Node-compatible host. Set `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL` and `NODE_ENV=production`.
4. Deploy `client` to Vercel or Netlify. Set `VITE_API_URL` to `https://your-api-domain/api`.
5. Add your deployed frontend URL to the backend `CLIENT_URL`.
6. Test registration, login, task CRUD and refresh on the deployed site.

Do not commit `.env` files, database credentials, JWT secrets, or `node_modules`.

## Screenshots
Add your screenshots in a `screenshots/` folder and link them here before submission:
- Registration page
- Login page
- Dashboard
- Create/edit task form
- Task list

## Demo video
Record a 2–3 minute walkthrough: register/login, create a task, change its status, edit it, delete it, and show the deployed site.

## Notes
This is a ready-to-run project starter. You must add your own environment values, run it, test it, take genuine screenshots, and deploy it before submitting live links.
