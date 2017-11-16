var cliTable = require("cli-table");
var inquirer = require("inquirer");
var connection = require("./connection.js");

var product = 0;
var forTotal = [0];
var ques = [
        {
            type: "input",
            name: "id",
            message: "Please write the ID of the product you wish to Purchase? [Quit with Q]",
            validate: function (answers) {
                var num = parseInt(answers);
                if (Number.isInteger(num) && (num >= 0) && (num <= product)) return true;
                if (answers.match(/q/i)) return true;
                return "Please enter a valid ID number";
            }
        }, {
            type: "input",
            name: "quantity",
            message: "How many items you wish to buy? [Quit with Q]",
            validate: function (answers) {
                var num = parseInt(answers);
                if (Number.isInteger(num) && (num >= 0)) return true;
                if (answers.match(/q/i)) return true;
                return "Please enter a valid number";
            },
            when: function (answers) {
                if (answers.id.match(/q/i)) return false;
                return true;
            }
        }
    ];
            //table

function runProg(query) {
    var table = new cliTable({
        head: ["Product ID","Product Name","Price"],
        colWidths: [10, 30, 30],
    });
    connection.query(
            "SELECT item_id, " +
                "product_name, " +
                "price " +
            "FROM products",
            function(selectErr, selectRes) {
        if (selectErr) throw selectErr;
        product = selectRes.length;
        for (var i = 0; i < selectRes.length; i++) {
            forTotal.push(selectRes[i]);
            var row = [];
            for (var key in selectRes[i]) {
                if (key === "price") {
                    row.push("$" + selectRes[i][key].toFixed(2));
                }
                else row.push(selectRes[i][key]);
            }
            table.push(row);
        }
        console.log(table.toString());
        inquirer.prompt(ques).then(function(answers) {
            if ((answers.id.match(/q/i)) || (answers.quantity.match(/q/i))) {
                connection.end();
                return;
            }
            var quantity = parseInt(answers.quantity);
            var id = parseInt(answers.id);
            var totalPrice = parseFloat((parseFloat(forTotal[id].price) * quantity).toFixed(2));
            connection.query(
                    "UPDATE products " +
                    "SET product_sales = (product_sales + ?), " +
                        "stock_quantity = (stock_quantity - ?) " +
                    "WHERE item_id = ? AND stock_quantity >= ?",
                    [ totalPrice, quantity, id, quantity ],
                    function(updateErr, updateRes) {
                if (updateErr) throw updateErr;
                if (!updateRes.affectedRows) console.log("Insufficient Quantity!");
                else console.log("Order complete! Your total is: $" + totalPrice);
                runProg();
            });
        });
    });
}


runProg();