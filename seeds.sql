USE Employee_DB;


INSERT INTO Departments (name)
VALUES ("Sales"),("Engineering"),("Production"),("Finance")

INSERT INTO Roles (title, salary, department_id)
VALUES ("Sales", 65000), ("Engineering", 120000), ("Production", 50000), ("Finance", 80000);

INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES ("Andrew", "Lawn"), ("Chris", "Smith"), ("Jeremy", "Dessaules"), ("Sparky", "Lawn");

