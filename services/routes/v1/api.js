var express = require('express');
var api_model = require('../../models/v1/api_model');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource for 1.0');
});
 
 router.get('/get_products',function(req,res){

        api_model.select_products(function(err, response) {
            if(err) {
                // handle error
            }
            else {
                var x = response;
                res.json(x);
                res.end();
            }
        });

    });


module.exports = router;
