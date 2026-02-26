import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './pages/Signup';
import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';
import Students from './pages/Students';
import CourseStudents from './pages/CourseStudents';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/course/:courseId/students" element={<CourseStudents />} />
<Route
  path="/courses"
  element={
    <ProtectedRoute>
      <Courses />
    </ProtectedRoute>
  }
/>
<Route path="/students" element={<Students />} />
<Route path="/my-courses" element={<MyCourses />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;