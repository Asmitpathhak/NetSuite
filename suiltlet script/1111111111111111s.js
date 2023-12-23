/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/log', 'N/search', 'N/ui/serverWidget'],

    function (log, search, serverWidget) {

        function onRequest(context) {
            try {
                if (context.request.method === 'GET') {
                    var form = serverWidget.createForm({
                        title: 'Sales Order by Date Range'
                    });

                    form.clientScriptModulePath = "./clientScriptforsuitlet.js";

                    form.addField({
                        id: 'custpage_from_date_as',
                        label: 'From Date',
                        type: serverWidget.FieldType.DATE
                    });

                    form.addField({
                        id: 'custpage_to_date_as',
                        label: 'To Date',
                        type: serverWidget.FieldType.DATE
                    });

                   

                    var SavedSearchAS = form.addSublist({
                        id: 'custpage_saved_search_as',
                        type: serverWidget.SublistType.INLINEEDITOR,
                        label: 'Sales Order'
                    });

                    SavedSearchAS.addField({
                        id: 'custpage_savedsearch_internalid_as',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Document Number'
                    });

                    SavedSearchAS.addField({
                        id: 'custpage_savedsearch_date_as',
                        type: serverWidget.FieldType.DATE,
                        label: 'Date'
                    });

                    SavedSearchAS.addField({
                        id: 'custpage_savedsearch_amount_as',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Amount'
                    });

                    SavedSearchAS.addField({
                        id: 'custpage_savedsearch_name_as',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Name'
                    });

                    form.addSubmitButton({
                        id: 'custpage_savedsearch_submit_as',
                        label: 'Submit'
                    });

                    context.response.writePage(form);
                }

                else if (context.request.method === 'POST') {
                    var body = context.request.body;
                    log.debug('POST Request Body: ', body);

                    var requestData = JSON.parse(body);
                    log.debug('Received Data: ', requestData);

                    var fromDate = requestData.datast;
                    var date = new Date(fromDate);
                    var month = date.getMonth() + 1; // Months are zero-based
                       var day = date.getDate();
                      var year = date.getFullYear() % 100; // Get the last two digits of the year
  
               // Pad single-digit month and day with a leading zero
                    month = month < 10 ? '0' + month : month;
                    day = day < 10 ? '0' + day : day;
  
                    fromDate=   month + '/' + day + '/' + year;
                    log.debug('fromDate: ', fromDate);

                    var toDate = requestData.dataen;

                    var date = new Date(toDate);
                    var month = date.getMonth() + 1; // Months are zero-based
                       var day = date.getDate();
                      var year = date.getFullYear() % 100; // Get the last two digits of the year
  
               // Pad single-digit month and day with a leading zero
                    month = month < 10 ? '0' + month : month;
                    day = day < 10 ? '0' + day : day;
  
                    toDate=   month + '/' + day + '/' + year;
  
                    log.debug('toDate: ', toDate);
  


                  //  var fromDate = formatDateString(requestData.datast);
                    // Function to format the date string to "M/d/yy"
                  
                  


                 //   var toDate = formatDateString(requestData.dataen);

                   // Function to format the date string to "M/d/yy"
                  
                   
                    var form = serverWidget.createForm({
                        title: 'Sales Order by Date Range'
                    });

                    var SavedSearchAS = form.addSublist({
                        id: 'custpage_saved_search_as',
                        type: serverWidget.SublistType.INLINEEDITOR,
                        label: 'Sales Order'
                    });

                    // ... (rest of the sublist setup)

                    var salesorderSearchObj = search.create({
                        type: "salesorder",
                        filters: [
                            ["mainline", "is", "T"],
                            "AND",
                            ["trandate", "within", fromDate, toDate],
                            "AND",
                            ["type", "anyof", "SalesOrd"]
                        ],
                        columns: [
                            search.createColumn({ name: "tranid", label: "Document Number" }),
                            search.createColumn({ name: "entity", label: "Name" }),
                            search.createColumn({ name: "amount", label: "Amount" }),
                            search.createColumn({ name: "trandate", label: "Date" })
                        ]
                    });

                    var lineCount = -1;
                    salesorderSearchObj.run().each(function (result) {
                        lineCount++;

                        var tranid_As = result.getValue('tranid');
                        log.debug('tranid_As: ',tranid_As);
                        var entity_As = result.getValue('entity');
                        log.debug('entity_As: ',entity_As);
                        var amount_As = result.getValue('amount');
                        log.debug('amount_As: ',amount_As);
                        var trandate_As = result.getValue('trandate');
                        log.debug('trandate_As: ',trandate_As);

                        SavedSearchAS.setSublistValue({
                            id: 'custpage_savedsearch_internalid_as',
                            line: lineCount,
                            value: tranid_As
                        });

                        SavedSearchAS.setSublistValue({
                            id: 'custpage_savedsearch_name_as',
                            line: lineCount,
                            value: entity_As
                        });

                        SavedSearchAS.setSublistValue({
                            id: 'custpage_savedsearch_amount_as',
                            line: lineCount,
                            value: amount_As
                        });

                        SavedSearchAS.setSublistValue({
                            id: 'custpage_savedsearch_date_as',
                            line: lineCount,
                            value: trandate_As
                        });

                        return true;
                    });
                      log.debug('post end: ');

                    context.response.writePage(form);
                }
            } catch (e) {
                log.error({
                    title: 'Error',
                    details: e.toString()
                });

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
