import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_ALL_COURSES,
  GET_MY_COURSES
} from "../graphql/queriesGraphql";
import {
  ADD_COURSE,
  DROP_COURSE
} from "../graphql/mutations";

export default function Courses() {
  const student = JSON.parse(localStorage.getItem("student"));

  const { loading, error, data, refetch } = useQuery(GET_ALL_COURSES);

  const { data: myCoursesData } = useQuery(GET_MY_COURSES, {
    variables: { id: student.id }
  });

  const [addCourse] = useMutation(ADD_COURSE);
  const [dropCourse] = useMutation(DROP_COURSE);

  const [selectedSections, setSelectedSections] = useState({});

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error loading courses</p>;

  // 🧠 1️⃣ Agrupar cursos por courseCode
  const groupedCourses = Object.values(
    data.courses.reduce((acc, course) => {
      if (!acc[course.courseCode]) {
        acc[course.courseCode] = {
          courseCode: course.courseCode,
          courseName: course.courseName,
          semester: course.semester,
          program: course.program,
          sections: []
        };
      }

      acc[course.courseCode].sections.push({
        id: course.id,
        section: course.section
      });

      return acc;
    }, {})
  );

  const enrolledCourses = myCoursesData?.student?.courses || [];

  const handleEnroll = async (courseCode) => {
    const selectedCourseId = selectedSections[courseCode];

    if (!selectedCourseId) {
      alert("Please select a section");
      return;
    }

    // 🔎 Verificar se já está em outra section do mesmo curso
    const alreadyEnrolledSameCourse = enrolledCourses.find(
      (c) => c.courseCode === courseCode
    );

    try {
      // Se estiver em outra section → drop primeiro
      if (alreadyEnrolledSameCourse) {
        await dropCourse({
          variables: {
            studentId: student.id,
            courseId: alreadyEnrolledSameCourse.id
          }
        });
      }

      // Depois adiciona nova section
      await addCourse({
        variables: {
          studentId: student.id,
          courseId: selectedCourseId
        }
      });

      alert("Section updated successfully!");
      refetch();
    } catch (err) {
      alert("Error updating section");
    }
  };

  return (
    <div>
      <h2>All Courses</h2>

      {groupedCourses.map((course) => {
  const enrolledSection = enrolledCourses.find(
    (c) => c.courseCode === course.courseCode
  );

  const selectedSectionId =
    selectedSections[course.courseCode] || enrolledSection?.id;

  const isSameSection =
    enrolledSection && selectedSectionId === enrolledSection.id;

  return (
    <div key={course.courseCode}>
      <strong>{course.courseCode}</strong> - {course.courseName}
      <br />
      Semester: {course.semester}
      <br />

      <select
        value={selectedSectionId || ""}
        onChange={(e) =>
          setSelectedSections({
            ...selectedSections,
            [course.courseCode]: e.target.value
          })
        }
      >
        <option value="">Select Section</option>
        {course.sections.map((sec) => (
          <option key={sec.id} value={sec.id}>
            Section {sec.section}
          </option>
        ))}
      </select>

      <br />

      <button
        onClick={() => handleEnroll(course.courseCode)}
        disabled={isSameSection}
      >
        {enrolledSection ? "Switch Section" : "Enroll"}
      </button>

      {enrolledSection && (
        <p>
          Currently enrolled in Section {enrolledSection.section}
        </p>
      )}

      <hr />
    </div>
  );
})}
    </div>
  );
}