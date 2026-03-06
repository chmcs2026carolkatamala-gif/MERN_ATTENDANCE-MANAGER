import { NotebookIcon } from "lucide-react"
import { Link } from "react-router"

const StudentNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
        <div className="bg-primary/10 rounded-full p-8">
            <NotebookIcon className="size-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">No Student record added yet</h3>
        <p className="text-base-content/70">Ready to add Records? Add Student Record in the attendance System.</p>
        <Link to='/create' className='btn btn-primary'>Add First Record in the attendance System</Link>
    </div>
  )}

export default StudentNotFound;
