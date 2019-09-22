const mysql = require('mysql');
const config = require('../config.js');


conn = mysql.createConnection({
	host: config.host,
	user: config.usernamme,
	password: config.password,
	database: config.database,
	dateStrings:true
});

conn.connect((err) => {
	if (err) throw err;
//	console.log("Connected!");
});


