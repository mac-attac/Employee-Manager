const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Andherecometheirish1!",
  database: "employee_managerDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(
    `You have successfully connected to the internal employee management system, connection id: ${connection.threadId}`
  );
  console.log(
    `------------------------------------------------------------------`
  );
  welcome();
});

function welcome() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "home",
        message:
          "Welcome to the Employee Management System. What would you like to do?",
        choices: [
          "Add departments, roles, or employees",
          "View departments, roles, employees",
          "Update employee roles",
          "Exit",
        ],
      },
    ])
    .then((input) => {
      switch (input.home) {
        case "Add departments, roles, or employees":
          addHome();
          break;
        case "View departments, roles, employees":
          viewHome();
          break;
        case "Update employee roles":
          updateEmployeeRoles();
          break;
        case "Exit":
          process.exit(-1);
          break;
      }
    });
}

function addHome() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "addHome",
        message: "What would you like to add to?",
        choices: ["Add department", "Add role", "Add employee", "Exit"],
      },
    ])
    .then((input) => {
      switch (input.addHome) {
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Exit":
          welcome();
          break;
      }
    });
}

function addDepartment() {
  //new department name
  inquirer
    .prompt({
      name: "departmentAdd",
      type: "input",
      message: "Please enter the new department.",
    })
    //then insert that name to the sql
    .then(function (input) {
      console.log(input.departmentAdd);
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: input.departmentAdd,
        },
        function (err, res) {
          if (err) throw err;

          //after they have added new information start over or stop
          inquirer
            .prompt({
              name: "addAnotherDept",
              type: "confirm",
              message: "Would you like to add another department?",
            })
            .then(function (input) {
              if (input.addAnotherDept === true) {
                addDepartment();
              } else {
                welcome();
              }
            });
        }
      );
    });
}

//function that adds NEW role information
function addRole() {
  //collect information for new role
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the name of the new role.",
        name: "title",
      },
      {
        type: "input",
        message: "Please enter the salary for the new role.",
        name: "salary",
      },
      {
        type: "input",
        message: "Please enter the department ID for the new role.",
        name: "dept_id",
      },
    ])
    .then(function (input) {
      //insert new role into database
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: input.title,
          salary: input.salary,
          department_id: input.dept_id,
        },
        function (err, res) {
          if (err) throw err;

          //after they have added new information start over or stop
          inquirer
            .prompt({
              name: "addAnotherRole",
              type: "confirm",
              message: "Would you like to add another role?",
            })
            .then(function (input) {
              if (input.addAnotherRole === true) {
                addRole();
              } else {
                welcome();
              }
            });
        }
      );
    });
}

//function that adds NEW employee information
function addEmployee() {
  //prompts for new employee information
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter new employee's first name",
        name: "first_name",
      },
      {
        type: "input",
        message: "Please enter new employee's last name",
        name: "last_name",
      },
      {
        type: "input",
        message: "Please enter a role ID.",
        name: "role_id",
      },
      {
        type: "input",
        message:
          "Please enter new employee's manager's id (or hit enter if not known).",
        name: "manager_id",
      },
    ])

    //add information for new employee into database
    .then(function (input) {
      if (input.manager_id === "") {
        input.manager_id = null;
      }
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: input.first_name,
          last_name: input.last_name,
          role_id: input.role_id,
          manager_id: input.manager_id,
        },
        function (err, res) {
          if (err) throw err;

          //after they have added new information start over or stop
          inquirer
            .prompt({
              name: "addAnotherEmp",
              type: "confirm",
              message: "Would you like to add another employee?",
            })
            .then(function (input) {
              if (input.addAnotherEmp === true) {
                addEmployee();
              } else {
                welcome();
              }
            });
        }
      );
    });
}

function viewHome() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "viewHome",
        message: "What would you like to view?",
        choices: ["View departments", "View roles", "View employees", "Exit"],
      },
    ])
    .then((input) => {
      switch (input.viewHome) {
        case "View departments":
          viewDepartments();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Exit":
          welcome();
          break;
      }
    });
}

function viewDepartments() {
  connection.query("SELECT id, name FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    inquirer
      .prompt({
        name: "viewAgain",
        type: "confirm",
        message: "Would you like to view something else?",
      })
      .then(function (input) {
        if (input.viewAgain === true) {
          viewHome();
        } else {
          welcome();
        }
      });
  });
}

function viewEmployees() {
  connection.query(
    "SELECT id, first_name, last_name, role_id,manager_id FROM employee",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      inquirer
        .prompt({
          name: "viewAgain",
          type: "confirm",
          message: "Would you like to view something else?",
        })
        .then(function (input) {
          if (input.viewAgain === true) {
            viewHome();
          } else {
            welcome();
          }
        });
    }
  );
}

function viewRoles() {
  connection.query(
    "SELECT id, title, salary, department_id FROM role",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      inquirer
        .prompt({
          name: "viewAgain",
          type: "confirm",
          message: "Would you like to view something else?",
        })
        .then(function (input) {
          if (input.viewAgain === true) {
            viewHome();
          } else {
            welcome();
          }
        });
    }
  );
}

function updateEmployeeRoles() {
  //adding prompts for updating role
  inquirer
    .prompt([
      {
        name: "roleToUpdate",
        type: "input",
        message: "Which role did you want to update?",
      },
      {
        //which information is being updated
        name: "roleInfo",
        type: "rawlist",
        message: "What do you need to update?",
        choices: ["Title", "Salary", "Department ID"],
      },
      {
        name: "roleNewInput",
        type: "input",
        message: "Please update info here:",
      },
    ])
    .then(function (input) {
      //updating role in database
      console.log(input.roleInfo);
      var query = "UPDATE role SET ? WHERE ?";
      switch (input.roleInfo) {
        case "Title":
          //updating title
          connection.query(
            "UPDATE role SET ? WHERE ?",
            [
              {
                title: input.roleNewInput,
              },
              {
                title: input.roleToUpdate,
              },
            ],
            function (err, res) {
              if (err) throw err;
            }
          );
          break;

        case "Salary":
          //updating salary information
          connection.query(
            "UPDATE role SET ? WHERE ?",
            [
              {
                salary: input.roleNewInfo,
              },
              {
                title: input.roleToUpdate,
              },
            ],
            function (err, res) {
              if (err) throw err;
            }
          );
          break;

        case "Department ID":
          //updating department info
          connection.query(
            "UPDATE role SET ? WHERE ?",
            [
              {
                department_id: input.roleNewInfo,
              },
              {
                title: input.roleToUpdate,
              },
            ],
            function (err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " role updated!");
            }
          );
          break;
      }

      //after they have added new information start over or stop
      inquirer
        .prompt({
          name: "updateAnotherRole",
          type: "confirm",
          message: "Would you like to update another employee role?",
        })
        .then(function (input) {
          if (input.updateAnotherRole === true) {
            updateEmployeeRoles();
          } else {
            welcome();
          }
        });
    });
}
