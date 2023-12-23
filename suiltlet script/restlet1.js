/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define([],

    function() {

/**
 * Function called upon sending a GET request to the RESTlet.
 *
 * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
 * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
 * @since 2015.1
 */
function doGet(requestParams) {

}

/**
 * Function called upon sending a PUT request to the RESTlet.
 *
 * @param {string | Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain'
 * or parsed into an Object when request Content-Type is 'application/json' (in which case the body must be a valid JSON)
 * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
 * @since 2015.2
 */
function doPut(requestBody) {

}


/**
 * Function called upon sending a POST request to the RESTlet.
 *
 * @param {string | Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain'
 * or parsed into an Object when request Content-Type is 'application/json' (in which case the body must be a valid JSON)
 * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
 * @since 2015.2
 */
function doPost(requestBody) {
    try{
        log.debug('START');
        var response = '';
        
        var internalIdofSo = requestBody.internalId;
        log.debug('internalIdofSo:',internalIdofSo);
        
        if(internalIdofSo){
            var soArr = [];
            var docNum, tranDate, custName, soAmt;
            var salesorderSearchObj = search.create({
                   type: "salesorder",
                   filters:
                   [
                      ["type","anyof","SalesOrd"], 
                      "AND", 
                      ["mainline","is","T"], 
                      "AND", 
                      ["internalid","anyof",internalIdofSo]
                   ],
                   columns:
                   [
                      search.createColumn({name: "tranid", label: "Document Number"}),
                      search.createColumn({name: "trandate", label: "Date"}),
                      search.createColumn({name: "entity", label: "Name"}),
                      search.createColumn({name: "amount", label: "Amount"}),
                      search.createColumn({name: "internalid", label: "Internal ID"})

                   ]
                });
                var searchResultCount = salesorderSearchObj.runPaged().count;
                log.debug("salesorderSearchObj result count",searchResultCount);
                salesorderSearchObj.run().each(function(result){
                   // .run().each has a limit of 4,000 results
                    docNum = result.getValue('tranid');
                    tranDate = result.getValue('trandate');
                    custName = result.getText('entity');
                    soAmt = result.getValue('amount');
                    Internald=result.getValue('internalid');
                    log.debug('docNum:',docNum);
                    log.debug('tranDate:',tranDate);
                    log.debug('custName:',custName);
                    log.debug('soAmt:',soAmt);
                    log.debug('soAinternalidt:',Internald);
                    
                    soArr.push({
                        'docNum':docNum,
                        'tranDate':tranDate,
                        'custName':custName,
                        'soAmt':soAmt,
                        'internalid':Internald

                    });
                   return true;
                });
                log.debug('soArr:',soArr);
                
                if(soArr){
                    response = soArr;
                    return response;
                }
        }else{
            log.error('Please send SO Internal ID');
            response = 'Error: Internal Id is blank, Please request info with SO Internal ID';
            return response;
        }
        

    }catch(e){
        log.error('Error in Post function: ',e);
    }
}

/**
 * Function called upon sending a DELETE request to the RESTlet.
 *
 * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
 * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
 * @since 2015.2
 */
function doDelete(requestParams) {

}

return {
//		'get': doGet,
//		put: doPut,
    post: doPost,
//		'delete': doDelete
};

});
