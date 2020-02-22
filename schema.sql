DROP DATABASE IF EXISTS Employee_DB;
CREATE DATABASE Employee_DB;
USE Employee_DB;

CREATE TABLE Departments(
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL, -- to hold dept name
    PRIMARY KEY (id) 
);

CREATE TABLE Roles(
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL, -- to hold role title
    salary DECIMAL NOT NULL, -- to hold role salary
    department_id INT NOT NULL, -- to hold ref to dept role belongs to
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES Departments(id)
);

CREATE TABLE Employees(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL, -- to hold employee first name
    last_name VARCHAR(30) NOT NULL, -- to hold employee last name
    role_id INT NOT NULL, -- to hold ref to role employee has
    manager_id INT, -- to hold ref to another emp that manager of the current emp. This may be NULL
    PRIMARY KEY (id),
    FOREIGN KEY (manager_id) REFERENCES Employees(id),
    FOREIGN KEY (role_id) REFERENCES Roles(id)
    )
