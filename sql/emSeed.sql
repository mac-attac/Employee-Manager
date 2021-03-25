DROP DATABASE IF EXISTS employee_managerDB;

CREATE DATABASE employee_managerDB;

USE employee_managerDB;

CREATE TABLE department(
  id INT AUTO_INCREMENT 
  name VARCHAR(30) NULL
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT
  title VARCHAR(30) NULL
  salary DECIMAL NULL
  department_id INT NULL
  PRIMARY KEY (id) NULL
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
  id INT 
  first_name VARCHAR(30) NULL
  last_name VARCHAR(30) NULL
  role_id INT NULL
  manager_id INT NULL
  PRIMARY KEY(id)
  FOREIGN KEY (role_id) REFERENCES role(id)
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);


INSERT INTO department (name)
VALUES ('Accounting')

INSERT INTO department (name)
VALUES ('HR')

INSERT INTO department (name)
VALUES ('Software Engineering')



INSERT INTO roles (title, salary, department_id)
VALUES ('Head Accountant', 120000, 1)

INSERT INTO roles (title, salary, department_id)
VALUES ('Junior Accountant', 60000, 1)

INSERT INTO roles (title, salary, department_id)
VALUES ('Head of HR', 120000, 2)

INSERT INTO roles (title, salary, department_id)
VALUES ('HR Rep', 750000, 2)

INSERT INTO roles (title, salary, department_id)
VALUES ('Senior Software Engineer', 120000, 3)

INSERT INTO roles (title, salary, department_id)
VALUES ('Junior Software Engineer', 80000, 3)



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tom', 'Brennan', 1)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Alex', 'Biederstedt', 2, 1)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Wendy', 'Blumenthal', 1)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jaquan', 'Jackson', 2, 1)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Lois', 'Lane', 1)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Breonna', 'King', 1, 2)