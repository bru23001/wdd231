const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects...',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

document.addEventListener('DOMContentLoaded', () => {
    displayCourses('all');
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("last-modified").textContent = document.lastModified;
});

function displayCourses(filter) {
    const courseContainer = document.querySelector('.course-grid');
    courseContainer.innerHTML = ''; 

    // Filter and display courses
    let filteredCourses = courses;
    if (filter !== 'all') {
        filteredCourses = courses.filter(course => course.subject === filter);
    }

    // Display each course and mark completed courses in light grey
    filteredCourses.forEach(course => {
        const courseButton = document.createElement('button');
        courseButton.classList.add('course-button');
        if (course.completed) {
            courseButton.classList.add('completed');
        }
        courseButton.textContent = `${course.subject} ${course.number}`;
        courseContainer.appendChild(courseButton);
    });

    // Calculate total credits
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('totalCredits').textContent = `Total Credits: ${totalCredits}`;
}

const hamButton = document.querySelector(".hamburger");
const navigation = document.querySelector("nav-bar"); 

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open"); 
    hamButton.textContent = navigation.classList.contains("open") ? "✖" : "≡"; 
});