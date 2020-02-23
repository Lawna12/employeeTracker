const password = require("./password");
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

require('events').EventEmitter.defaultMaxListeners = 200;

const connection = mysql.createConnection({
    host: "localhost",
    port: process.env.PORT || 3306,
    user: "root",
    password: password,
    database: "Employee_DB"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
})

function start() {
    inquirer
        .prompt([
            {
                name: "CRUD",
                type: "list",
                message: "What would you like to do?",
                choices: ["View", "Create", "Update", "Delete", "Exit"]
            }
        ])
        .then(function(answer) {
            switch (answer.CRUD) {
            case "View":
                viewChoices();
                break;

            case "Create":
                createChoices();
                break;

            case "Update":
                updateChoices();
                break;

            case "Delete":
                deleteChoices();
                break;

            case "Exit":
                connection.end();
                break;
            }
        });
}

function viewChoices() {
    console.log("you're here")
    inquirer
        .prompt([
        {
            name: "viewChoice",
            type: "list",
            message: "What would you like to view?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "exit"
            ]
        }
        ])
        .then(function(answer) {
            switch (answer.viewChoice) {
            case "Departments":
                viewDepartments();
                break;

            case "Roles":
                viewRoles();
                break;

            case "Employees":
                viewEmployees();
                break;

            case "Exit":
                connection.end();
                break;
            }
        });
}

function viewDepartments() {
    console.log("Viewing all Departments...\n");
    connection.query("SELECT * FROM Departments", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      start();
    });
  }

function viewRoles() {
    console.log("Viewing all Roles...\n");
    connection.query("SELECT * FROM Roles", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        start();
    });
}


function viewEmployees() {
    console.log("Viewing all Employees...\n");
    connection.query("SELECT * FROM Employees", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        start();
    });
}

function createChoices() {
    inquirer
        .prompt([
        {
            name: "createChoices",
            type: "list",
            message: "What would you like to create?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "exit"
            ]
        }
        ])
        .then(function(answer) {
            switch (answer.createChoices) {
            case "Departments":
                createDepartments();
                break;

            case "Roles":
                createRoles();
                break;

            case "Employees":
                createEmployees();
                break;

            case "Exit":
                connection.end();
                break;
            }
        });
}

function createDepartments() {
    inquirer
        .prompt([
        {
            name: "newDept",
            type: "input",
            message: "What is the name of the new Department?"
        },
        ])
        .then(function(answer) {
            connection.query(
                "INSERT INTO Departments SET ?",
                [
                    {
                        name: answer.newDept
                    },
                ],
                function(err) {
                    if (err) throw err;
                    console.log("Your Dept was created successfully!");
                    // re-prompt the user for if they want to bid or post
                    start();
                }
            )
        })
}


function createRoles() {
    inquirer
        .prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title of the new Role?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the new Role?"
        },
        {
            name: "department_id",
            type: "input",
            message: "What is the department id of the new Role?"
        }
        ])
        .then(function(answer) {
            connection.query(
                "INSERT INTO Roles SET ?",
                [
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: answer.department_id,
                    },
                ],
                function(err) {
                    if (err) throw err;
                    console.log("Your Role was created successfully!");
                    // re-prompt the user for if they want to bid or post
                    start();
                }
            )
        })
}


function createEmployees() {
    inquirer
        .prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the first name of the new Employee?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the last name of the new Employee?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the role id of the new Employee?"
        },
        {
            name: "manager_id",
            type: "input",
            message: "What is the manager id of the new Employee?"
        },
        ])
        .then(function(answer) {
            connection.query(
                "INSERT INTO Employees SET ?",
                [
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: answer.role_id,
                        manager_id: answer.manager_id
                    },
                ],
                function(err) {
                    if (err) throw err;
                    console.log("Your Employee was created successfully!");
                    // re-prompt the user for if they want to bid or post
                    start();
                }
            )
        })
}




function updateChoices() {
    connection.query("SELECT * FROM Employees", function(err, results) {
        if (err) throw err;
        
        inquirer
            .prompt([
            {
                name: "choice",
                type: "rawlist",
                choices: function() {
                    var empArray = [];
                    for (var i =0; i < results.length; i++) {
                        empArray.push(results[i].first_name)
                    }
                    return empArray;
                },
                // message: "Which Emp's role would you like to update?",
            },
            {
                name: "role_id",
                type: "input",
                message: "What is the new role id of the selected Employee?"
            }
        ])
        .then(function(answer) {
            var chosenName;
            for (var i = 0; i < results.length; i++) {
                if (results[i].first_name === answer.choice) {
                chosenName = results[i];
                }
            }
            connection.query(
                "UPDATE Employees SET ? WHERE ?",
                [
                    {
                        role_id: answer.role_id
                    },
                    {
                        first_name: chosenName
                    }
                ],
                function(err) {
                    if (err) throw err;
                    console.log("Your Employee was created successfully!");
                    // re-prompt the user for if they want to bid or post
                    start();
                }
            )
        });
    })
}

function deleteChoices() {
    inquirer
        .prompt({
            name: "deleteChoices",
            type: "list",
            message: "What would you like to delete?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "exit"
            ]
        })
        .then(function(answer) {
            switch (answer.deleteChoices) {
            case "Departments":
                deleteDepartments();
                break;

            case "Roles":
                deleteRoles();
                break;

            case "Employees":
                deleteEmployees();
                break;

            case "Exit":
                connection.end();
                break;
            }
        });
}

function deleteDepartments() {
    connection.query("SELECT * FROM Departments", function(err, results) {
        if (err) throw err;
        
        inquirer
            .prompt([
            {
                name: "delChoice",
                type: "rawlist",
                choices: function() {
                    var delDeptArray = [];
                    for (var i =0; i < results.length; i++) {
                        delDeptArray.push(results[i].name)
                    }
                    return delDeptArray;
                },
                // message: "Which Emp's role would you like to update?",
            }            
        ])
        .then(function(answer) {
            var chosenDept;
            for (var i = 0; i < results.length; i++) {
                if (results[i].name === answer.delChoice) {
                    chosenDept = results[i];
                }
            }
            connection.query(
                "DELETE FROM Departments WHERE ?",
                [
                    {
                        name: chosenDept
                    }
                ],
                function(err) {
                    if (err) throw err;
                    console.log("Your Dept was deleted successfully!");
                    // re-prompt the user for if they want to bid or post
                    start();
                }
            )
        })
    })
}



