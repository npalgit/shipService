var express = require('express');
var app = express();

var tracking = require('./lib/TrackApi.js');
var rating = require('./lib/RateApi.js');

//USPS: tracking.trackUSPS(username, trackingNumber, callback);

//UPS: tracking.trackUPS(usernane, password, accessKey, trackingNumber, callback);

//Fedex: tracking.trackFedex(username, password, accountNumber, meterNumber, trackingNumber, callback);


app.use('/static', express.static(__dirname + '/public'));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
 
app.get('/', function (req, res) 
{

				res.send("Tracking Api");

});
app.get('/ups/track/:tracking_number', function (req, res) 
{
				tracking.trackUPS
				( 				

			
				req.params.tracking_number, function (err, data)
				{
					if (err) {
						console.error(err);
						res.send(err);
					}

					if (data) {
						console.log(req.params.tracking_number);
						 res.send(data);
					} 

				});
  
});
app.get('/ups/track', function (req, res) 
{

	res.send("Please enter a tracking numebr");
});
app.get('/fedex/track/:tracking_number', function (req, res) 
{
				tracking.trackFedex
				( 

			
				req.params.tracking_number, function (err, data)
				{
					if (err) {
						console.error(err);
						res.send(err);
					}

					if (data) {
						console.log(req.params.tracking_number);
						 res.send(data);
					} 

				});
  
});
app.get('/fedex/track', function (req, res) 
{

	res.send("Please enter a tracking numebr");
});




app.get('/fedex/rates', function (req, res) {
    rating.rateFedex
				( 

                 function (err, data) {
            if (err) {
                console.error(err);
                res.send(err);
            }
            
            if (data) {
                console.log("rates are back");
                res.send(data);
            }

        });
  
});





app.get('/usps/track/:tracking_number', function (req, res) 
{
				tracking.trackUSPS
				( 
			
				req.params.tracking_number, function (err, data)
				{
					if (err) {
						console.error(err);
						res.send(err);
					}

					if (data) {
						console.log(req.params.tracking_number);
						 res.send(data);
					} 

				});
  
});
app.get('/usps/track', function (req, res) 
{

	res.send("Please enter a tracking numebr");
});
var port = process.env.PORT || 8080;
app.listen(port, function () {
 console.log('listening on port');
});
