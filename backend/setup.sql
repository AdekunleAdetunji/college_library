-- Create user 'library' with password 'library'
CREATE USER library WITH PASSWORD 'library';

-- Create database 'library' and grant privileges to 'library' user
CREATE DATABASE library;
GRANT ALL PRIVILEGES ON DATABASE library TO library;

-- Create database 'university' and grant read privileges to 'library' user
CREATE DATABASE university;
GRANT CONNECT ON DATABASE university TO library;
\c university;

-- Create 'staff' table
CREATE TABLE staffs (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    middlename VARCHAR(50),
    staff_no VARCHAR(20),
    email VARCHAR(100),
    phone_no VARCHAR(20)
);

-- Create 'students' table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    middlename VARCHAR(50),
    matric_no VARCHAR(20),
    email VARCHAR(100),
    phone_no VARCHAR(20)
);

-- Insert mock data into the tables created
-- Insert names into 'staff' table
INSERT INTO staffs (firstname, lastname, middlename, staff_no, email, phone_no) VALUES
    ('John', 'Doe', 'A', 'S001', 'john.doe@example.com', '1234567890'),
    ('Jane', 'Smith', 'B', 'S002', 'jane.smith@example.com', '2345678901'),
    ('Michael', 'Johnson', 'C', 'S003', 'michael.johnson@example.com', '3456789012'),
    ('Emily', 'Williams', 'D', 'S004', 'emily.williams@example.com', '4567890123'),
    ('David', 'Brown', 'E', 'S005', 'david.brown@example.com', '5678901234'),
    ('Sarah', 'Jones', 'F', 'S006', 'sarah.jones@example.com', '6789012345'),
    ('Matthew', 'Garcia', 'G', 'S007', 'matthew.garcia@example.com', '7890123456'),
    ('Jessica', 'Martinez', 'H', 'S008', 'jessica.martinez@example.com', '8901234567'),
    ('Daniel', 'Lee', 'I', 'S009', 'daniel.lee@example.com', '9012345678'),
    ('Ashley', 'Rodriguez', 'J', 'S010', 'ashley.rodriguez@example.com', '0123456789');

-- Insert names into 'students' table
INSERT INTO students (firstname, lastname, middlename, matric_no, email, phone_no) VALUES
    ('Ethan', 'Taylor', 'K', 'M001', 'ethan.taylor@example.com', '9876543210'),
    ('Olivia', 'Brown', 'L', 'M002', 'olivia.brown@example.com', '8765432109'),
    ('Alexander', 'Anderson', 'M', 'M003', 'alexander.anderson@example.com', '7654321098'),
    ('Sophia', 'Thomas', 'N', 'M004', 'sophia.thomas@example.com', '6543210987'),
    ('William', 'White', 'O', 'M005', 'william.white@example.com', '5432109876'),
    ('Isabella', 'Harris', 'P', 'M006', 'isabella.harris@example.com', '4321098765'),
    ('James', 'Clark', 'Q', 'M007', 'james.clark@example.com', '3210987654'),
    ('Charlotte', 'Lewis', 'R', 'M008', 'charlotte.lewis@example.com', '2109876543'),
    ('Benjamin', 'King', 'S', 'M009', 'benjamin.king@example.com', '1098765432'),
    ('Mia', 'Jackson', 'T', 'M010', 'mia.jackson@example.com', '0987654321');

-- Grant SELECT privileges on 'staff' and 'students' tables to 'library' user
GRANT SELECT ON staffs TO library;
GRANT SELECT ON students TO library;