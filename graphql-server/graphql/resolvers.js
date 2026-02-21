
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Course = require('../models/Course');

const resolvers = {
  Student: {
    courses: async (parent) => {
      return Course.find({ _id: { $in: parent.courses } });
    }
  },

  Query: {
  students: async () => {
    return await Student.find().populate('courses');
  },

  student: async (_, { id }) => {
    return await Student.findById(id).populate('courses');
  },

  courses: async () => {
    return await Course.find();
  },

  course: async (_, { id }) => {
    return await Course.findById(id);
  },

  studentsByCourse: async (_, { courseId }) => {
    return await Student.find({ courses: courseId }).populate('courses');
  }
},

  Mutation: {
    signupStudent: async (_, args) => {
      const hashedPassword = await bcrypt.hash(args.password, 10);
      const student = new Student({ ...args, password: hashedPassword });
      return student.save();
    },

    loginStudent: async (_, { studentNumber, password }) => {
      const student = await Student.findOne({ studentNumber });
      if (!student) throw new Error('Student not found');
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) throw new Error('Incorrect password');
      return jwt.sign({ id: student.id }, 'SECRET_KEY', { expiresIn: '1d' });
    },

    createCourse: (_, args) => {
      const course = new Course(args);
      return course.save();
    },

    addCourse: async (_, { studentId, courseId }) => {
      const student = await Student.findById(studentId);
      if (!student.courses.includes(courseId)) student.courses.push(courseId);
      await student.save();
      return student;
    },

    updateCourseSection: async (_, { courseId, section }) => {
      return await Course.findByIdAndUpdate(
        courseId,
        { section },
        { new: true }
      );
    },

    dropCourse: async (_, { studentId, courseId }) => {
      const student = await Student.findById(studentId);
      student.courses = student.courses.filter(id => id.toString() !== courseId);
      await student.save();
      return student;
    }
  }
};

module.exports = resolvers;