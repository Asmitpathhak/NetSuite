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
        
        var internalIdofPo = requestBody.internalId;
        log.debug('internalIdofPo:',internalIdofPo);
         
        if(internalIdofPo){
            var soArr = [];
            var docNum, tranDate, custName, soAmt;
var purchaseorderSearchObj = search.create({
            type: "purchaseorder",
            filters:
            [
               ["mainline","is","T"], 
               "AND", 
               ["type","anyof","PurchOrd"]
            ],
            columns:
            [
               search.createColumn({name: "tranid", label: "Document Number"}),
               search.createColumn({name: "trandate", label: "Date"}),
               search.createColumn({name: "internalid", label: "Internal ID"}),
               search.createColumn({name: "vendtype", label: "Vendor Category"})
            ]
         });
         var searchResultCount = purchaseorderSearchObj.runPaged().count;
         log.debug("purchaseorderSearchObj result count",searchResultCount);
         purchaseorderSearchObj.run().each(function(result){


            docNum = result.getValue('tranid');
            tranDate = result.getValue('trandate');
           
            vendorCategory = result.getValue('vendtype');
            Internald=result.getValue('internalid');
            
            log.debug('docNum:',docNum);
            log.debug('tranDate:',tranDate);
            log.debug('vendorCategory:',vendorCategory);
            log.debug('Internald:',Internald);
            
            soArr.push({
                'docNum':docNum,
                'tranDate':tranDate,
                'vendorCategory':vendorCategory,
                'internalid':Internald

            });
            // .run().each has a limit of 4,000 results
            return true;


            
         }); 
        
         log.debug('soArr:',soArr);
                
         if(soArr){
             response = soArr;
             return response;
         }
        
        
        }else{
            log.error('Please send PO Internal ID');
            response = 'Error: Internal Id is blank, Please request info with PO Internal ID';
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
