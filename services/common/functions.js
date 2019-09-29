
module.exports ={
	generate_token : function(length){
		var result           = '';
		var special_char     = "-+.@#&*!~";
		var numbers          =  "0123456789";
		var string_char      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		var final_string     = special_char + '' + numbers + '' + string_char + '' + special_char + '' + string_char + '' + numbers + '' + special_char + '' + numbers + '' + string_char + '' + numbers + '' + special_char + '' + string_char ; 
		var final_string_length = final_string.length;
		for ( var i = 0; i < length; i++ ) {
			result += final_string.charAt(Math.floor(Math.random() * final_string_length));
		}
		return result;
	},
	
	generate_otp : function(length){
		var result           = '';
		var numbers          =  "0123456789";
		var final_string_length = numbers.length;
		for ( var i = 0; i < length; i++ ) {
			result += numbers.charAt(Math.floor(Math.random() * final_string_length));
		}
		return result;
	},
	
	get_formated_date : function(date){
		var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;

		return [year, month, day].join('-');
		
	} 
}
