
const typeDefs = `#graphql
  type Student {
    id: ID
    studentNumber: String
    firstName: String
    lastName: String
    email: String
    program: String
    courses: [Course]
  }

  type Course {
    id: ID
    courseCode: String
    courseName: String
    section: String
    semester: String
  }

  type Query {
    student(id: ID!): Student
    students: [Student]
    course(id: ID!): Course
    courses: [Course]
    studentsByCourse(courseId: ID!): [Student]
  }

  type Mutation {
    signupStudent(
      studentNumber: String!
      password: String!
      firstName: String
      lastName: String
      email: String
      program: String
    ): Student

    loginStudent(studentNumber: String!, password: String!): String

    createCourse(courseCode: String!, courseName: String!, section: String, semester: String): Course

    addCourse(studentId: ID!, courseId: ID!): Student
    updateCourseSection(courseId: ID!, section: String!): Course
    dropCourse(studentId: ID!, courseId: ID!): Student
  }
`;

module.exports = typeDefs;