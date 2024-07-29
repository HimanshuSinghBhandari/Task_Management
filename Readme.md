# Task Management Application

## Overview

This is a full-stack task management application built with the following technologies:

- Frontend: Next.js with TypeScript
- Backend: Node.js with Express
- Database: MongoDB
- State Management: Redux or React Context API
- Styling: Tailwind CSS and Framer Motion

## Features

### 1. User Authentication:
- Implement signup and login functionality using email and password.
- Ensure secure password storage and user session management.

### 2. Task Board:
- Upon logging in, users should see their personal task board.
- The board has four columns: "To-Do", "In Progress", “Under Review” and "Completed".

### 3. Task Management:
- Users can create new tasks in any column.
- Each task should have:
  - A title (mandatory)
  - A description (optional)
  - Status (mandatory, automatically filled if the card is created from buttons in a specific section)
  - Priority (optional, values: Low, Medium, Urgent)
  - Deadline (optional)
- Users can edit and delete tasks after creation.

### 4. Drag and Drop Functionality:
- Implement drag and drop feature to move tasks between columns.
- The task's status should update automatically when moved to a different column.

### 5. Data Persistence:
- All user data (account information and tasks) must be stored in a database.
- Ensure that each user can only see and manage their own tasks.

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- MongoDB

### Installation

#### Frontend

### Navigate to the client directory:
  
cd client
npm install
npm run dev
## Backend
### Navigate to the server directory:
cd server

## Install the dependencies:
npm install
Create a .env file in the server directory with the following content:

MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>

Run the backend:
npm run dev
## Technologies Used Frontend:

Next.js
TypeScript
Tailwind CSS
Framer Motion

## Backend:

Node.js
Express
MongoDB
Mongoose
JSON Web Token (JWT)

## State Management:
Redux or React Context API Usage
Register or log in to the application.
Create, edit, and delete tasks.
Drag and drop tasks between different columns.
Enjoy seamless task management with data persistence.