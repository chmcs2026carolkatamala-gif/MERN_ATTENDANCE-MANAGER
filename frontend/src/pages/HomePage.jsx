import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar.jsx"
import api from "../lib/axios.js"
import { toast } from "react-hot-toast"
import AttCard from "../components/AttCard.jsx"
import StudentNotFound from "../components/StudentNotFound.jsx"
import { Search } from "lucide-react"
import { useLocation } from "react-router"

const HomePage = () => {

  const [att, setAtt] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [percentageFilter, setPercentageFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sort, setSort] = useState("none")

  const [selectedDept, setSelectedDept] = useState("all") 
  const [selectedSem, setSelectedSem] = useState("all") 
  const [selectedFaculty, setSelectedFaculty] = useState("all")

  const location = useLocation()

  const fetchStudent = async () => {
    try {
      const res = await api.get('/attendance')
      setAtt(res.data)
    } catch (error) {
      toast.error("Failed to load records")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudent()
  }, [])

  useEffect(() => {
    if (location.state?.updated) {
      fetchStudent()
    }
  }, [location.state])

  // Unique departments, semesters and faculties
  const departments = [...new Set(att.map(s => s.department))]
  const semesters = [...new Set(att.map(s => s.semester))].sort((a,b) => a-b)
  const faculties = [...new Set(att.map(s => s.faculty))]

  // Filtered students
  let filteredStudents = att
    .filter(s => {
      const searchValue = search.trim().toLowerCase()

      // Search by name or ID
      const stuNameMatch = s.stuName.toLowerCase().includes(searchValue)
      const stuIdMatch = s.stuId.toString().includes(searchValue)

      // Search by percentage ONLY if user typed %
      let percentageMatch = false
      if (searchValue.endsWith("%")) {
        const num = parseInt(searchValue.replace("%",""))
        if (!isNaN(num)) {
          // Match integer part of percentage (91% => 91.00-91.99)
          percentageMatch = Math.floor(s.attPercentage) === num
        }
      }

      return stuNameMatch || stuIdMatch || percentageMatch
    })
    .filter(s => {
      if (percentageFilter === "all") return true
      if (percentageFilter === "below50") return s.attPercentage < 50
      if (percentageFilter === "50to75") return s.attPercentage >= 50 && s.attPercentage < 75
      if (percentageFilter === "above75") return s.attPercentage >= 75
      return true
    })
    .filter(s => statusFilter === "all" || s.attStatus === statusFilter)
    .filter(s => selectedDept === "all" || s.department === selectedDept)
    .filter(s => selectedSem === "all" || s.semester === selectedSem)
    .filter(s => selectedFaculty === "all" || s.faculty === selectedFaculty)

  // Apply sorting
  if (sort === "asc") filteredStudents.sort((a, b) => a.attPercentage - b.attPercentage)
  else if (sort === "desc") filteredStudents.sort((a, b) => b.attPercentage - a.attPercentage)

  return (
    <div className='min-h-screen bg-base-200'>
      <Navbar />

      <div className='max-w-7xl mx-auto p-6 flex gap-6'>

        {/* SIDEBAR */}
        <div className="w-60 bg-base-100 rounded-lg shadow p-4 h-fit space-y-4 overflow-x-auto">
          {/* Department Filter */}
          <div>
            <h2 className="font-bold mb-2 text-lg">Departments</h2>
            <button className={`btn btn-sm w-full mb-2 ${selectedDept === "all" ? "btn-primary" : "btn-ghost"}`} onClick={() => setSelectedDept("all")}>All</button>
            {departments.map(dept => (
              <button key={dept} className={`btn btn-sm w-full mb-2 ${selectedDept === dept ? "btn-primary" : "btn-ghost"}`} onClick={() => setSelectedDept(dept)}>{dept}</button>
            ))}
          </div>

          {/* Semester Filter */}
          <div>
            <h2 className="font-bold mb-2 text-lg">Semester</h2>
            <button className={`btn btn-sm w-full mb-2 ${selectedSem === "all" ? "btn-primary" : "btn-ghost"}`} onClick={() => setSelectedSem("all")}>All</button>
            {semesters.map(sem => (
              <button key={sem} className={`btn btn-sm w-full mb-2 ${selectedSem === sem ? "btn-primary" : "btn-ghost"}`} onClick={() => setSelectedSem(sem)}>{sem} Semester</button>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className='flex-1'>
          {/* SEARCH + FILTER */}
          <div className='flex flex-col md:flex-row gap-4 mb-8'>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 size-4 opacity-60" />
              <input
                type="text"
                placeholder="Search student ID / Name / Attendance % (use % for percentage)"
                className="input input-bordered w-full pl-10"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <select className="select select-bordered" value={percentageFilter} onChange={e => setPercentageFilter(e.target.value)}>
              <option value="all">All %</option>
              <option value="below50">Below 50%</option>
              <option value="50to75">50% - 75%</option>
              <option value="above75">Above 75%</option>
            </select>

            <select className="select select-bordered" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="all">All Students</option>
              <option value="Eligible">Eligible</option>
              <option value="Not Eligible">Non-Eligible</option>
            </select>

            <select className="select select-bordered" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="none">Sort %</option>
              <option value="asc">Low → High</option>
              <option value="desc">High → Low</option>
            </select>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="flex justify-center py-10">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          )}

          {/* NO DATA */}
          {!loading && filteredStudents.length === 0 && <StudentNotFound />}

          {/* DEPARTMENT SECTIONS */}
          {departments.map(dept => {
            const deptStudents = filteredStudents.filter(s => s.department === dept)
            if (deptStudents.length === 0) return null

            if (sort === "asc") deptStudents.sort((a,b) => a.attPercentage - b.attPercentage)
            else if (sort === "desc") deptStudents.sort((a,b) => b.attPercentage - a.attPercentage)

            return (
              <div key={dept} className="mb-10">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">{dept} Department</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {deptStudents.map(att => <AttCard key={att._id} att={att} setAtt={setAtt} />)}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default HomePage