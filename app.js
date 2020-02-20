const password = require("./password");
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

require('events').EventEmitter.defaultMaxListeners = 15;

const connection = mysql.createConnection({
    host: "localhost",
    port: process.env.PORT || 8080,
    user: "root",
    password: password,
    database: "Employee_DB"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
})

console.log("working")