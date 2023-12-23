/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/log', 'N/search', 'N/ui/serverWidget'],
   /**
    * Definition of the Suitelet script trigger point.
    *
    * @param {Object} context
    * @param {ServerRequest} context.request - Encapsulation of the incoming request
    * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
    * @Since 2015.2
    */
   function (log, search, serverWidget) {
       function onRequest(context) {
           try {
               if (context.request.method === 'GET') {
                   var form = serverWidget.createForm({
                       title: 'sales order by as'
                   });
                   form.addField({
                       id: 'custpage_from_date_as',
                       label: 'FromDate',
                       type: serverWidget.FieldType.DATE
                   });
                   form.addField({
                       id: 'custpage_to_date_as',
                       label: 'ToDate',
                       type: serverWidget.FieldType.DATE
                   });



                   form.addSubmitButton({
                       label: 'Submit'
                   });
                   context.response.writePage(form);
              
                } 
               
               else if (context.request.method === 'POST') {
                 
               

             
                 //-----------------------------------------------------------------------------------------------
                
                
                     
                   context.response.writePage(form);
               }
           } catch (e) {
               // Log any errors that occur
               log.error({
                   title: 'Error',
                   details: e.toString()
               });
               // Display an error message on the form
               context.response.write({
                   output: 'An error occurred: ' + e.toString()
               });
           }
       }
       return {
           onRequest: onRequest
       };
   }
);