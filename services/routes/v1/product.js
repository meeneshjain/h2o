var express = require('express');
const api_model = require('../../models/v1/api_model');
const common_functions = require('../../common/functions.js');
const otp_functions = require('../../otp_services/otp_functions');
var router = express.Router();

 router.get('/list',function(req,res){
 	if(req.headers.device_id !="" && req.headers.device_type !=""){
 		 api_model.select_products(function(err, response) {
            if(err) {}
            else {
                res.status(200).json(response);
                res.end();
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