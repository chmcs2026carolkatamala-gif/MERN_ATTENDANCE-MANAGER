import { useParams,Link } from "react-router";
import { useEffect, useState } from "react";
import api from "../lib/axios";
import { ArrowLeftIcon, User, Hash, Building2, CalendarDays, BadgeCheck, BadgeAlert } from 'lucide-react';

function StudentProfile() {

  const { id } = useParams();
  const [stu, setstu] = useState(null);

  useEffect(() => {
    api.get(`/attendance/${id}`).then((res) => {
      setstu(res.data);
    });
  }, [id]);

  if (!stu) return <p className="text-center mt-20">Loading...</p>;

  const eligible = stu.attStatus === "Eligible";

  return (
    <div className="min-h-screen bg-base-200 p-6">

      <div className="max-w-xl mx-auto">

        <Link to={'/'} className='btn btn-ghost mb-6 gap-2'>
          <ArrowLeftIcon className='size-5' />
          Back to Dashboard
        </Link>

        <div className="card bg-base-100 shadow-xl border border-base-300">

          <div className="card-body">

            <h2 className="card-title text-2xl mb-4">
              Student Profile
            </h2>

            <div className="space-y-3">

              <p className="flex items-center gap-2">
                <User className="size-4 text-primary"/>
                <strong>Name:</strong> {stu.stuName}
              </p>

              <p className="flex items-center gap-2">
                <Hash className="size-4 text-primary"/>
                <strong>ID:</strong> {stu.stuId}
              </p>

              <p className="flex items-center gap-2">
                <Building2 className="size-4 text-primary"/>
                <strong>Department:</strong> {stu.department}
              </p>

              <p><strong>Semester:</strong> {stu.semester}</p>
              <p><strong>Faculty:</strong> {stu.faculty}</p>

              <p><strong>Lectures Conducted:</strong> {stu.lec_conducted}</p>
              <p><strong>Lectures Attended:</strong> {stu.lec_attended}</p>

              <p className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary"/>
                <strong>Date:</strong> {new Date(stu.date).toLocaleDateString()}
              </p>

              <p><strong>Year:</strong> {stu.year}</p>

              <div className="divider"></div>

              <p className="text-lg font-semibold">
                Attendance: {stu.attPercentage}%
              </p>

              <div className={`badge ${eligible ? "badge-success" : "badge-error"} gap-2`}>

                {eligible
                  ? <BadgeCheck className="size-4"/>
                  : <BadgeAlert className="size-4"/>}

                {stu.attStatus}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentProfile;