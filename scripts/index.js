const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Initialize footer dates
function initializeDates() {
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById(
    "lastModified"
  ).textContent = `Last Modified: ${document.lastModified}`;
}

document.addEventListener("DOMContentLoaded", initializeDates);

const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: false,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
];

// Hamburger Menu

// Activating X and the menu

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Closing the navigation bar

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Rendering Course Cards

function renderCourses(coursesToRender = courses) {
  const courseGrid = document.getElementById("courseGrid");
  courseGrid.innerHTML = "";

  coursesToRender.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.className = `course-card ${course.completed ? "completed" : ""}`;
    courseCard.setAttribute("data-subject", course.subject);
    courseCard.setAttribute("data-course", `${course.subject}${course.number}`);

    const techTags = course.technology
      .map((tech) => `<span class = "tech-tag">${tech}</span>`)
      .join("");

    courseCard.innerHTML = `
      <div class = "course-header">
        <div>
          <div class = "course-title">${course.title}</div>
          <div class = "course-number">${course.subject} ${course.number}</div>
        </div>
      </div>
      <div class = "course-description">${course.description}</div>
      <div class = "course-tech">${techTags}</div>
      <div class = "course-status ${
        course.completed ? "status-completed" : "status-progress"
      }">${course.completed ? "✓ Completed" : "⏳ In Progress"} | ${
      course.credits
    } Credits </div>
    `;
    courseGrid.appendChild(courseCard);
  });
  updateTotalCredits(coursesToRender);
}

// Update Total Credits

function updateTotalCredits(coursesToShow = courses) {
  const totalCredits = coursesToShow.reduce(
    (sum, course) => sum + course.credits,
    0
  );
  document.getElementById("totalCredits").textContent = totalCredits;
}

// Initializing Course Filtering

function initializeCourseFiltering() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");
      let filteredCourses = courses;

      if (filter !== "all") {
        if (filter.includes("WDD") && filter.length > 3) {
          // Specific course filter like WDD130
          filteredCourses = courses.filter(
            (course) => `${course.subject}${course.number}` === filter
          );
        } else {
          // Subject filter like CSE or WDD
          filteredCourses = courses.filter(
            (course) => course.subject === filter
          );
        }
      }

      renderCourses(filteredCourses);
    });
  });
}

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeDates();
  // initializeNavigation();
  renderCourses();
  initializeCourseFiltering();
});
