var md5 = require('md5');
const connection = require('../../common/connect.js');
const common_functions = require('../../common/functions.js');

module.exports ={
	encrypt_string: (string) => {
		return md5(string)
	},
	
	select_products : function(cb){
		conn.query("SELECT id,name,price,mrp,image FROM products WHERE status = 'active'",function(err,results,fields){
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
	},
	
	check_user : function(mobile_number, cb){
		var clause_values = [mobile_number];
		conn.query("SELECT * FROM customers where mobile = ?", clause_values, function(err,results,fields){
			if(err){
				cb(err);
			}
			if(results){
				cb(null, results);
			}
		});
	},
	
	register_user : function(mobile_number, device_id, device_type, cb){
		var customer_token = common_functions.generate_token(20);
		var created_date = common_functions.get_formated_date(new Date());
		var results = {};
		this.check_user(mobile_number, function(err, response){
			if(!err){
				if(response.length > 0){
					results = {
						"message" : "Mobile Exists",
						"token"  : "",
					};
					cb(null, results);
				} else {
					var customer_data = {
						mobile : mobile_number, 
						status : 1, 
						customer_type : 'user',
						created_date: created_date,  
						updated_date : created_date,
						
					}
					conn.query("INSERT INTO customers SET ?", customer_data ,function(err,results,fields){
						if(!err){
							var customer_id = results.insertId;
							var login_history_data = {
								customer_id : customer_id,
								customer_token : customer_token,
								device_type : device_type,
								device_id	: device_id,
								created_date	: created_date,
								updated_date	: created_date
							}	
							
							conn.query("INSERT INTO customer_login_history SET ?", login_history_data ,function(err,results,fields){
								if(!err){
									results = {
										"message" : "success",
										"token"  : customer_token,
									};
									cb(null, results);
								}
							});	
						}
						
					});
				}	
			}
		})
	},
	
	update_profile: function(user_token, post_body, cb){
		var results = {};
		this.get_user_id_from_token(user_token, function(err, response){
			if(err){
				results = {
					"message" : "Invalid Token",
				};
				cb(null, results);
			} else {
				var update_user_data = [
				post_body.first_name,
				post_body.last_name,
				post_body.email,
				post_body.alternate_mobile,
				post_body.dob,
				post_body.source,
				response[0].id	
				];
				
				conn.query("UPDATE customers SET first_name = ?, last_name= ?, email= ?, alternate_mobile = ?, dob = ?,source = ? where id = ?", update_user_data, function(err,response,fields){
					if(err){
						results = {
							"message" : "Unable to update",
						};
						cb(null, results);
					}
					if(response){
						results = {
							"message" : "success",
						};
						cb(null, results);
					}
				});
			}
		});
	},
	
	get_user_id_from_token : function(user_token, cb){
		var clause_values = [user_token];
		conn.query("SELECT * FROM customer_login_history where customer_token = ?", clause_values, function(err,results,fields){
			if(err){
				cb(err);
			}
			if(results){
				
				cb(null, results);
			}
		});
	}
}