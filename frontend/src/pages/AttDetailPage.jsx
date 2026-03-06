import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import api from "../lib/axios.js";
import toast from 'react-hot-toast';
import {
  LoaderIcon,
  Trash2Icon,
  ArrowLeftIcon,
  User,
  Hash,
  Building2,
  CalendarDays,
  BookOpen,
  UserCheck
} from 'lucide-react';

const AttDetailPage = () => {
  const [att, setAtt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchAtt = async () => {
      try {
        const res = await api.get(`/attendance/${id}`);
        setAtt(res.data);
      } catch (error) {
        console.error("Error fetching student Record", error);
        toast.error("Failed to fetch the student Record");
      } finally {
        setLoading(false);
      }
    };
    fetchAtt();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this student Record?")) return;

    try {
      await api.delete(`/attendance/${id}`);
      toast.success("Student Record deleted successfully");
      navigate("/", { state: { updated: true } });
    } catch (error) {
      console.error("Error deleting student Record", error);
      toast.error("Failed to delete student Record");
    }
  };

  const handleSave = async () => {
    if (
      !att.stuName.trim() ||
      !att.stuId ||
      !att.year ||
      !att.department.trim() ||
      !att.semester ||
      !att.date ||
      !att.lec_attended ||
      !att.lec_conducted ||
      !att.faculty.trim()
    ) {
      toast.error("Please enter required details");
      return;
    }

    setSaving(true);

    try {
      if(Number(att.lec_attended)> Number(att.lec_conducted)){
        toast.error("Invalid Lecture Count!")
        return;
      }
      // Only one PUT request needed, all validation is already done
      await api.put(`/attendance/${id}`, {
        stuId: Number(att.stuId),
        department: att.department,
        stuName: att.stuName,
        year: Number(att.year),
        semester: Number(att.semester),
        lec_attended: Number(att.lec_attended),
        lec_conducted: Number(att.lec_conducted),
        faculty: att.faculty,
        date: new Date(att.date)
      });

      toast.success("Student Record saved successfully");
      navigate("/", { state: { updated: true } });
    } catch (error) {
      console.error("Error saving student Record", error);
      toast.error("Failed to save student Record. Enter valid lecture numbers");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10 text-primary' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='max-w-4xl mx-auto p-6'>
        <div className='flex justify-between items-center mb-6'>
          <Link to="/" className='btn btn-ghost gap-2'>
            <ArrowLeftIcon className='size-4' /> Dashboard
          </Link>

          <button onClick={handleDelete} className='btn btn-error btn-outline gap-2'>
            <Trash2Icon className='size-4' /> Delete
          </button>
        </div>

        <div className='card bg-base-100 shadow-xl border border-base-300'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-6'>Edit Student Record</h2>

            <div className='grid md:grid-cols-2 gap-5'>
              {/* Student Name */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text flex gap-2 items-center">
                    <User className="size-4" /> Student Name
                  </span>
                </div>
                <input
                  type='text'
                  className='input input-bordered'
                  value={att.stuName}
                  onChange={(e) => setAtt({ ...att, stuName: e.target.value })}
                />
              </label>

              {/* Student ID */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text flex gap-2 items-center">
                    <Hash className="size-4" /> Student ID
                  </span>
                </div>
                <input
                  type='number'
                  className='input input-bordered'
                  value={att.stuId}
                  onChange={(e) => setAtt({ ...att, stuId: e.target.value })}
                />
              </label>

              {/* Department */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text flex gap-2 items-center">
                    <Building2 className="size-4" /> Department
                  </span>
                </div>
                <select
                  className='select select-bordered'
                  value={att.department}
                  onChange={(e) => setAtt({ ...att, department: e.target.value })}
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="BCOM">BCOM</option>
                  <option value="BBA">BBA</option>
                </select>
              </label>

              {/* Year */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text flex gap-2 items-center">
                    <BookOpen className="size-4" /> Year
                  </span>
                </div>
                <input
                  type='number'
                  className='input input-bordered'
                  value={att.year}
                  onChange={(e) => setAtt({ ...att, year: e.target.value })}
                />
              </label>

              {/* Semester */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Semester</span>
                </div>
                <select
                  className="select select-bordered"
                  value={att.semester}
                  onChange={(e) => setAtt({ ...att, semester: Number(e.target.value) })}
                >
                  <option value="">Select Semester</option>
                  {[1, 2, 3, 4, 5, 6].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>

              {/* Date */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text flex gap-2 items-center">
                    <CalendarDays className="size-4" /> Date
                  </span>
                </div>
                <input
                  type='date'
                  className='input input-bordered'
                  value={att.date ? new Date(att.date).toISOString().split("T")[0] : ""}
                  onChange={(e) => setAtt({ ...att, date: e.target.value })}
                />
              </label>

              {/* Lectures Conducted */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Lectures Conducted</span>
                </div>
                <input
                  type='number'
                  className='input input-bordered'
                  value={att.lec_conducted}
                  onChange={(e) => setAtt({ ...att, lec_conducted: e.target.value })}
                />
              </label>

              {/* Lectures Attended */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Lectures Attended</span>
                </div>
                <input
                  type='number'
                  className='input input-bordered'
                  value={att.lec_attended}
                  onChange={(e) => setAtt({ ...att, lec_attended: e.target.value })}
                />
              </label>

              {/* Faculty */}
              <label className="form-control md:col-span-2">
                <div className="label">
                  <span className="label-text flex gap-2 items-center">
                    <UserCheck className="size-4" /> Faculty
                  </span>
                </div>
                <input
                  type='text'
                  className='input input-bordered'
                  value={att.faculty}
                  onChange={(e) => setAtt({ ...att, faculty: e.target.value })}
                />
              </label>
            </div>

            <div className='card-actions justify-end mt-6'>
              <button
                className='btn btn-primary px-8'
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AttDetailPage;