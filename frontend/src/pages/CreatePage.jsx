import React, { useState } from 'react';
import api from '../lib/axios';
import { ArrowLeftIcon, User, Hash, Building2, CalendarDays, BookOpen, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

const InputField = ({ label, icon: Icon, value, onChange, type = 'text', placeholder }) => (
  <label className='form-control'>
    <span className='label-text flex gap-2 items-center'>
      {Icon && <Icon className='size-4' />} {label}
    </span>
    <input
      type={type}
      className='input input-bordered'
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  </label>
);

const SelectField = ({ label, icon: Icon, value, onChange, options }) => (
  <label className='form-control'>
    <span className='label-text flex gap-2 items-center'>
      {Icon && <Icon className='size-4' />} {label}
    </span>
    <select className='select select-bordered' value={value} onChange={onChange} required>
      <option value="">Select {label}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </label>
);

const CreatePage = () => {
  const [form, setForm] = useState({
    stuName: '',
    stuId: '',
    year: '',
    semester: '',
    department: '',
    lec_conducted: '',
    lec_attended: '',
    date: '',
    faculty: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (form.semester < 1 || form.semester > 6) {
      toast.error('Semester must be between 1 and 6');
      setLoading(false);
      return;
    }

    if (Number(form.lec_attended) > Number(form.lec_conducted)) {
      toast.error('Invalid Lecture count!');
      setLoading(false);
      return;
    }

    try {
      await api.post('/attendance', {
        ...form,
        stuId: Number(form.stuId),
        year: Number(form.year),
        semester: Number(form.semester),
        lec_attended: Number(form.lec_attended),
        lec_conducted: Number(form.lec_conducted),
        date: new Date(form.date)
      });

      toast.success('Student record created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to create record', error);
      toast.error('Failed to create record.');
    } finally {
      setLoading(false);
    }
  }

  const departments = ["Computer Science", "Data Science", "Information Technology", "BCOM", "BBA"];
  const semesters = [1, 2, 3, 4, 5, 6];

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-10'>
        <div className='max-w-3xl mx-auto'>
          <Link to='/' className='btn btn-ghost mb-6 gap-2'>
            <ArrowLeftIcon className='size-5' /> Back to Dashboard
          </Link>

          <div className='card bg-base-100 shadow-xl border border-base-300'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-6'>Create New Student Record</h2>
              <form onSubmit={handleSubmit} className='grid md:grid-cols-2 gap-5'>

                <InputField
                  label="Student Name"
                  icon={User}
                  value={form.stuName}
                  onChange={e => setForm({ ...form, stuName: e.target.value })}
                  placeholder="Student Name"
                />

                <InputField
                  label="Student ID"
                  icon={Hash}
                  value={form.stuId}
                  onChange={e => setForm({ ...form, stuId: e.target.value })}
                  type="number"
                  placeholder="Student ID"
                />

                <SelectField
                  label="Department"
                  icon={Building2}
                  value={form.department}
                  onChange={e => setForm({ ...form, department: e.target.value })}
                  options={departments}
                />

                <InputField
                  label="Year"
                  icon={BookOpen}
                  value={form.year}
                  onChange={e => setForm({ ...form, year: e.target.value })}
                  type="number"
                  placeholder="YYYY"
                />

                <SelectField
                  label="Semester"
                  value={form.semester}
                  onChange={e => setForm({ ...form, semester: Number(e.target.value) })}
                  options={semesters}
                />

                <InputField
                  label="Date"
                  icon={CalendarDays}
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  type="date"
                />

                <InputField
                  label="Lectures Conducted"
                  value={form.lec_conducted}
                  onChange={e => setForm({ ...form, lec_conducted: e.target.value })}
                  type="number"
                />

                <InputField
                  label="Lectures Attended"
                  value={form.lec_attended}
                  onChange={e => setForm({ ...form, lec_attended: e.target.value })}
                  type="number"
                />

                <InputField
                  label="Faculty"
                  icon={Users}
                  value={form.faculty}
                  onChange={e => setForm({ ...form, faculty: e.target.value })}
                  placeholder="Faculty"
                />

                <div className='md:col-span-2 flex justify-end mt-4'>
                  <button type='submit' className='btn btn-primary px-8' disabled={loading}>
                    {loading ? "Creating..." : "Create Record"}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreatePage;