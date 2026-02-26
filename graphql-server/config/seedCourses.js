const Course = require('../models/Course');

const baseCourses = [
  // Software Engineering
  { courseCode: "COMP101", courseName: "Intro to Programming", program: "Software Engineering", semester: "Fall" },
  { courseCode: "COMP202", courseName: "Data Structures", program: "Software Engineering", semester: "Winter" },
  { courseCode: "COMP303", courseName: "Algorithms", program: "Software Engineering", semester: "Fall" },
  { courseCode: "COMP404", courseName: "Database Systems", program: "Software Engineering", semester: "Winter" },
  { courseCode: "COMP505", courseName: "Software Architecture", program: "Software Engineering", semester: "Fall" },

  // Biology
  { courseCode: "BIO101", courseName: "General Biology", program: "Biology", semester: "Fall" },
  { courseCode: "BIO202", courseName: "Genetics", program: "Biology", semester: "Winter" },
  { courseCode: "BIO303", courseName: "Microbiology", program: "Biology", semester: "Fall" },

  // Business
  { courseCode: "BUS100", courseName: "Intro to Business", program: "Business", semester: "Fall" },
  { courseCode: "BUS200", courseName: "Marketing Principles", program: "Business", semester: "Winter" },
  { courseCode: "BUS300", courseName: "Financial Management", program: "Business", semester: "Fall" }
];

const generateCoursesWithSections = () => {
  const sections = ["001", "002", "003"];
  const courses = [];

  baseCourses.forEach(course => {
    sections.forEach(section => {
      courses.push({
        ...course,
        section
      });
    });
  });

  return courses;
};

const seedCourses = async () => {
  const count = await Course.countDocuments();

  if (count === 0) {
    const courses = generateCoursesWithSections();
    await Course.insertMany(courses);
    console.log("✅ Courses with 3 sections created");
  }
};

module.exports = seedCourses;