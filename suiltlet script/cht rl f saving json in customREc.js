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
        
        var applicantName = requestBody.applicantname;
        log.debug('applicantname:',applicantName);

        var applicantEmail = requestBody.applicantemail;
        log.debug('applicantEmail:',applicantEmail);
        
        var applicantPhone = requestBody.applicantphone;
        log.debug('applicantPhone:',applicantPhone);
        
        var applicantDob = requestBody.applicantdob;
        log.debug('applicantDob:',applicantDob);
          
        var aoi = requestBody.aoi;
        log.debug('aoi:',aoi);
          
        var applicantAge = requestBody.applicantage;
        log.debug('applicantAge:',applicantAge);
          
        var newparticPant = requestBody.newparticpant;
        log.debug('newparticPant:',newparticPant);
         
        if(applicantName && applicantEmail && applicantPhone && applicantDob && aoi && applicantAge && newparticPant){
           
           // var docNum, tranDate, custName, soAmt;

           var customRecord = record.create({
            type: 'customrecordsports_applictaion_form_asmi',
            isDynamic: true
        });
        
         customRecord.setValue({
            fieldId: 'custrecordapplicantt_email',
            value: applicantEmail
        });
        log.debug(applicantEmail);
        customRecord.setValue({
            fieldId: 'custrecord_applicantt_name',
            value: applicantName
        });
        log.debug(applicantName);
        customRecord.setValue({
            fieldId: 'custrecordapplicanttphone',
            value: applicantPhone
        });
        log.debug(applicantPhone);
        customRecord.setValue({
            fieldId: 'custrecordapplicant_dob',
            value: applicantDob
        });
        log.debug(applicantDob);
        customRecord.setValue({
            fieldId: 'custrecord_applicant_area_of_interest',
            value: aoi
        });
        log.debug(aoi);
        customRecord.setValue({
            fieldId: 'custrecord_applicantt_age',
            value: applicantAge
        });
        log.debug(applicantAge);
        customRecord.setValue({
            fieldId: 'custrecord_new_participantt',
            value: newparticPant
        });
        log.debug(newparticPant);
      

        var recordId = customRecord.save();

log.debug({
    title: 'Record Created',
    details: 'Record ID: ' + recordId
});
            
          }else{
            log.error('Please pass All deatails');
            response = 'Error: Field  is blank, Please request info with proper values';
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
