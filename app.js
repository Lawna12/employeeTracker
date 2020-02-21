const password = require("./password");
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

require('events').EventEmitter.defaultMaxListeners = 15;

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
        .prompt({
            name: "CRUD",
            type: "list",
            message: "What would you like to do?",
            choices: ["View", "Create", "Update", "Delete", "Exit"]
        })
        .then(function(answer) {
            switch (answer.action) {
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
    inquirer
        .prompt({
            name: "viewChoices",
            type: "list",
            message: "What would you like to view?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "exit"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
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
      connection.end();
    });
  }

function viewRoles() {
    console.log("Viewing all Roles...\n");
    connection.query("SELECT * FROM Roles", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
}


function viewEmployees() {
    console.log("Viewing all Employees...\n");
    connection.query("SELECT * FROM Employees", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
}

function createChoices() {
    inquirer
        .prompt({
            name: "createChoices",
            type: "list",
            message: "What would you like to create?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "exit"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
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

function updateChoices() {
    inquirer
        .prompt({
            name: "updateChoices",
            type: "list",
            message: "What would you like to update?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "exit"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
            case "Departments":
                updateDepartments();
                break;

            case "Roles":
                updateRoles();
                break;

            case "Employees":
                updateEmployees();
                break;

            case "Exit":
                connection.end();
                break;
            }
        });
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
            switch (answer.action) {
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



