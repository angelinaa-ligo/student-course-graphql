import { useNavigate } from 'react-router-dom';
import "../css/dashboard.css"
export default function Dashboard() {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem('student'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    navigate('/');
  };

  return (
    <div>
      <h2>Welcome {student?.firstName}</h2>

     <p><strong>Student Number:</strong> {student?.studentNumber}</p>
<p><strong>Full Name:</strong> {student?.firstName} {student?.lastName}</p>
<p><strong>Email:</strong> {student?.email}</p>
<p><strong>Phone:</strong> {student?.phoneNumber}</p>
<p><strong>Address:</strong> {student?.address}</p>
<p><strong>City:</strong> {student?.city}</p>
<p><strong>Program:</strong> {student?.program}</p>

      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate('/courses')}>
  View All Courses
</button>
        <button onClick={() => navigate('/my-courses')}>
  View My Courses
</button>
<button onClick={() => navigate('/students')}>
  View All Students
</button>
    </div>
  );
}