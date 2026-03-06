import {Link} from 'react-router'
import {PlusIcon} from 'lucide-react'

const Navbar = () => {
return (
    <header className='bg-blue-200 border-b border-base-content/10'>
    <div className='ms-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
<div className="text-center my-6">

  <h1 className="text-4xl md:text-6xl font-semibold tracking-wide btn-primary ">
    Attendance Manager
  </h1>

  <p className="text-sm mt-2 btn-primary tracking-wide">
    Student Attendance Dashboard
  </p>

</div>
            <div className='flex items-center gap-4  '>
                <Link to={"/create"} className="btn   text-slate-400">
                    <PlusIcon className='size-5' /> <span>Add Record</span>
                </Link>
            </div>
        </div>
    </div>
    </header>
)
}

export default Navbar;
