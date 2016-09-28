
var fedex = require('./fedex.js');



function rateFedex(username, password, accountNumber, meterNumber, callback) {
    var ratefedex = new fedex(username, password, accountNumber, meterNumber);
    ratefedex.getRates(callback);
}
exports.rateFedex = rateFedex;
