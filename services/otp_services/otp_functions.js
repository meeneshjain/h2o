const config = require('../config.js');
var qs = require("querystring");
var http = require("https");

var sms_auth_key  = config.sms_auth_key;
var app_sms_label = config.app_sms_label;


module.exports ={
	send_otp : function(type, mobile_number, otp, callback) {
		var show_msg = otp + " is your H2O verification OTP for login. This code is valid for 5 minutes. Do not share this with anyone" ;
		var api_url_path = '';
		if(type == "send_new_otp"){
			api_url_path = encodeURI("/api/sendotp.php?authkey="+sms_auth_key+"&mobile="+ mobile_number + "&otp="+otp+"&message="+ show_msg +"&sender="+app_sms_label);
		} else if(type == "verify_otp"){
			api_url_path = encodeURI("/api/verifyRequestOTP.php?authkey="+sms_auth_key+"&mobile="+ mobile_number + "&otp="+otp);
		}
		
		var options = {
			"method": "POST",
			"hostname": "control.msg91.com",
			"port": null,
			"path": api_url_path,
			"headers": {
				"content-type": "application/x-www-form-urlencoded"
			}
		};
		
		var req = http.request(options, function (response) {
			var chunks = [];

			response.on("data", function (chunk) {
				chunks.push(chunk);
			});

			response.on("end", function () {
				var body = Buffer.concat(chunks);
				responnse = body.toString();
				var response_arr = JSON.parse(responnse);
				callback(response_arr);
				
			});
		});
		
		req.write(qs.stringify({}));
		req.end();
		
	}
	
}