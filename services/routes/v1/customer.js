var express = require('express');
const api_model = require('../../models/v1/api_model');
const common_functions = require('../../common/functions.js');
const otp_functions = require('../../otp_services/otp_functions');
var router = express.Router();


/* GET users listing. */
router.get('/check_user',function(req,res){
	api_model.check_user(req.body.mobile_number,function(err, response){
		if(err){ } else{
			if(response.length == 0){
				response = {
					"error_code" : "H100",
					"message" : "not_found",
				};
				res.status(422).json(response);	
			} else {
				response = {
					"message" : "success",
					"token"  : "",
				};
				res.status(200).json(response);	
			}
			res.end();
		}
	});
});

router.get('/send_otp',function(req,res){
	if(req.headers.device_id !="" && req.headers.device_type !=""){
		if(req.body.mobile_number!= "" && req.body.mobile_number!= undefined){
			var mobile_number = req.body.mobile_number;
			var otp = common_functions.generate_otp(6);
			otp_functions.send_otp("send_new_otp", mobile_number, otp, function(response_arr){
				if(response_arr.type == "success"){
					res.status(200).json(response_arr);	
				} else {
					res.status(422).json(response_arr);	
				}
				res.end();
			});
		} else {
			response = {
				"message" : "Mobile Number not found",
				"token"  : "",
			};
			res.status(422).json(response);
		}
	} else {
		if(req.headers.device_id == "" || req.headers.device_id == undefined){
			response = {
				"message" : "device ID not found",
				"token"  : "",
			};
			res.status(422).json(response);
		}
		
		if(req.headers.device_type == "" || req.headers.device_type == undefined){
			response = {
				"message" : "Device Type not found",
				"token"  : "",
			};
			res.status(422).json(response);
		}
	}
});

router.get('/verify_otp',function(req,res){
	if(req.headers.device_id !="" && req.headers.device_type !=""){
		if(req.body.mobile_number!= "" && req.body.mobile_number!= undefined){
			var mobile_number = req.body.mobile_number;
			var otp = req.body.otp;
			otp_functions.send_otp("verify_otp", mobile_number, otp, function(response_arr){
				if(response_arr.type == "success"){
					res.status(200).json(response_arr.toString());	
				} else {
					res.status(422).json(response_arr.toString());	
				}
				res.end();
			});
		} else {
			response = {
				"message" : "Mobile Number not found",
				"token"  : "",
			};
			res.status(422).json(response);
		} 
	} else {
		if(req.headers.device_id == "" || req.headers.device_id == undefined){
			response = {
				"message" : "device ID not found",
				"token"  : "",
			};
			res.status(422).json(response);
		}
		
		if(req.headers.device_type == "" || req.headers.device_type == undefined){
			response = {
				"message" : "Device Type not found",
				"token"  : "",
			};
			res.status(422).json(response);
		}
	}
});

router.get('/login',function(req,res){
	
});

router.get('/registration',function(req,res){
	var response = {};
	if(req.headers.device_id !="" && req.headers.device_type !=""){
		if(req.body.mobile_number!= "" && req.body.mobile_number!= undefined){
			
			api_model.register_user(req.body.mobile_number, req.headers.device_id, req.headers.device_type, function(err, result){
				if(err){ } else{
					response = result;	
					if(response.message != "success"){
						res.status(422).json(response);
						
					} else {
						res.status(200).json(response);
					}
				}
			});	
		} else {
			response = {
				"message" : "Mobile Number not found",
				"token"  : "",
			};
			res.status(422).json(response);
		}
		
	} else {
		if(req.headers.device_id == "" || req.headers.device_id == undefined){
			response = {
				"message" : "device ID not found",
				"token"  : "",
			};
			res.status(422).json(response);
		}
		
		if(req.headers.device_type == "" || req.headers.device_type == undefined){
			response = {
				"message" : "Device Type not found",
				"token"  : "",
			};
			res.status(422).json(response);
		}
	}
});

router.get('/update_profile',function(req,res){
	var response = {};
	if(req.headers.device_id !="" && req.headers.device_type !="" && req.headers.user_token !=""){
		var user_token = req.headers.user_token;
		api_model.update_profile(user_token, req.body, function(err, result){
				if(err){ } else{
					response = result;	
					if(response.message != "success"){
						res.status(422).json(response);
						
					} else {
						res.status(200).json(response);
					}
				}
			});	
		
	} else {
		if(req.headers.device_id == "" || req.headers.device_id == undefined){
			response = {
				"message" : "device ID not found",
				"token"  : "",
			};
			res.status(422).json(response);
		}
		
		if(req.headers.device_type == "" || req.headers.device_type == undefined){
			response = {
				"message" : "Device Type not found",
				"token"  : "",
			};
			res.status(422).json(response);
		}
	}
});


module.exports = router;
