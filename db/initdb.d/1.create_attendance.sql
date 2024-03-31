CREATE TABLE attendance (
    id INT PRIMARY KEY,
    date DATE NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    name VARCHAR(255) NOT NULL
);