DROP DATABASE IF EXISTS store;

CREATE DATABASE IF NOT EXISTS store;
USE store;

CREATE TABLE IF NOT EXISTS `items`
(
    `id`   INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `name` VARCHAR(20)  NOT NULL,
    `price` float NOT NULL
);


CREATE TABLE IF NOT EXISTS `checkouts`
(
    `id`       INT unsigned NOT NULL PRIMARY KEY,
    `quantity`  INT NOT NULL,
    `ammount`   float NOT NULL,
    `itemid`   INT unsigned NOT NULL,
    FOREIGN KEY (itemid) REFERENCES items (id)
);


INSERT INTO items
VALUES (1, "Cereals", 3.40),
       (2, "Beef", 6.80),
       (3, "Chicken", 6.80),
       (4, "Pasta", 2.10),
       (5, "Biscuits", 1.80),
       (6, "Applles", 2.00),
       (7, "Bread", 2.30),
       (8, "Sweets", 1.20),
       (9, "Sugar", 0.80),
       (10, "milk", 1.30);

INSERT INTO checkouts
VALUES (1, 1, 3.40, 1),
       (2, 1, 6.80, 3),
       (3, 1, 2.30, 7),
       (4, 2, 1.60, 9);

