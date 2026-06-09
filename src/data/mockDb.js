// [AI Generated Code - Prompt: "Thiết kế mock database cho users, categories, products, enrollments"]

export const mockDb = {
  users: [
    { id: 1, name: "Admin User", email: "admin@fpt.edu.vn", password: "123456", role: "admin", status: "Active" },
    { id: 2, name: "John Instructor", email: "instructor1@fpt.edu.vn", password: "123456", role: "instructor", status: "Active" },
    { id: 3, name: "Emily Instructor", email: "instructor2@fpt.edu.vn", password: "123456", role: "instructor", status: "Active" },
    { id: 4, name: "Alice Student", email: "student1@fpt.edu.vn", password: "123456", role: "student", status: "Active" },
    { id: 5, name: "Bob Student", email: "student2@fpt.edu.vn", password: "123456", role: "student", status: "Active" },
    { id: 6, name: "Charlie Student", email: "student3@fpt.edu.vn", password: "123456", role: "student", status: "Locked" },
  ],
  categories: [
    { id: 1, name: "Web Development", description: "Frontend and Backend web development courses." },
    { id: 2, name: "Data Science", description: "Python, AI, ML and Data analysis." },
    { id: 3, name: "Design", description: "UI/UX, Graphic Design, 3D modeling." }
  ],
  courses: [
    { 
      id: 1, 
      title: "React Modern Web Development", 
      instructorId: 2,
      instructorName: "John Instructor",
      categoryId: 1,
      categoryName: "Web Development",
      description: "Learn React from scratch to advanced concepts.",
      status: "Approved",
      image: "https://via.placeholder.com/300x180/0f52ba/ffffff?text=React+Web+Dev"
    },
    { 
      id: 2, 
      title: "Python Data Science Mastery", 
      instructorId: 2,
      instructorName: "John Instructor",
      categoryId: 2,
      categoryName: "Data Science",
      description: "Master Python and popular data science libraries.",
      status: "Approved",
      image: "https://via.placeholder.com/300x180/10b981/ffffff?text=Python+Data+Science"
    },
    { 
      id: 3, 
      title: "Figma UI/UX Design Pro", 
      instructorId: 2,
      instructorName: "John Instructor",
      categoryId: 3,
      categoryName: "Design",
      description: "Learn UI/UX design rules and Figma.",
      status: "Pending",
      image: "https://via.placeholder.com/300x180/f59e0b/ffffff?text=Figma+Pro"
    }
  ],
  enrollments: [
    { id: 1, studentId: 3, studentName: "Alice Student", courseId: 1, courseTitle: "React Modern Web Development", status: "Approved", enrolledDate: "2026-06-01" },
    { id: 2, studentId: 3, studentName: "Alice Student", courseId: 2, courseTitle: "Python Data Science Mastery", status: "Pending", enrolledDate: "2026-06-05" }
  ],
  stats: {
    totalStudents: 150,
    totalCourses: 45,
    totalRevenue: 5400
  }
};
