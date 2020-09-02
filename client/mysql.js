var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'success',
  port     : '3306',
  database : 'hanja'
});

connection.connect();

connection.query('SELECT * FROM CUSTOMER', 
function(err, results, fields) {
  if (err) {
    console.log(err);
  }
  console.log(results);
});

connection.end();