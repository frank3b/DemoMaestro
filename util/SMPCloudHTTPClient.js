/*
 * Globally change the behavior of data js to include APPCID
 */

// Save the old http client
var oldClient = OData.defaultHttpClient;
var APPCID = "";

// Create a new client object that will add the APPCID header
var SMPCloudHttpClient = {
    request: function (request, success, error) {
    	
    	// Add the X-SUP-APPCID header to each request
        request.headers['X-SUP-APPCID'] = APPCID;
        
        // Call back into the original http client.
        return oldClient.request(request, success, error);
    }
};