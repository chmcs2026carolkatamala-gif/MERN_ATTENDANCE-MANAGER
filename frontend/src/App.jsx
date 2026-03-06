import React from 'react'
import { Route,Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import AttDetailPage from './pages/AttDetailPage.jsx'
import StudentProfile from './pages/StudentProfile.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/attendance/:id" element={<AttDetailPage />} />
        <Route path="/attendance/view/:id" element={<StudentProfile />} />

      </Routes>
    </div>
  )
}

export default App
