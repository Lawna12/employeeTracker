USE Employee_DB;

INSERT INTO Departments (name)
VALUES ("Sales"),("Engineering"),("Production"),("Finance");

INSERT INTO Roles (title, salary, department_id)
VALUES ("Sales", 65000, 1), ("Engineering", 120000, 2), ("Production", 50000, 3), ("Finance", 80000, 4);

INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES ("Andrew", "Lawn", 1, null), ("Chris", "Smith", 2, 1), ("Jeremy", "Dessaules", 3, 1), ("Sparky", "Lawn", 4, 1);

SELECT * FROM Departments;
SELECT * FROM Roles;
SELECT * FROM Employees;
