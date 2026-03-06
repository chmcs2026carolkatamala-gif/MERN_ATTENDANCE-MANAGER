import { Link, useNavigate } from "react-router";
import { User, BadgeCheck, XCircle, Edit2, Trash2, Eye, GraduationCap } from "lucide-react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { useState } from "react";

const AttCard = ({ att, setAtt }) => {

  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const handleDelete = async () => {

    try {

      await api.delete(`/attendance/${att._id}`)

      setAtt(prev => prev.filter((e) => e._id !== att._id))

      toast.success("Student record deleted")

    } catch {

      toast.error("Failed to delete record")

    } finally {

      setShowModal(false)

    }

  }

  const eligible = att.attStatus === "Eligible"

  const percentage = Number(att.attPercentage).toFixed(2)

  return (

    <>

      {/* CARD */}
      <div
        onClick={() => navigate(`/attendance/view/${att._id}`)}
        className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
      >

        <div className="card-body">

          {/* HEADER */}
          <div className="flex justify-between items-start">

            <div className="flex items-center gap-2">

              <div className="bg-primary/10 p-2 rounded-lg">
                <GraduationCap className="size-5 text-primary"/>
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  {att.stuName}
                </h2>

                <p className="text-xs opacity-60">
                  ID : {att.stuId}
                </p>
              </div>

            </div>

            {/* STATUS ICON */}
            {eligible ? (
              <div className="tooltip" data-tip="Eligible">
                <BadgeCheck className="text-success size-6"/>
              </div>
            ) : (
              <div className="tooltip" data-tip="Not Eligible">
                <XCircle className="text-error size-6"/>
              </div>
            )}

          </div>


          {/* DEPARTMENT */}
          <p className="text-sm opacity-70 mt-2">
            {att.department}
          </p>


          {/* ATTENDANCE */}
          <div className="flex items-center justify-between mt-4">

            <div>

              <p className="text-xs opacity-60">
                Attendance
              </p>

              <p className="font-semibold text-lg">
                {percentage}%
              </p>

            </div>

            <div
            className="radial-progress text-info/60"
            style={{
                "--value": Number(att.attPercentage),
                "--size": "3rem"
            }}
            >
            {percentage}
            </div>

          </div>


          {/* ACTIONS */}
          <div className="flex justify-end gap-4 mt-5 border-t pt-3">

            {/* VIEW */}
            <button
              className="tooltip text-info hover:scale-110"
              data-tip="View Profile"
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/attendance/view/${att._id}`)
              }}
            >
              <Eye className="size-4"/>
            </button>

            {/* EDIT */}
            <button
              className="tooltip text-warning hover:scale-110"
              data-tip="Edit Record"
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/attendance/${att._id}`)
              }}
            >
              <Edit2 className="size-4"/>
            </button>

            {/* DELETE */}
            <button
              className="tooltip text-error hover:scale-110"
              data-tip="Delete Record"
              onClick={(e) => {
                e.stopPropagation()
                setShowModal(true)
              }}
            >
              <Trash2 className="size-4"/>
            </button>

          </div>

        </div>
      </div>


      {/* DELETE MODAL */}
      {showModal && (

        <dialog className="modal modal-open">

          <div className="modal-box">

            <h3 className="font-bold text-lg flex items-center gap-2">
              <Trash2 className="size-5 text-error"/>
              Delete Student
            </h3>

            <p className="py-4">
              Delete <strong>{att.stuName}</strong> permanently?
            </p>

            <div className="modal-action">

              <button
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-error"
                onClick={handleDelete}
              >
                Delete
              </button>

            </div>

          </div>

        </dialog>

      )}

    </>
  )
}

export default AttCard