# CollabHub – Student Project Collaboration Platform

A web-based platform that helps students discover project opportunities, explore ideas, and connect with other students to collaborate on projects.

## About the Project

Finding teammates with shared technical interests and discovering suitable student projects can be challenging.

**CollabHub** aims to simplify this process by providing a common platform where students can publish project ideas, explore available projects, and submit requests to join teams.

This project is being developed as a student collaboration platform, with plans for further improvements in functionality, security, and scalability.

## Features

- **Create Projects:** Publish project details and collaboration opportunities.
- **Browse Projects:** Explore projects created by other students.
- **Search and Filter:** Find projects based on relevant information.
- **Join Requests:** Submit requests to participate in projects.
- **Duplicate Request Prevention:** Prevent repeated join requests for the same project.
- **Self-Join Restriction:** Prevent a project author from submitting a join request using the same email address.
- **Responsive Interface:** Access the application through different screen sizes.
- **Database Integration:** Store project information and join requests using MongoDB.

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML | Application structure |
| CSS | Styling and responsive design |
| JavaScript | Frontend functionality |
| Node.js | JavaScript runtime |
| Express.js | Backend and REST API |
| MongoDB | Database |
| Mongoose | MongoDB object modelling |

## Project Structure

```text
CollabHub/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── src/
│   └── models/
│       ├── Project.js
│       └── JoinRequest.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Getting Started

Follow these steps to run CollabHub locally.

### 1. Clone the Repository

```bash
git clone https://github.com/mohammedlaeeq/CollabHub.git
```

### 2. Navigate to the Project Directory

```bash
cd CollabHub
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root directory.

Add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/collabhub?retryWrites=true&w=majority
PORT=3000
```

Replace the placeholder values with your own MongoDB Atlas credentials.

**Important:** Never upload your actual `.env` file or database credentials to GitHub.

### 5. Start the Application

```bash
npm start
```

For development:

```bash
npm run dev
```

### 6. Open the Application

Visit:

```text
http://localhost:3000
```

Make sure MongoDB is accessible and your environment variables are configured correctly.

## Current Project Limitations

The current version is an early working implementation.

- User registration and login are not implemented.
- Authentication and role-based authorization are not yet available.
- Join requests currently rely on information submitted by the client and do not provide verified student identities.

These limitations are part of the planned development scope.

## Future Enhancements

The following features are planned for future versions:

- User registration and secure authentication.
- Individual student profiles.
- Personalized student dashboards.
- Project team management.
- Real-time collaboration and notifications.
- Improved project discovery and recommendation.
- Stronger validation, security, and testing.
- Deployment and scalability improvements.

## Project Goal

The long-term goal of CollabHub is to develop a reliable and user-friendly student collaboration ecosystem that encourages teamwork, technical learning, and project development.

## Repository

GitHub: https://github.com/mohammedlaeeq/CollabHub

---

**CollabHub – Discover. Connect. Collaborate.**
