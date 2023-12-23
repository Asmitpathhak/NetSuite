/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget', 'N/record','N/search','N/currentRecord'],

    function (serverWidget, record,search,currentRecord) {

        /**
         * Definition of the Suitelet script trigger point.
         *
         * @param {Object} context
         * @param {ServerRequest} context.request - Encapsulation of the incoming request
         * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
         * @Since 2015.2
         */
        function onRequest(context) {
            try {
                var request = context.request;
                var response = context.response;
                


                var form = serverWidget.createForm({
                    title: 'Saved Search BY Shaista'
                });
               form.clientScriptModulePath = "./client_script_dynamicdate.js  ";



                if (request.method == 'GET') {

                    form.addField({
                        id: 'custpage_start_date',
                        label: 'Start Date',
                        type: serverWidget.FieldType.DATE
                    });
    
                    form.addField({
                        id: 'custpage_end_date',
                        label: 'End Date',
                        type: serverWidget.FieldType.DATE
                    });
  		

                    var savedsearch_sp = form.addSublist({
                        id: 'custpage_shaista',
                        type: serverWidget.SublistType.INLINEEDITOR,
                        label: 'Saved Search Record'
                    });

                    savedsearch_sp.addField({
                        id: 'custpage_internal_id',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Internal ID',
                    });

                    savedsearch_sp.addField({
                        id: 'custpage_date',
                        type: serverWidget.FieldType.DATE,
                        label: 'Date'

                    });
                    
                    savedsearch_sp.addField({
                        id: 'custpage_doc_num',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Document number'

                    });
                   
                    savedsearch_sp.addField({
                        id: 'custpage_status',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Status'

                    });
                    savedsearch_sp.addField({
                        id: 'custpage_amount',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'Amount'

                    });

                    var salesorderSearchObj = search.create({
                        type: "salesorder",
                        filters:
                        [
                           ["type","anyof","SalesOrd"], 
                           "AND", 
                           ["mainline","is","T"], 
                           "AND", 
                           ["status","anyof","SalesOrd:B"], 
                           "AND", 
                           ["trandate","within","11/1/2023","12/1/2023"]
                        ],
                        columns:
                        [
                           search.createColumn({name: "internalid", label: "Internal ID"}),
                           search.createColumn({name: "tranid", label: "Document Number"}),
                           search.createColumn({
                              name: "trandate",
                              sort: search.Sort.ASC,
                              label: "Date"
                           }),
                           search.createColumn({name: "statusref", label: "Status"}),
                           search.createColumn({name: "amount", label: "Amount"})
                        ]
                     });
                     var COUNT_sp=-1;
                     var searchResultCount = salesorderSearchObj.runPaged().count;
                     log.debug("salesorderSearchObj result count",searchResultCount);
                     salesorderSearchObj.run().each(function(result){
                       
                        
                       
                        
                    
                    
                        COUNT_sp++;				
                        // .run().each has a limit of 4,000 results
                        var internalid_sp = result.getValue('internalid');
                        log.debug('internalid_sp', internalid_sp);
                        var trandate_sp = result.getValue('trandate');
                        log.debug('trandate_sp', trandate_sp);
                        
                        var tranid_sp = result.getValue('tranid');
                        log.debug('tranid_sp', tranid_sp);
                        
                        var status_sp = result.getValue('statusref');
                        log.debug('status_sp', status_sp);
                        var Amount_sp = result.getValue('amount');
                        log.debug('Amount_sp', Amount_sp);
    
    
    
                        savedsearch_sp.setSublistValue({
                            id : 'custpage_internal_id',
                            line : COUNT_sp,
                            value : internalid_sp
                        });
                        savedsearch_sp.setSublistValue({
                            id : 'custpage_date',
                            line : COUNT_sp,
                            value : trandate_sp
                        });
                        if(tranid_sp){
                        savedsearch_sp.setSublistValue({
                            id : 'custpage_doc_num',
                            line : COUNT_sp,
                            value : tranid_sp
                        });
                    }
                        savedsearch_sp.setSublistValue({
                            id : 'custpage_status',
                            line : COUNT_sp,
                            value : status_sp
                        });
                        savedsearch_sp.setSublistValue({
                            id : 'custpage_amount',
                            line : COUNT_sp,
                            value : Amount_sp
                        });



                        return true;
                    });

                   

                    form.addSubmitButton({
                        label: 'Submit'
                    });
                   
                    




                    response.writePage(form);
                    
                }
                else if (context.request.method === 'POST') {
                    var startDate = context.request.parameters.custpage_start_date;
                    var endDate = context.request.parameters.custpage_end_date;

                    log.debug({
                        title: 'Date Range Selected',
                        details: 'Start Date: ' + startDate + ', End Date: ' + endDate
                    });
                   
                    
                    var reportForm = serverWidget.createForm({
                        title: 'Custom Date Range Report'
                    });
                    
                    var savedsearch_sp_d = reportForm.addSublist({
                        id: 'custpage_shaista',
                        type: serverWidget.SublistType.INLINEEDITOR,
                        label: 'Saved Search Record'
                    });

                    savedsearch_sp_d.addField({
                        id: 'custpage_internal_id_d',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Internal ID',
                    });

                    savedsearch_sp_d.addField({
                        id: 'custpage_date_d',
                        type: serverWidget.FieldType.DATE,
                        label: 'Date'

                    });
                    
                    savedsearch_sp_d.addField({
                        id: 'custpage_docnum_d',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Document number'

                    });
                   
                    savedsearch_sp_d.addField({
                        id: 'custpage_status_d',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Status'

                    });
                    savedsearch_sp_d.addField({
                        id: 'custpage_amount_d',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'Amount'

                    });
                    var salesorderSearchObj = search.create({
                        type: "salesorder",
                        filters:
                        [
                           ["mainline","is","T"], 
                           "AND", 
                           ["type","anyof","SalesOrd"], 
                           "AND", 
                           ["trandate","within","startdate","enddate"], 
                           "AND", 
                           ["status","anyof","SalesOrd:B"]
                        ],
                        columns:
                        [
                           search.createColumn({
                              name: "trandate",
                              sort: search.Sort.ASC,
                              label: "Date"
                           }),
                           search.createColumn({name: "tranid", label: "Document Number"}),
                           search.createColumn({name: "statusref", label: "Status"}),
                           search.createColumn({name: "amount", label: "Amount"}),
                           search.createColumn({name: "internalid", label: "Internal ID"})
                        ]
                     });
                     var COUNT_sp_d=-1;
                     var searchResultCount = salesorderSearchObj.runPaged().count;
                     log.debug("salesorderSearchObj result count",searchResultCount);
                     salesorderSearchObj.run().each(function(result){
                       
                        COUNT_sp_d++;



                        var internalid_sp_d = result.getValue('internalid');
                        log.debug('internalid_sp_d', internalid_sp_d);
                        var trandate_sp_d = result.getValue('trandate');
                        log.debug('trandate_sp_d', trandate_sp_d);
                        
                        var tranid_sp_d = result.getValue('tranid');
                        log.debug('tranid_sp_d', tranid_sp_d);
                        
                        var status_sp_d = result.getValue('statusref');
                        log.debug('status_sp_d', status_sp_d);
                        var Amount_sp_d = result.getValue('amount');
                        log.debug('Amount_sp', Amount_sp_d);
    
    
    
                        savedsearch_sp_d.setSublistValue({
                            id : 'custpage_internal_id_d',
                            line : COUNT_sp_d,
                            value : result.getValue('internalid')
                        });
                        savedsearch_sp_d.setSublistValue({
                            id : 'custpage_date_d',
                            line : COUNT_sp_d,
                            value :result.getValue('trandate')
                        });
                        if(tranid_sp_d){
                        savedsearch_sp_d.setSublistValue({
                            id : 'custpage_doc_num_d',
                            line : COUNT_sp_d,
                            value : result.getValue('tranid')
                        });
                    }
                        
                        savedsearch_sp_d.setSublistValue({
                            id : 'custpage_status_d',
                            line : COUNT_sp_d,
                            value : result.getValue('statusref')
                        });
                        savedsearch_sp_d.setSublistValue({
                            id : 'custpage_amount_d',
                            line : COUNT_sp_d,
                            value : result.getValue('amount')
                        });
                        
                        return true;
                        
                     });
                     response.writePage(reportForm);
   
                   

                    context.response.write('Custom records created successfully.');
                }

            } catch (error) {
                log.error('Error in Suitelet', error);
            }

        }

        return {
            onRequest: onRequest
        };

    });