import { gql } from '@apollo/client';

export const GET_ALL_COURSES = gql`
  query GetAllCourses {
    courses {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;
export const GET_MY_COURSES = gql`
  query GetStudent($id: ID!) {
    student(id: $id) {
      id
      firstName
      courses {
        id
        courseCode
        courseName
        section
        semester
      }
    }
  }
`;
export const GET_ALL_STUDENTS = gql`
  query {
    students {
      id
      firstName
      lastName
      email
      program
    }
  }
`;
export const GET_STUDENTS_BY_COURSE = gql`
  query GetStudentsByCourse($courseId: ID!) {
    studentsByCourse(courseId: $courseId) {
      id
      firstName
      lastName
      email
      program
    }
  }
`;