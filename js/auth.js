// auth.js: Handles user authentication and other operations

// Handle Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            alert('Login Successful');
            window.location.href = 'dashboard.html';
        } else {
            alert('Login Failed: ' + (data.message || 'Invalid credentials'));
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    });
});

// Handle Signup Form Submission
document.getElementById('signupForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    fetch('http://127.0.0.1:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, password: password, role: role })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'User registered successfully') {
            alert('Signup Successful');
            window.location.href = 'login.html';
        } else {
            alert('Signup Failed: ' + (data.message || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error during signup:', error);
        alert('An error occurred during signup.');
    });
});

// Handle Payment Form Submission
document.getElementById('paymentForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const cardNumber = document.getElementById('cardNumber').value;
    const expirationDate = document.getElementById('expirationDate').value;
    const cvv = document.getElementById('cvv').value;

    fetch('http://127.0.0.1:5000/api/payment', { // Replace with your backend endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ cardNumber: cardNumber, expirationDate: expirationDate, cvv: cvv })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Payment Successful') {
            alert('Payment Successful');
            window.location.href = 'dashboard.html';
        } else {
            alert('Payment Failed: ' + (data.message || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error during payment:', error);
        alert('An error occurred during payment.');
    });
});

// Fetch and Display Courses
document.addEventListener('DOMContentLoaded', function() {
    const coursesContainer = document.getElementById('coursesList');
    if (!coursesContainer) return;

    fetch('http://127.0.0.1:5000/api/courses', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => response.json())
    .then(data => {
        if (data && Array.isArray(data)) {
            data.forEach(course => {
                const courseDiv = document.createElement('div');
                courseDiv.className = 'course-item';
                courseDiv.innerHTML = `
                    <h5>${course.title}</h5>
                    <p>${course.description}</p>
                    <button class="btn btn-primary" onclick="enrollInCourse(${course.id})">Enroll</button>
                `;
                coursesContainer.appendChild(courseDiv);
            });
        } else {
            coursesContainer.innerHTML = '<p>No courses available at the moment.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching courses:', error);
        coursesContainer.innerHTML = '<p>An error occurred while fetching courses.</p>';
    });
});

// Enroll in a Course
function enrollInCourse(courseId) {
    fetch('http://127.0.0.1:5000/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ course_id: courseId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Enrollment Successful') {
            alert('You have successfully enrolled in the course!');
        } else {
            alert('Enrollment Failed: ' + (data.message || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error during enrollment:', error);
        alert('An error occurred during enrollment.');
    });
}
