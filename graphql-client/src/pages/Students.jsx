import { useQuery } from '@apollo/client/react';
import { GET_ALL_STUDENTS } from '../graphql/queriesGraphql';

export default function Students() {

  const { loading, error, data } = useQuery(GET_ALL_STUDENTS);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error loading students</p>;

  return (
    <div>
      <h2>All Students</h2>

      {data.students.map(student => (
        <div key={student.id}>
          <strong>{student.firstName} {student.lastName}</strong>
          <br />
          Email: {student.email}
          <br />
          Program: {student.program}
          <hr />
        </div>
      ))}
    </div>
  );
}