
var fedex = require('./fedex.js');



function rateFedex(username, password, accountNumber, meterNumber,req,callback) {
    var ratefedex = new fedex(username, password, accountNumber, meterNumber);
    ratefedex.getRates(req,callback);
}
exports.rateFedex = rateFedex;
