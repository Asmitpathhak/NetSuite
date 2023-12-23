/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */

define(['N/https'], function (https) {

    function pageInit(context) {
        // Your client script logic here
    }

    function sendToSuitelet(data) {
      //  var suiteletURL = '/app/site/hosting/scriptlet.nl?script=YOUR_SUITELET_SCRIPT_ID&deploy=YOUR_SUITELET_DEPLOYMENT_ID';
        var  suiteletURL        ='/app/site/hosting/scriptlet.nl?script=8830&deploy=1';
        // Make a POST request to the Suitelet
        var response = https.post({
            url: suiteletURL,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Process the Suitelet response if needed
        var responseBody = response.body;
        console.log('Suitelet Response: ', responseBody);
    }

    return {
        pageInit: pageInit,
        sendToSuitelet: sendToSuitelet
    };
});
///////////////////////////////////////////////////////////////////////////////
/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define(['N/log', 'N/record', 'N/runtime', 'N/format'], function (log, record, runtime, format) {

    function onRequest(context) {
        if (context.request.method === 'POST') {
            var body = context.request.body;
            log.debug('POST Request Body: ', body);

            // Process the data as needed
            var requestData = JSON.parse(body);
            log.debug('Received Data: ', requestData);

            // Your Suitelet logic here

            // Send a response back to the client if needed
            context.response.write(JSON.stringify({ status: 'success' }));
        }
    }

    return {
        onRequest: onRequest
    };
});
