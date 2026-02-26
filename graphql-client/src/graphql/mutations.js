import { gql } from '@apollo/client';

export const LOGIN_STUDENT = gql`
  mutation LoginStudent($studentNumber: String!, $password: String!) {
    loginStudent(studentNumber: $studentNumber, password: $password) {
      token
      student {
        id
        studentNumber
        firstName
        lastName
        address
        city
        phoneNumber
        email
        program
      }
    }
  }
`;
export const SIGNUP_STUDENT = gql`
  mutation SignupStudent(
    $studentNumber: String!
    $password: String!
    $firstName: String
    $lastName: String
    $address: String
    $city: String
    $phoneNumber: String
    $email: String
    $program: String!
  ) {
    signupStudent(
      studentNumber: $studentNumber
      password: $password
      firstName: $firstName
      lastName: $lastName
      address: $address
      city: $city
      phoneNumber: $phoneNumber
      email: $email
      program: $program
    ) {
      id
      studentNumber
      firstName
      lastName
      address
      city
      phoneNumber
      email
      program
    }
  }
`;
export const ADD_COURSE = gql`
  mutation AddCourse($studentId: ID!, $courseId: ID!) {
    addCourse(studentId: $studentId, courseId: $courseId) {
      id
      courses {
        id
        courseCode
        courseName
      }
    }
  }
`;
export const DROP_COURSE = gql`
  mutation DropCourse($studentId: ID!, $courseId: ID!) {
    dropCourse(studentId: $studentId, courseId: $courseId) {
      id
    }
  }
`;