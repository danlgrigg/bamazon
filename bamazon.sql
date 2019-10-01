DROP DATABASE IF EXISTS bamazonItems_db;
CREATE DATABASE bamazonItems_db;

USE bamazonItems_db;

CREATE TABLE bamazonItems(
  item_id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(45) NULL,
  item_department VARCHAR(45) NULL,
  item_price DECIMAL(4),
  stock_quantity INT,
  PRIMARY KEY (item_id)
  
);

INSERT INTO bamazonItems (item_name, item_department, item_price, stock_quantity)
VALUES ("Mario Kart, SNES", "Video Games", 30, 20);
INSERT INTO bamazonItems (item_name, item_department, item_price, stock_quantity)
VALUES ("Mario Kart Poster ", "Art", 30, 50);
INSERT INTO bamazonItems (item_name, item_department, item_price, stock_quantity)
VALUES ("Mario Kart 8, Switch", "Video Games", 30, 50);
INSERT INTO bamazonItems (item_name, item_department, item_price, stock_quantity)
VALUES ("Secret of Mana, SNES", "Video Games", 25, 40);
INSERT INTO bamazonItems (item_name, item_department, item_price, stock_quantity)
VALUES ("Secret of Mana Poster", "Art", 30, 50);
INSERT INTO bamazonItems (item_name, item_department, item_price, stock_quantity)
VALUES ("Ken Griffey Jr.'s Baseball, SNES", "Video Games", 10, 15);
INSERT INTO bamazonItems (item_name, item_department, item_price, stock_quantity)
VALUES ("Legend of Zelda: A Link to the Past", "Video Games", 30, 50);
INSERT INTO bamazonItems (item_name, item_department, item_price, stock_quantity)
VALUES ("Legend of Zelda, Link's Shield", "Costumes", 45, 5);
INSERT INTO bamazonItems (item_name, item_department, item_price, stock_quantity)
VALUES ("Legend of Zelda, Link's Magic Sword", "Costumes", 30, 5);
INSERT INTO bamazonItems (item_name, item_department, item_price, stock_quantity)
VALUES ("Legend of Zelda, Zelda Poster","Art" , 5, 25);
