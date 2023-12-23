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
                   form.clientScriptModulePath = "./clientScriptforsuitlet.js";

                  // form.clientScriptModulePath='./clientScriptforsuitlet.js';
                   
//////////////////////////////////////////////////////
//  var SavedSarchAS = form.addSublist({
//                     id : 'custpage_saved_search_as',
//                    type : serverWidget.SublistType.INLINEEDITOR,
//                    label : 'SalesOrder'
//                     });
//                   SavedSarchAS.addField({
//                    id: 'custpage_savedsearch_internalid_as',
//                  type: serverWidget.FieldType.TEXT,
//                  label: 'DocumentNumber'
//                                        });
//                   SavedSarchAS.addField({
//                  id: 'custpage_savedsearch_date_as',
//                   type: serverWidget.FieldType.DATE,
//                   label: 'Date'
//                                        });
//                   SavedSarchAS.addField({
//                   id: 'custpage_savedsearch_amount_as',
//                  type: serverWidget.FieldType.FLOAT,
//                  label: 'Amount'
//                                      });
//                SavedSarchAS.addField({
//                id: 'custpage_savedsearch_name_as',
//                type: serverWidget.FieldType.TEXT,
//                label: 'Name'
//                                  });
//                    //---------------------------------------------------------------------------------------------------------------------
//                    var salesorderSearchObj = search.create({
//                        type: "salesorder",
//                        filters:
//                            [
//                                ["mainline", "is", "T"],
//                                "AND",
//                                ["type", "anyof", "SalesOrd"]
//                            ],
//                        columns:
//                            [
//                                search.createColumn({ name: "tranid", label: "Document Number" }),
//                                search.createColumn({ name: "entity", label: "Name" }),
//                                search.createColumn({ name: "amount", label: "Amount" }),
//                                search.createColumn({ name: "trandate", label: "Date" })
//                            ]
//                    });
//                    var lineCount = -1;
//                    var searchResultCount = salesorderSearchObj.runPaged().count;
//                    log.debug("salesorderSearchObj result count", searchResultCount);
//                    salesorderSearchObj.run().each(function (result) {
//                        lineCount++;
//                        // .run().each has a limit of 4,000 results
//                        var tranid_As = result.getValue('tranid');
//                        log.debug('tranid_as', tranid_As);
//                        var entity_As = result.getValue('entity');
//                        log.debug('entity_as', entity_As);
//                        var amount_As = result.getValue('amount');
//                        log.debug('Amount_as', amount_As);
//                        var trandate_As = result.getValue('trandate');
//                        log.debug('trandate_as', trandate_As);
                       
//                        SavedSarchAS.setSublistValue({
//                            id: 'custpage_savedsearch_internalid_as',
//                            line: lineCount,
//                            value: tranid_As
//                        });
//                        SavedSarchAS.setSublistValue({
//                            id: 'custpage_savedsearch_name_as',
//                            line: lineCount,
//                            value: entity_As
//                        });
//                        SavedSarchAS.setSublistValue({
//                            id: 'custpage_savedsearch_amount_as',
//                            line: lineCount,
//                            value: amount_As
//                        });
//                        SavedSarchAS.setSublistValue({
//                            id: 'custpage_savedsearch_date_as',
//                            line: lineCount,
//                            value: trandate_As
//                        });
//                        return true;


//   });



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


                   form.addSubmitButton({
                       label: 'Submit'
                   });
                   context.response.writePage(form);
              
                } 
               
               else if (context.request.method === 'POST') {
                 
            //     var fromDate = context.request.parameters.custpage_from_date_as;
                
            //     var toDate = context.request.parameters.custpage_to_date_as;
             

            //     log.debug('fromDate',fromDate);
            //     log.debug('ToDate',toDate);


           // if (context.request.method === 'POST') {
                var body = context.request.body;
                log.debug('POST Request Body: ', body);
    
                // Process the data as needed
                var requestData = JSON.parse(body);
                log.debug('Received Data: ', requestData);
    
                var fromDate = requestData.datst;
                log.debug('fromDate : ', fromDate);
    
                var toDate = requestData.daten;
                log.debug('toDate: ', toDate);
    
                // Your Suitelet logic here
    
                // Send a response back to the client if needed
              //  context.response.write(JSON.stringify({ status: 'success' }));
           // }

                   var form = serverWidget.createForm({
                       title: 'sales order by as'
                   });
                   var SavedSarchAS = form.addSublist({
                    id : 'custpage_saved_search_as',
                   type : serverWidget.SublistType.INLINEEDITOR,
                   label : 'SalesOrder'
                    });
                  SavedSarchAS.addField({
                   id: 'custpage_savedsearch_internalid_as',
                 type: serverWidget.FieldType.INTEGER,
                 label: 'DocumentNumber'
                                       });
                  SavedSarchAS.addField({
                 id: 'custpage_savedsearch_date_as',
                  type: serverWidget.FieldType.DATE,
                  label: 'Date'
                                       });
                  SavedSarchAS.addField({
                  id: 'custpage_savedsearch_amount_as',
                 type: serverWidget.FieldType.FLOAT,
                 label: 'Amount'
                                     });
               SavedSarchAS.addField({
               id: 'custpage_savedsearch_name_as',
               type: serverWidget.FieldType.TEXT,
               label: 'Name'
                                 });
                   //---------------------------------------------------------------------------------------------------------------------
                   var salesorderSearchObj = search.create({
                       type: "salesorder",
                       filters:
                           [
                               ["mainline", "is", "T"],
                               "AND",
                               ["trandate", "within", fromDate, toDate],
                               "AND",
                               ["type", "anyof", "SalesOrd"]
                           ],
                       columns:
                           [
                               search.createColumn({ name: "tranid", label: "Document Number" }),
                               search.createColumn({ name: "entity", label: "Name" }),
                               search.createColumn({ name: "amount", label: "Amount" }),
                               search.createColumn({ name: "trandate", label: "Date" })
                           ]
                   });
                   var lineCount = -1;
                   var searchResultCount = salesorderSearchObj.runPaged().count;
                   log.debug("salesorderSearchObj result count", searchResultCount);
                   salesorderSearchObj.run().each(function (result) {
                       lineCount++;
                       // .run().each has a limit of 4,000 results
                       var tranid_As = result.getValue('tranid');
                       log.debug('tranid_as', tranid_As);
                       var entity_As = result.getValue('entity');
                       log.debug('entity_as', entity_As);
                       var amount_As = result.getValue('amount');
                       log.debug('Amount_as', amount_As);
                       var trandate_As = result.getValue('trandate');
                       log.debug('trandate_as', trandate_As);
                       
                       SavedSarchAS.setSublistValue({
                           id: 'custpage_savedsearch_internalid_as',
                           line: lineCount,
                           value: tranid_As
                       });
                       SavedSarchAS.setSublistValue({
                           id: 'custpage_savedsearch_name_as',
                           line: lineCount,
                           value: entity_As
                       });
                       SavedSarchAS.setSublistValue({
                           id: 'custpage_savedsearch_amount_as',
                           line: lineCount,
                           value: amount_As
                       });
                       SavedSarchAS.setSublistValue({
                           id: 'custpage_savedsearch_date_as',
                           line: lineCount,
                           value: trandate_As
                       });
                       return true;
                   });
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