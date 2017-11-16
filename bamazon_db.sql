DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    product_sales DECIMAL(10,2) DEFAULT 0,
    department_name VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL DEFAULT 0
);


insert into products(product_name, department_name, price, stock_quantity)
values ("Hevay Duty Batteries", "Truck parts", 125, 25);

insert into products(product_name, department_name, price, stock_quantity)
values ("Tires", "Truck parts", 59.99, 90);

insert into products(product_name, department_name, price, stock_quantity)
values ("Clutch kits", "Truck parts", 6.99, 13);

insert into products(product_name, department_name, price, stock_quantity)
values ("Radiators", "Truck parts", 32.99, 2);

insert into products(product_name, department_name, price, stock_quantity)
values ("EGR System Components", "Truck parts", 10.56, 8);

insert into products(product_name, department_name, price, stock_quantity)
values ("LED Flashlight", "Sporting and Outdoors", 18.00, 250);

insert into products(product_name, department_name, price, stock_quantity)
values ("Knee Brace Support", "Sporting and Outdoors", 17.49, 900);

insert into products(product_name, department_name, price, stock_quantity)
values ("Water Bottle", "Sporting and Outdoors", 7.99, 221);


CREATE TABLE departments (
    department_id INTEGER(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL DEFAULT 1000
);

INSERT INTO departments (department_name, over_head_costs) VALUES
("Truck parts", 3000),
("Sporting and Outdoors", 4500);