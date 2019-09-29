var express = require('express');
var api_model = require('../../models/v1/api_model');
var router = express.Router();

 router.get('/get_products',function(req,res){
        api_model.select_products(function(err, response) {
            if(err) {
                // handle error
            }
            else {
                /*var x = response;
                res.json(x);
                res.end();*/
                res.status(422).write(responnse);   
            }
        });

    });


module.exports = router;
