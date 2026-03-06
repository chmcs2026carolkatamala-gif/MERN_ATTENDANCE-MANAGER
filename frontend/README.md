Employee Management System (MERN Stack)

A full-stack Employee Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).
This application allows users to manage employee records with features like searching, filtering, sorting, and viewing detailed employee profiles.

🚀 Tech Stack
Frontend

React.js (Vite)

Tailwind CSS

Axios

React Router DOM

Backend

Node.js

Express.js

MongoDB

Mongoose

dotenv

📂 Project Structure
Employee-Management-System/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── EmpController.js
│   │   ├── models/
│   │   │   └── EmpModels.js
│   │   ├── routes/
│   │   │   └── EmpRoutes.js
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
│   │   │   ├── EmpCard.jsx
│   │   │   ├── EmployeeNotFound.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── lib/
│   │   │   ├── axios.js
│   │   │   └── utils.js
│   │   │
│   │   ├── pages/
│   │   │   ├── CreatePage.jsx
│   │   │   ├── EmpDetailPage.jsx
│   │   │   ├── EmployeeProfile.jsx
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
├── frontend.zip
└── package.json
📌 Features

Add New Employee

Update Employee Details

Delete Employee

View All Employees

Search Employees

Filter Employees

Sort Employees

View Detailed Employee Profile

Responsive UI using Tailwind CSS

🧾 Employee Fields

Employee ID

Name

Phone Number

Designation

Department

Salary

Joining Date

Date of Birth

Address

createdAt

updatedAt

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone <your-repository-url>
cd Employee-Management-System
2️⃣ Backend Setup
cd backend
npm install

Create a .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Run backend:

npm run dev
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173

Backend runs on:

http://localhost:3000
🔄 API Routes (Backend)
Method	Route	Description
GET	/Employees	Get all employees
GET api/Employees/:id	Get single employee
POST	Employees	Create new employee
PUT	/Employees/:id	Update employee
DELETE	/Employees/:id	Delete employee
🎯 Learning Outcomes

Understanding MERN stack architecture

REST API development

MongoDB schema design using Mongoose

React state management

Tailwind CSS styling

Full-stack project deployment basics

📷 Future Enhancements

Authentication (Admin Login)

Pagination

Export to CSV

Dashboard Analytics

Dark Mode

👨‍💻 Author

Zaid Khan
Bsc Computer Science
Smt. Chandibai Himathmal Mansukhani College