/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord'],
function (currentRecord) {

    function pageInit(scriptContext) {
        console.log('Hello from the client script! This message will appear in the execution log.');
    }

    function fieldChanged(scriptContext) {

       



       console.log('Field changed!');
       var sublistId = scriptContext.sublistId;
       var vendorRecord = scriptContext.currentRecord;
       var fieldId = scriptContext.fieldId;

       // alert('Hello');
       if (sublistId === 'custpage_item' && (fieldId === 'custpage_sublist2' || fieldId === 'custpage_sublist3')) {

           var Quantity = vendorRecord.getCurrentSublistValue({
               sublistId: 'custpage_item',
               fieldId: 'custpage_sublist2',
           });

           var rate = vendorRecord.getCurrentSublistValue({
               sublistId: 'custpage_item',
               fieldId: 'custpage_sublist3',
           });
           alert('Quantity ='+Quantity)
           alert('rate='+ rate)
           var amount = Quantity * rate;

           vendorRecord.setCurrentSublistValue({
               sublistId: 'custpage_item',
               fieldId: 'custpage_sublist4',
               value: amount
           });


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
