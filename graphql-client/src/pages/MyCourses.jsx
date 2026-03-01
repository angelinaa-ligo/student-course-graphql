import { useQuery, useMutation } from '@apollo/client/react';
import { GET_MY_COURSES } from '../graphql/queriesGraphql';
import { DROP_COURSE } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
export default function MyCourses() {
  const student = JSON.parse(localStorage.getItem('student'));

  const { loading, error, data, refetch } = useQuery(GET_MY_COURSES, {
  variables: { id: student.id }
});

  const [dropCourse] = useMutation(DROP_COURSE);
const navigate = useNavigate();
  const handleDrop = async (courseId) => {
    try {
      await dropCourse({
        variables: {
          studentId: student.id,
          courseId: courseId
        }
      });

      alert('Course dropped successfully!');
      refetch();
    } catch (err) {
      alert('Error dropping course');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading courses</p>;

  return (
    <div>
      <h2>My Courses</h2>
      <button onClick={() => navigate('/dashboard')}>
  ⬅ Back to Dashboard
</button>

      {data.student.courses.map(course => (
        <div key={course.id}>
          <strong>{course.courseCode}</strong> - {course.courseName}
          <br />
          Section: {course.section}
          <br />
          Semester: {course.semester}
          <br />

         <button onClick={() => handleDrop(course.id)}>
  Drop Course
</button>

<button
  onClick={() => navigate(`/course/${course.id}/students`)}
>
  View Students
</button>
          

          <hr />
        </div>
      ))}
    </div>
  );
}