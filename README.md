# CollabHub — Student Project Collaboration Platform

A full-stack web application where students can publish project ideas, discover collaborations, search by skills/category and send join requests.

## Features
- Create and browse student project posts
- Search project title, description and skills
- Filter by project category
- Add required skills and desired team size
- Submit join requests with contact details and an introduction
- Prevent duplicate requests from the same email for one project
- MongoDB persistence and REST API
- Responsive HTML/CSS/JavaScript interface

## Stack
HTML5, CSS3, vanilla JavaScript, Node.js, Express.js, MongoDB, Mongoose.

## Run locally
1. Install Node.js LTS from https://nodejs.org/.
2. Create a free MongoDB Atlas database at https://www.mongodb.com/atlas/database.
3. In Atlas, create a database user and allow your current IP under Network Access.
4. Select Connect → Drivers and copy the connection URI.
5. Open this project folder in VS Code terminal and run `npm install`.
6. Copy `.env.example` to a new file named `.env`.
7. Replace the example URI in `.env` with your Atlas URI and correct username/password. Do not upload `.env` to GitHub.
8. Run `npm start`.
9. Open http://localhost:3000.

## API routes
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API health check |
| GET | `/api/projects` | List/search/filter projects |
| POST | `/api/projects` | Create a project |
| GET | `/api/projects/:id` | Get project and requests |
| PATCH | `/api/projects/:id` | Update project status |
| DELETE | `/api/projects/:id` | Delete project and its requests |
| POST | `/api/projects/:id/requests` | Submit join request |
| PATCH | `/api/requests/:id` | Update request status |

## Structure
- `public/` — frontend HTML, CSS and JavaScript
- `src/models/` — Mongoose database models
- `server.js` — Express server and API routes
- `.env.example` — environment variable template

## Important limitation
This assignment/demo version does not implement login or authorization. The request-management API is not protected. A production application must add authentication, authorization, validation, rate limiting and secure deployment.

## Future improvements
Student accounts, owner dashboard for reviewing requests, notifications, bookmarks, chat, automated tests and deployment.
