
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

  courses: async (_, __, context) => {
  if (!context.user)
    throw new Error("Not authenticated");

  const student = await Student.findById(context.user.id);

  return await Course.find({
    program: student.program
  });
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

  const token = jwt.sign(
    { id: student.id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    token,
    student
  };
},

    createCourse: async (_, args, context) => {
  if (!context.user) throw new Error('Not authenticated');

  const course = new Course(args);
  return course.save();
},

    addCourse: async (_, { studentId, courseId }, context) => {
  if (!context.user) throw new Error('Not authenticated');

  if (context.user.id !== studentId)
    throw new Error('Not authorized');

  const student = await Student.findById(studentId);

  if (!student.courses.some(id => id.toString() === courseId)) {
    student.courses.push(courseId);
  }

  await student.save();
  return student;
},

    updateCourseSection: async (_, { courseId, section }, context) => {
  if (!context.user) throw new Error('Not authenticated');

  return await Course.findByIdAndUpdate(
    courseId,
    { section },
    { new: true }
  );
},

    dropCourse: async (_, { studentId, courseId }, context) => {
  if (!context.user) throw new Error('Not authenticated');

  if (context.user.id !== studentId)
    throw new Error('Not authorized');

  const student = await Student.findById(studentId);

  student.courses = student.courses.filter(
    id => id.toString() !== courseId
  );

  await student.save();
  return student;
}
    
  }
};

module.exports = resolvers;