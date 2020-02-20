DROP DATABASE IF EXISTS Employee_DB;
CREATE DATABASE Employee_DB;
USE Employee_DB;

CREATE TABLE Department(
    id INT AUTO_INCREMENT,
    name VARCHAR(30), -- to hold dept name
    PRIMARY KEY (id) 
);

CREATE TABLE Role(
    id INT AUTO_INCREMENT,
    title VARCHAR(30), -- to hold role title
    salary DECIMAL, -- to hold role salary
    department_id INT, -- to hold ref to dept role belongs to
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES Department(id)
);

CREATE TABLE Employee(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30), -- to hold employee first name
    last_name VARCHAR(30), -- to hold employee last name
    role_id INT, -- to hold ref to role employee has
    manager_id INT, -- to hold ref to another emp that manager of the current emp. This may be NULL
    PRIMARY KEY (id),
    FOREIGN KEY (manager_id) REFERENCES Employee(id),
    FOREIGN KEY (role_id) REFERENCES Role(id)
)