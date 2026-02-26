import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { GET_STUDENTS_BY_COURSE } from '../graphql/queriesGraphql';

export default function CourseStudents() {
  const { courseId } = useParams();

  const { loading, error, data } = useQuery(GET_STUDENTS_BY_COURSE, {
    variables: { courseId }
  });

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error loading students</p>;

  const students = data.studentsByCourse;

  return (
    <div>
      <h2>Students in this course</h2>

      {students.length === 0 ? (
        <p>No students enrolled</p>
      ) : (
        students.map(student => (
          <div key={student.id}>
            <strong>{student.firstName} {student.lastName}</strong>
            <br />
            Email: {student.email}
            <br />
            Program: {student.program}
            <hr />
          </div>
        ))
      )}
    </div>
  );
}