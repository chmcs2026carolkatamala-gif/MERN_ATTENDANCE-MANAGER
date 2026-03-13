Attendance Manager (MERN Stack)

A full-stack Attendance Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).
This application allows users to manage student attendance records with features like searching, filtering, viewing detailed student attendance profiles, etc.

Tech Stack

Frontend

React.js (Vite)

Tailwind CSS

Axios

React Router DOM

React Hot Toast

Lucide Icons

Backend

Node.js

Express.js

MongoDB

Mongoose

dotenv

CORS

Project Structure

Attendance-Manager/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── attController.js
│   │   ├── models/
│   │   │   └── attModel.js
│   │   ├── routes/
│   │   │   └── attRoutes.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── package-lock.json
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AttCard.jsx
│   │   │   ├── StudentNotFound.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── lib/
│   │   │   └── axios.js
│   │   │
│   │   ├── pages/
│   │   │   ├── CreatePage.jsx
│   │   │   ├── AttDetailPage.jsx
│   │   │   ├── StudentProfile.jsx
│   │   │   └── HomePage.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── eslint.config.js
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── package-lock.json
│   └── package.json
│
├── .gitignore
└── package.json


Features

Add New Student Attendance Record

Update Attendance Details

Delete Attendance Record

View All Student Records

Search Students by Name or ID or Percentage

View Detailed Student Attendance Profile

Track Lectures Conducted and Lectures Attended

Automatic Percentage Calculation in the backend

Filter according to Eligible and Non-eligible students

Sort according to Percentage- High to Low/Low to High

List Students according to- Departments, semester, Percentage

Responsive User Interface using Tailwind CSS


Attendance Record Fields

Student Name

Student ID

Department

Year

Semester

Faculty

Date

Lectures Conducted

Lectures Attended

Attendance Percentage 

Attendance Status

createdAt

updatedAt


Installation & Setup

1. Clone the Repository

git clone <your-repository-url>
cd Attendance-Manager


2. Backend Setup

cd backend
npm install

Create a .env file inside backend/

PORT=3001
MONGO_URI=your_mongodb_connection_string

Run backend server

npm run dev


3. Frontend Setup

cd frontend
npm install
npm run dev

Frontend runs on

http://localhost:5173

Backend runs on

http://localhost:3001


API Routes (Backend)

Method      Route                      Description

GET         /api/attendance            Get all attendance records
GET         /api/attendance/:id        Get single student record
POST        /api/attendance            Create new attendance record
PUT         /api/attendance/:id        Update attendance record
DELETE      /api/attendance/:id        Delete attendance record


Learning Outcomes

Understanding MERN stack architecture

Building REST APIs using Express.js

MongoDB schema design using Mongoose

React state management and component structure

Frontend styling using Tailwind CSS

Connecting frontend and backend using Axios


Future Enhancements

Authentication and Authorization (Admin/Faculty login)

Attendance Percentage Calculation

Dashboard Analytics

Export Attendance Reports

Pagination for large datasets

Mobile responsive improvements


Author

Carol Katamala
BSc Computer Science
Smt. Chandibai Himathmal Mansukhani College
