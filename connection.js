
var mysql = require("mysql");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Baloch28",
    database: "bamazon_db"
});

connection.connect(function(error) {
    if (error) throw error;
});


module.exports = connection;