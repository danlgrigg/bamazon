var mysql = require("mysql");
var inquirer = require("inquirer");
var delay = require("delay");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazonItems_db"
});
//Establish connection to scl
connection.connect();
//Function to delay the promise and display the action 
function delay(){
  (async () => {
    bar();
    await delay(2000);
    // Executed 100 milliseconds later
    baz();
})();
}
//Landing function to display table of items
function displayBamazonItems() {
  connection.query("SELECT * FROM bamazonItems", function(err, res) {
    if (err) throw err;
    console.table(res);
    //Prompt user to input item selection and quantity to purchase
    inquirer
      .prompt([
        {
          name: "item_input",
          type: "num",
          message: "What is the item id of the product you would like to buy?"
        },
        {
          name: "quantity_input",
          type: "num",
          message: "How many would you like to buy?"
        }
      ])
      //Query the response and 
      .then(function(answer) {
        // console.log(answer);
        var itemId = answer.item_input;
        var quantity = answer.quantity_input;
        connection.query(
          "SELECT * FROM bamazonItems WHERE item_id = ?",
          [itemId],
          function(err, item) {
            if (err) {
              console.log(err);
            }
            var dbQuantity = item[0].stock_quantity;
            var itemName = item[0].item_name;
            var itemPrice = item[0].item_price;
            if (quantity > dbQuantity) {
              console.log("Insufficent Stock");
              displayBamazonItems();
              delay();
            } else {
              var difference = dbQuantity - quantity;
              var purchasePrice = quantity * itemPrice;
              updateDataBase(difference, itemId);
              console.log("You purchased "+ quantity + " units of " + itemName + " for $" + purchasePrice);
              delay();
            }
          }
        );
      });
  });
}

function updateDataBase(qty, id) {
  connection.query(
    "UPDATE bamazonItems SET stock_quantity = ? WHERE item_id = ?",
    [qty, id],
    function(err, item) {
      if (err) {
        console.log(err);
      } else {
        connection.query(
          "SELECT * FROM bamazonItems WHERE item_id = ?",
          [id],
          function(err, item) {
            if (err) {
              console.log(err);
            } else {
              console.table(item);
              displayBamazonItems();
            }
          }
        );
      }
    }
  );
}
displayBamazonItems();
