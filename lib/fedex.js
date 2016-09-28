var https = require('https');
var xml2js = require('xml2js');

function fedex(key, password, accountNumber, meterNumber) {
    this.authReq = buildAuth(key, password, accountNumber, meterNumber);
}
fedex.prototype.getRates = function (callback){
    var strVar = "";
    strVar += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    strVar += "		<RateRequest  xmlns='http://fedex.com/ws/rate/v10'>";
    strVar += "			<WebAuthenticationDetail>";
    strVar += "				<CspCredential>";
    strVar += "					<Key>6Hd1Hl9L0fvdCRaX<\/Key>";
    strVar += "					<Password>5cLE8qTTDqLhHN2l69gTZL8ao<\/Password>";
    strVar += "				<\/CspCredential>";
    strVar += "				<UserCredential>";
    strVar += "					<Key>vYgknLtmW1far53a<\/Key>";
    strVar += "					<Password>Wp7iGRyXIC74QhwZscNCMeC0o<\/Password>";
    strVar += "				<\/UserCredential>";
    strVar += "			<\/WebAuthenticationDetail>";
    strVar += "			<ClientDetail>";
    strVar += "				<AccountNumber>212081140<\/AccountNumber>";
    strVar += "				<MeterNumber>104939033<\/MeterNumber>";
    strVar += "				<ClientProductId>1234<\/ClientProductId>";
    strVar += "				<ClientProductVersion>4321<\/ClientProductVersion>";
    strVar += "			<\/ClientDetail>";
    strVar += "			<TransactionDetail>";
    strVar += "				<CustomerTransactionId>00000000000000000000000000000013<\/CustomerTransactionId>";
    strVar += "			<\/TransactionDetail>";
    strVar += "			<Version>";
    strVar += "				<ServiceId>crs<\/ServiceId>";
    strVar += "				<Major>10<\/Major>";
    strVar += "				<Intermediate>0<\/Intermediate>";
    strVar += "				<Minor>0<\/Minor>";
    strVar += "			<\/Version>";
    strVar += "			<ReturnTransitAndCommit>true<\/ReturnTransitAndCommit>";
    strVar += "			<RequestedShipment>";
    strVar += "				<ShipTimestamp>2016-09-09T18:28:00-06:00<\/ShipTimestamp>";
    strVar += "				<DropoffType>DROP_BOX<\/DropoffType>";
    strVar += "				<PackagingType>FEDEX_ENVELOPE<\/PackagingType>";
    strVar += "				<Shipper>";
    strVar += "					<Contact>";
    strVar += "						<PersonName>Raul Quintana<\/PersonName>";
    strVar += "						<CompanyName>17304 Preston Rd<\/CompanyName>";
    strVar += "						<PhoneNumber>9725181775<\/PhoneNumber>";
    strVar += "					<\/Contact>";
    strVar += "					<Address>";
    strVar += "						<StreetLines>Suite 205<\/StreetLines>";
    strVar += "						<StreetLines>Dalfen Building<\/StreetLines>";
    strVar += "						<City>Dallas<\/City>";
    strVar += "						<StateOrProvinceCode>TX<\/StateOrProvinceCode>";
    strVar += "						<PostalCode>75252<\/PostalCode>";
    strVar += "						<CountryCode>US<\/CountryCode>";
    strVar += "					<\/Address>";
    strVar += "				<\/Shipper>";
    strVar += "				<Recipient>";
    strVar += "					<Contact>";
    strVar += "						<PersonName>Nirmalya Pal<\/PersonName>";
    strVar += "						<CompanyName>7780 Mccallum Blvd<\/CompanyName>";
    strVar += "						<PhoneNumber>2148741082<\/PhoneNumber>";
    strVar += "					<\/Contact>";
    strVar += "					<Address>";
    strVar += "						<StreetLines>7780 Mccallum Blvd<\/StreetLines>";
    strVar += "						<City>Dallas<\/City>";
    strVar += "						<StateOrProvinceCode>TX<\/StateOrProvinceCode>";
    strVar += "						<PostalCode>75252<\/PostalCode>";
    strVar += "						<CountryCode>US<\/CountryCode>";
    strVar += "					<\/Address>";
    strVar += "				<\/Recipient>";
    strVar += "				<ShippingChargesPayment>";
    strVar += "					<PaymentType>SENDER<\/PaymentType>";
    strVar += "					<Payor>";
    strVar += "						<AccountNumber>212081140<\/AccountNumber>";
    strVar += "					<\/Payor>";
    strVar += "				<\/ShippingChargesPayment>";
    strVar += "				<RateRequestTypes>ACCOUNT<\/RateRequestTypes>";
    strVar += "				<PackageCount>1<\/PackageCount>";
    strVar += "				<RequestedPackageLineItems>";
    strVar += "					<GroupPackageCount>1<\/GroupPackageCount>";
    strVar += "					<InsuredValue>";
    strVar += "						<Currency>USD<\/Currency>";
    strVar += "						<Amount>0<\/Amount>";
    strVar += "					<\/InsuredValue>";
    strVar += "					<Weight>";
    strVar += "						<Units>LB<\/Units>";
    strVar += "						<Value>0.5<\/Value>";
    strVar += "					<\/Weight>";
    strVar += "				<\/RequestedPackageLineItems>";
    strVar += "			<\/RequestedShipment>";
    strVar += "		<\/RateRequest>";
    
    
    
    
    var body = strVar;
    var req = https.request({
        //host: 'wsbeta.fedex.com',
        host: 'ws.fedex.com',
        path: '/xml',
        method: 'POST'
    });
    req.write(body);
    var buffer = "";
    
    
    req.on('response', function (res) {
        var str = '';
        res.on('data', function (data) {
            str += data;
        });
        res.on("end", function () {
            var parser = new xml2js.Parser();
            parser.parseString(str, function (err, result) {
                if (!err) {
                    if (result) {
                        console.log(result);
                    callback(result.RateReply);
                    }
                } else {
                    console.log("Err first: " + err);
                callback(err);
                }
            });
        });
    });
    req.end();

}
fedex.prototype.getShippingInfo = function (trackingNumber, callback) {
    //TODO change to live
    //ws.fedex.com
    req = https.request({
        //host: 'wsbeta.fedex.com',
        host: 'ws.fedex.com',
        path: '/xml',
        method: 'POST'
    });
    var xml = buildCommon(this.authReq + buildTrack(trackingNumber));
 
    
    req.write(xml);
    
    req.on('response', function (res) {
        var str = '';
        res.on('data', function (data) {
            str += data;
        });
        res.on("end", function () {
            var parser = new xml2js.Parser();
            parser.parseString(str, function (err, result) {
                if (!err) {
                    if (result.TrackReply) {
                        callback(result.TrackReply);
                    }
                } else {
                    console.log("Err first: " + err);
                    callback(err);
                }
            });
        });
    });
    req.end();
}

function buildAuth(key, password, accountNumber, meterNumber) {
    return "<WebAuthenticationDetail>" +
				"<UserCredential>" +
					"<Key>" + key + "</Key>" +
					"<Password>" + password + "</Password>" +
				"</UserCredential>" +
			"</WebAuthenticationDetail>" +
			"<ClientDetail>" +
				"<AccountNumber>" + accountNumber + "</AccountNumber>" +
				"<MeterNumber>" + meterNumber + "</MeterNumber>" +
			"</ClientDetail>";
}

function buildTrack(trackingNumber) {
    return "<TransactionDetail>" +
				"<CustomerTransactionId>ActiveShipping</CustomerTransactionId>" +
			"</TransactionDetail>" + 
        	"<Version>" +
        		"<ServiceId>trck</ServiceId>" +
        		"<Major>6</Major>" +
        		"<Intermediate>0</Intermediate>" +
        		"<Minor>0</Minor>" +
        	"</Version>" +
        	"<PackageIdentifier>" +
        		"<Value>" + trackingNumber + "</Value>" +
        		"<Type>TRACKING_NUMBER_OR_DOORTAG</Type>" +
        	"</PackageIdentifier>" +
        	"<IncludeDetailedScans>true</IncludeDetailedScans>";
}

function buildCommon(xmlInsert) {
    return "<TrackRequest xmlns='http://fedex.com/ws/track/v6'>" + xmlInsert + "</TrackRequest>";
}

module.exports = fedex;