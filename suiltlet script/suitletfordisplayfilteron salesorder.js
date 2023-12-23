/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget', 'N/record', 'N/search', 'N/currentRecord'],

    function (serverWidget, record, search, currentRecord) {

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
                    title: 'sales order by as'
                });
                form.clientScriptModulePath = "./clientScriptforsuitlet.js";



                if (request.method == 'GET') {

                    form.addField({
                        id: 'custpage_from_date_as',
                        label: 'Start Date',
                        type: serverWidget.FieldType.DATE
                    });

                    form.addField({
                        id: 'custpage_to_date_as',
                        label: 'End Date',
                        type: serverWidget.FieldType.DATE
                    });


                    var savedsearch_ap = form.addSublist({
                        id: 'custpage_saved_search_as',
                        type: serverWidget.SublistType.INLINEEDITOR,
                        label: 'Saved Search Record'
                    });

                    savedsearch_ap.addField({
                        id: 'custpage_savedsearch_internalid_as',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Internal ID',
                    });

                    savedsearch_ap.addField({
                        id: 'custpage_savedsearch_date_as',
                        type: serverWidget.FieldType.DATE,
                        label: 'Date'

                    });

                    savedsearch_ap.addField({
                        id: 'custpage_savedsearch_document_as',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Document number'

                    });

                    savedsearch_ap.addField({
                        id: 'custpage_savedsearch_status_as',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Status'

                    });
                    savedsearch_ap.addField({
                        id: 'custpage_savedsearch_amount_as',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'Amount'

                    });

                    var salesorderSearchObj = search.create({
                        type: "salesorder",
                        filters:
                            [
                                ["type", "anyof", "SalesOrd"],
                                "AND",
                                ["mainline", "is", "T"],
                                "AND",
                                ["status", "anyof", "SalesOrd:B"],
                                "AND",
                                ["trandate", "within", "11/1/2023", "12/1/2023"]
                            ],
                        columns:
                            [
                                search.createColumn({ name: "internalid", label: "Internal ID" }),
                                search.createColumn({ name: "tranid", label: "Document Number" }),
                                search.createColumn({name: "trandate",sort: search.Sort.ASC,label: "Date"}),
                                search.createColumn({ name: "statusref", label: "Status" }),
                                search.createColumn({ name: "amount", label: "Amount" })
                            ]
                    });
                    var COUNT_ap = -1;
                    var searchResultCount = salesorderSearchObj.runPaged().count;
                    log.debug("salesorderSearchObj result count", searchResultCount);
                    salesorderSearchObj.run().each(function (result) {
                             
                        COUNT_ap++;
                        // .run().each has a limit of 4,000 results
                        var internalid_Ap = result.getValue('internalid');
                        log.debug('internalid_Ap', internalid_Ap);
                        var trandate_Ap = result.getValue('trandate');
                        log.debug('trandate_Ap', trandate_Ap);

                        var tranid_Ap = result.getValue('tranid');
                        log.debug('tranid_Ap', tranid_Ap);

                        var status_Ap = result.getValue('statusref');
                        log.debug('status_Ap', status_Ap);
                        var amount_Ap = result.getValue('amount');
                        log.debug('amount_Ap', amount_Ap);



                        savedsearch_ap.setSublistValue({
                            id: 'custpage_savedsearch_internalid_as',
                            line: COUNT_ap,
                            value: internalid_Ap
                        });
                        savedsearch_ap.setSublistValue({
                            id: 'custpage_savedsearch_date_as',
                            line: COUNT_ap,
                            value: trandate_Ap
                        });
                        if (tranid_Ap) {
                            savedsearch_ap.setSublistValue({
                                id: 'custpage_savedsearch_document_as',
                                line: COUNT_ap,
                                value: tranid_Ap
                            });
                        }
                        savedsearch_ap.setSublistValue({
                            id: 'custpage_savedsearch_status_as',
                            line: COUNT_ap,
                            value: status_Ap
                        });
                        savedsearch_ap.setSublistValue({
                            id: 'custpage_savedsearch_amount_as',
                            line: COUNT_ap,
                            value: amount_Ap
                        });



                        return true;
                    });



                    form.addSubmitButton({
                        label: 'Submit'
                    });






                    response.writePage(form);

                }
                else if (context.request.method === 'POST') {
                    var startDate = context.request.parameters.custpage_from_date_as;
                    var endDate = context.request.parameters.custpage_to_date_as;
                     log.debug({
                        title: 'date Range',
                        details: 'Start Date: ' + startDate + ', End Date: ' + endDate
                    });


                    var reportForm = serverWidget.createForm({
                        title: 'filter sales order by as'
                    });

                    var savedsearch_ap_d = reportForm.addSublist({
                        id: 'custpage_asmit',
                        type: serverWidget.SublistType.INLINEEDITOR,
                        label: 'Saved Search Record'
                    });

                    savedsearch_ap_d.addField({
                        id: 'custpage_internal_id_a',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Internal ID',
                    });

                    savedsearch_ap_d.addField({
                        id: 'custpage_date_a',
                        type: serverWidget.FieldType.DATE,
                        label: 'Date'

                    });

                    savedsearch_ap_d.addField({
                        id: 'custpage_docnum_a',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Document number'

                    });

                    savedsearch_ap_d.addField({
                        id: 'custpage_status_a',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Status'

                    });
                    savedsearch_ap_d.addField({
                        id: 'custpage_amount_a',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'Amount'

                    });
                    var salesorderSearchObj = search.create({
                        type: "salesorder",
                        filters:
                            [
                                ["mainline", "is", "T"],
                                "AND",
                                ["type", "anyof", "SalesOrd"],
                                "AND",
                                ["trandate", "within", startDate, endDate],
                                "AND",
                                ["status", "anyof", "SalesOrd:B"]
                            ],
                        columns:
                            [
                                search.createColumn({name: "trandate",sort: search.Sort.ASC,label: "Date"}),
                                search.createColumn({ name: "tranid", label: "Document Number" }),
                                search.createColumn({ name: "statusref", label: "Status" }),
                                search.createColumn({ name: "amount", label: "Amount" }),
                                search.createColumn({ name: "internalid", label: "Internal ID" })
                            ]
                    });
                    var COUNT_ap_d = -1;
                    var searchResultCount = salesorderSearchObj.runPaged().count;
                    log.debug("salesorderSearchObj result count", searchResultCount);
                    salesorderSearchObj.run().each(function (result) {

                        COUNT_ap_d++;



                        var internalid_ap_d = result.getValue('internalid');
                        log.debug('internalid_ap_d', internalid_ap_d);
                        var trandate_ap_d = new Date();
                        var trandate_ap_d = result.getValue('trandate');
                        log.debug('trandate_ap_d', trandate_ap_d);

                        var tranid_ap_d = result.getValue('tranid');
                        log.debug('tranid_ap_d', tranid_ap_d);

                        var status_ap_d = result.getValue('statusref');
                        log.debug('status_ap_d', status_ap_d);
                        var Amount_ap_d = result.getValue('amount');
                        log.debug('Amount_ap_d', Amount_ap_d);



                        savedsearch_ap_d.setSublistValue({
                            id: 'custpage_internal_id_a',
                            line: COUNT_ap_d,
                            value: result.getValue('internalid')
                        });
                        var date = new Date();
                        if (!isNaN(date.getTime())) {
                            savedsearch_ap_d.setSublistValue({
                                id: 'custpage_date_a',
                                line: COUNT_ap_d,
                                value: result.getValue('trandate')
                            });
                        }
                        if (tranid_ap_d) {
                            savedsearch_ap_d.setSublistValue({
                                id: 'custpage_docnum_a',
                                line: COUNT_ap_d,
                                value: result.getValue('tranid')
                            });
                        }

                        savedsearch_ap_d.setSublistValue({
                            id: 'custpage_status_a',
                            line: COUNT_ap_d,
                            value: result.getValue('statusref')
                        });
                        savedsearch_ap_d.setSublistValue({
                            id: 'custpage_amount_a',
                            line: COUNT_ap_d,
                            value: result.getValue('amount')
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

