CREATE DATABASE IF NOT EXISTS aeptest;

USE aeptest;

CREATE TABLE IF NOT EXISTS customers(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NULL,
    city VARCHAR(255) NULL,
    country VARCHAR(255) NULL,
    image VARCHAR(255) NULL
);

CREATE INDEX email ON customers (email);