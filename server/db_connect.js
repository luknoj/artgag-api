var mysql = require('mysql');

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: 60000
});

con.connect( function(err){
    if(!err){
        console.log("Database connected");
    }else {
        console.log("Error while connecting with database \n");
        console.log(err);
        
    }
});

module.exports = con;