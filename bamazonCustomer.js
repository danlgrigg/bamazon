var mysql = require("mysql");
var inquirer = require("inquirer");

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
connection.connect();
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);

// });
function displayBamazonItems() {
  connection.query("SELECT * FROM bamazonItems", function(err, res) {
    if (err) throw err;
    console.table(res);
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
      .then(function(answer) {
        console.log(answer);
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
            if (quantity > dbQuantity) {
              console.log("Insufficent Stock");
            } else {
              var difference = dbQuantity - quantity;
              updateDataBase(difference,itemId);
              // connection.query(
              //   "UPDATE bamazonItems SET stock_quantity = ? WHERE item_id = ?",
              //   [difference, itemId],
              //   function(err, item) {
              //     if (err) {
              //       console.log(err);
              //     } else {
              //      connection.query;
              //     }
              //   }
              // );
            }
          }
        );
      });
  });
}

function updateDataBase(qty,id){
  connection.query(
    "UPDATE bamazonItems SET stock_quantity = ? WHERE item_id = ?",
    [qty, id],
    function(err, item) {
      if (err) {
        console.log(err);
      } else {
       connection.query("SELECT * FROM bamazonItems WHERE item_id = ?", [id], function(err,item){
         if (err){
           console.log(err);
         }else{
           console.table(item);
         }
       });
      }
    }
  );
}

displayBamazonItems();

// function mainMenu() {
//   function userPurchase() {
//     displayBamazonItems();
//     inquirer
//       .prompt([
//         {
//           name: "item_input",
//           type: "num",
//           message: "What is the item id of the product you would like to buy?"
//         },
//         {
//           name: "quantity_input",
//           type: "num",
//           message: "How many would you like to buy?"
//         }
//       ])
//       .then(function(answer) {
//         if (answer.item_input.quantity_input <= "stock_quantity") {
//           ("UPDATE bamazonItems SET stock_quantity = stock_quantity - quantity_input WHERE item_input = item_id");
//           console.log(
//             "You purchased " +
//               answer.quantity_input +
//               "of " +
//               answer.item_input.item_name
//           );
//         } else {
//           console.log("Insufficient quantity!");
//         }
//       });
//     connection.end();
//   }
// }
