/*const mysql = require('mysql');*/
var md5 = require('md5');
const connection = require('../../common/connect.js');

module.exports ={
	encrypt_string: (string) => {
		return md5(string)
	},
   select_products : function(cb){
        conn.query('SELECT * FROM products',function(err,results,fields){
            if(err){
                console.log(err)
                cb(err);
            }
            if(results){
                console.log(results);
                cb(null, results);
            }
            console.log('nothing...');
        });
    }
}