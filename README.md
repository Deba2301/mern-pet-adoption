# Pet Adoption Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for pet adoption management.

## Features

- User Authentication (Register/Login)
- Admin Dashboard for managing pets
- Pet listing and details view
- Adoption application submission
- Admin-only access to manage applications
- Responsive design for all devices

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── assets/       # Static assets
│   │   └── App.jsx       # Main application component
│   └── package.json      # Frontend dependencies
│
└── server/                # Backend Node.js/Express application
    ├── models/           # MongoDB models
    ├── routes/           # API routes
    ├── middleware/       # Custom middleware
    └── server.js         # Server entry point
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Deba2301/mern-pet-adoption.git
cd mern-pet-adoption-app
```

2. Install server dependencies:

```bash
cd server
npm install
```

3. Install client dependencies:

```bash
cd ../client
npm install
```

## Configuration

1. Create a `.env` file in the server directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

2. Create a `.env` file in the client directory:

```
VITE_API_URL=http://localhost:5000
```

## Running the Application

1. Start the server:

```bash
cd server
npm start
```

2. Start the client:

```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Pets

- GET `/api/pets` - Get all pets
- POST `/api/pets` - Add a new pet (Admin only)
- PUT `/api/pets/:id` - Update pet details (Admin only)
- DELETE `/api/pets/:id` - Delete a pet (Admin only)

### Applications

- POST `/api/applications` - Submit adoption application
- GET `/api/applications` - Get all applications (Admin only)
- PUT `/api/applications/:id` - Update application status (Admin only)

## Admin Access

To set up an admin account:

1. Use the provided seed script to create an admin user:

```bash
cd server
node seedAdmin.js
```

This will create an admin account with the following credentials:

- Email: admin@admin.com
- Password: admin123

Admin users have access to:

- Admin Dashboard
- Managing pets (Add/Edit/Delete)
- Viewing and managing adoption applications
- Approving/Rejecting adoption requests

## Technologies Used

- **Frontend:**

  - React.js with Vite
  - React Router
  - CSS for styling

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JSON Web Tokens (JWT)
