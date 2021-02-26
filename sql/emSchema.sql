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
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);

