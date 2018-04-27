var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project'
});

con.connect( function(err){
    if(!err){
        console.log("Database connected");
    }else {
        console.log("Error while connecting with database \n");
    }
});

module.exports = con;