-- Create the database
CREATE DATABASE IF NOT EXISTS it_course;

-- Create user and grant permissions
CREATE USER IF NOT EXISTS 'Amr2221'@'localhost' IDENTIFIED BY '0000';
GRANT ALL PRIVILEGES ON it_course.* TO 'Amr2221'@'localhost';
FLUSH PRIVILEGES;

-- Use the database
USE it_course;

-- Create the User table
CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    role ENUM('student', 'instructor', 'admin') NOT NULL DEFAULT 'student',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    date_joined DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME DEFAULT NULL
);

-- Create the Course table
CREATE TABLE IF NOT EXISTS Course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('theoretical', 'practical') NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the Enrollment table
CREATE TABLE IF NOT EXISTS Enrollment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Course(id) ON DELETE CASCADE
);

-- Create the Payment table
CREATE TABLE IF NOT EXISTS Payment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('successful', 'failed', 'pending') NOT NULL DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);

-- Insert default courses
INSERT IGNORE INTO Course (title, description, category) VALUES
('Computer Systems', 'Introduction to how computer systems work.', 'theoretical'),
('Input and Output Devices', 'Understanding different types of input and output devices.', 'theoretical'),
('Security Basics', 'Learn the basics of cybersecurity.', 'theoretical'),
('Microsoft Word', 'Practical guide to using Microsoft Word.', 'practical'),
('Microsoft Excel', 'Master data organization with Excel.', 'practical');

-- Verify user creation
SELECT User, Host FROM mysql.user WHERE User = 'Amr2221';

-- Ensure permissions are applied
GRANT ALL PRIVILEGES ON it_course.* TO 'Amr2221'@'localhost';
FLUSH PRIVILEGES;
