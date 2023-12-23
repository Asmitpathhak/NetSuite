/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget', 'N/record','N/search'],

function (serverWidget, record,search) {

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
                title: 'Saved Search BY AS'
            });


            if (request.method == 'GET') {

                var sublist_item = form.addSublist({
                    id: 'custpage_hello',
                    type: serverWidget.SublistType.INLINEEDITOR,
                    label: 'Saved Search Record'
                });

                sublist_item.addField({
                    id: 'custpage_internal_id',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Internal ID',
                });

                sublist_item.addField({
                    id: 'custpage_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Date'

                });
                sublist_item.addField({
                    id: 'custpage_type',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Type'
                });
                sublist_item.addField({
                    id: 'custpage_docnum',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Document number'

                });
                sublist_item.addField({
                    id: 'custpage_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Name'

                });
                sublist_item.addField({
                    id: 'custpage_memo',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Memo'

                });
                sublist_item.addField({
                    id: 'custpage_amount',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Amount'

                });

                var purchaseorderSearchObj = search.create({
                    type: "purchaseorder",
                    filters:
                        [
                            ["trandate", "within", "10/26/2023", "10/31/2023"],
                            "AND",
                            ["type", "anyof", "PurchOrd"],
                            "AND",
                            ["custbody_nsts_gaw_tran_requestor", "anyof", "34869"],
                            "AND", 
                            ["mainline","is","T"]
                        ],
                    columns:
                        [
                            search.createColumn({ name: "internalid", label: "Internal ID" }),
                            search.createColumn({ name: "trandate", label: "Date" }),
                            search.createColumn({ name: "type", label: "Type" }),
                            search.createColumn({ name: "tranid", label: "Document Number" }),
                            search.createColumn({ name: "entity", label: "Name" }),
                            search.createColumn({ name: "memo", label: "Memo" }),
                            search.createColumn({ name: "amount", label: "Amount" })
                        ]
                });
                var lineCount = -1;
                var searchResultCount = purchaseorderSearchObj.runPaged().count;
                log.debug("purchaseorderSearchObj result count", searchResultCount);
                purchaseorderSearchObj.run().each(function (result) {
                    lineCount++;
                    // .run().each has a limit of 4,000 results
                    var internalid_hk = result.getValue('internalid');
                    log.debug('internalid_hk',internalid_hk); 
                    var trandate_hk = result.getValue('trandate');
                    log.debug('trandate_hk',trandate_hk); 
                    var type_hk = result.getValue('type');
                    log.debug('type_hk',type_hk); 
                    var tranid_hk = result.getValue('tranid');
                    log.debug('tranid_hk',tranid_hk); 
                    var entity_hk = result.getValue('entity');
                    log.debug('entity_hk',entity_hk); 
                    var Memo_hk = result.getValue('memo');
                    log.debug('Memo_hk',Memo_hk); 
                    var Amount_hk = result.getValue('amount');
                    log.debug('Amount_hk',Amount_hk); 

                    sublist_item.setSublistValue({
                        id : 'custpage_internal_id',
                        line : lineCount,
                        value : internalid_hk
                    });
                    sublist_item.setSublistValue({
                        id : 'custpage_date',
                        line : lineCount,
                        value : trandate_hk
                    });
                    sublist_item.setSublistValue({
                        id : 'custpage_type',
                        line : lineCount,
                        value : type_hk
                    });
                    sublist_item.setSublistValue({
                        id : 'custpage_docnum',
                        line : lineCount,
                        value : tranid_hk
                    });
                    sublist_item.setSublistValue({
                        id : 'custpage_name',
                        line : lineCount,
                        value : entity_hk
                    });
                    sublist_item.setSublistValue({
                        id : 'custpage_memo',
                        line : lineCount,
                        value : Memo_hk
                    });
                    sublist_item.setSublistValue({
                        id : 'custpage_amount',
                        line : lineCount,
                        value : Amount_hk
                    });



                    return true;
                });

                /*
                purchaseorderSearchObj.id="customsearch1699080814841";
                purchaseorderSearchObj.title="Transaction SS HK (copy)";
                var newSearchId = purchaseorderSearchObj.save();
                */

                form.addSubmitButton({
                    label: 'Submit'
                });



                response.writePage(form);
            }
            else {

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