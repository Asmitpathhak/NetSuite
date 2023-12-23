/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord','N/https','N/url'],
function (currentRecord,https,url) {

    function pageInit(scriptContext) {
        console.log('Hello from the client script! This message will appear in the execution log.');
    }

    function fieldChanged(scriptContext) {

       



       console.log('Field changed!');
      // var sublistId = scriptContext.sublistId;
       var vendorRecord = scriptContext.currentRecord;
       var fieldId = scriptContext.fieldId;

       // alert('Hello');
       if ( fieldId === 'custpage_from_date_as' || fieldId === 'custpage_to_date_as') {

           var datef = vendorRecord.getValue({
            
               fieldId: 'custpage_from_date_as'
           });

           var dateT = vendorRecord.getValue({
               
               fieldId: 'custpage_to_date_as'
           });
        //    datef=new Date(datef);
        //    dateT=new Date(dateT);
           alert('datef ='+datef)
           alert('dateT='+ dateT)
           const obj= { 
            'datast':datef,
           'dataen':dateT};
         //  const obj = {d: datef, f: dateT};
           var  suiteletURL ='/app/site/hosting/scriptlet.nl?script=8830&deploy=1';
           var response = https.post({
            url: suiteletURL,
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.body) {
            var fileId = response.body;
        }
        var viewOutput = url.resolveDomain({
            hostType: url.HostType.APPLICATION
        });



        // var btnClick = document.forms['main_form'].elements['submitter'];
        // if(btnClick){
        //         btnClick.click();
        // }else{
            
        //     return btnClick.click[0];
        // }
          



    //    https.post({
    //         url: suiteletURL,
    //         body: 'My POST Data',
    //         headers: obj
    //     });

        // var responseBody = response.body;
        // console.log('Suitelet Response: ', responseBody);


       }


    }

    function postSourcing(scriptContext) {
        // Function to be executed when field is slaved
    }

    function sublistChanged(scriptContext) {
        // Function to be executed after sublist is inserted, removed, or edited
    }

    function lineInit(scriptContext) {
        // Function to be executed after line is selected
    }

    function validateLine(scriptContext) {
        // Validation function to be executed when sublist line is committed
    }

    function validateInsert(scriptContext) {
        // Validation function to be executed when sublist line is inserted
    }

    function validateDelete(scriptContext) {
        // Validation function to be executed when record is deleted
    }

    function saveRecord(scriptContext) {
        // Validation function to be executed when record is saved
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        postSourcing: postSourcing,
        sublistChanged: sublistChanged,
        lineInit: lineInit,
        validateLine: validateLine,
        validateInsert: validateInsert,
        validateDelete: validateDelete,
        saveRecord: saveRecord
    };
});
