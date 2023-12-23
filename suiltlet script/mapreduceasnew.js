/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/search', 'N/record', 'N/file', 'N/runtime', 'N/email'],

    function (search, record, file, runtime, email) {

        function getInputData() {
            try{
                var arr_List = [];
                var customrecord_custom_purchase_order_list_SearchObj = search.create({
                    type: "customrecord_custom_purchase_order_list_",
                    filters:
                    [
                       ["custrecord_craeatedd_by_as","anyof","34874"]
                    ],
                    columns:
                    [
                       search.createColumn({
                          name: "scriptid",
                          sort: search.Sort.ASC,
                          label: "Script ID"
                       }),
                       search.createColumn({name: "custrecord111415", label: "vendor name"}),
                       search.createColumn({name: "custrecord_document_number", label: "vendor document number"}),
                       search.createColumn({name: "custrecord_po_date_ap", label: "Po date"}),
                       search.createColumn({name: "custrecord_craeatedd_by_as", label: "created by "}),
                       search.createColumn({name: "custrecord_totall_amountt_as", label: "total amount"})
                    ]
                 });
                 var searchResultCount = customrecord_custom_purchase_order_list_SearchObj.runPaged().count;
                 log.debug("customrecord_custom_purchase_order_list_SearchObj result count",searchResultCount);
                 customrecord_custom_purchase_order_list_SearchObj.run().each(function(result){
            
                        cust_doc_num = result.getValue('custrecord_document_number');
                        log.debug('cust_doc_num',cust_doc_num);
                        cust_created_by=result.getValue('custrecord_craeatedd_by_as');
                        log.debug('cust_created_by',cust_created_by);
                        cust_total_amt =result.getValue('custrecord_totall_amountt_as');
                        log.debug('cust_total_amt',cust_total_amt);
                        cust_vendor = result.getValue('custrecord111415');
                        log.debug('cust_vendor',cust_vendor);
                        cust_po_date = result.getValue('custrecord_po_date_ap');
                        log.debug('cust_po_date',cust_po_date);
                           
                          arr_List.push({
                            'cust_doc_num':cust_doc_num,
                            'cust_created_by':cust_created_by,
                            'cust_total_amt':cust_total_amt,
                            'cust_vendor':cust_vendor,
                            'cust_po_date':cust_po_date
            
                        });
                       return true;
                    });
                    log.debug('End of getInput Data');
                    
                    return arr_List;
            
                       
                
            }catch(e){
                log.debug('Error in getInput function',+e);
            }
        }

        /**
         * Executes when the map entry point is triggered and applies to each key/value pair.
         *
         * @param {MapSummary} context - Data collection containing the key/value pairs to process through the map stage
         * @since 2015.1
         */
        function map(context) {
            try {
                log.debug('In Map Stage', 'In Map Stage');
                var m_fileid = JSON.parse(context.value);
                log.debug('m_fileid', m_fileid);

                var m_cust_doc_num = m_fileid.cust_doc_num;
                log.debug('m_cust_doc_num', m_cust_doc_num);

                var m_cust_created_by = m_fileid.cust_created_by;
                log.debug('m_cust_created_by', m_cust_created_by);

                var m_cust_total_amt = m_fileid.cust_total_amt;
                log.debug('m_cust_total_amt', m_cust_total_amt);

                var m_cust_po_date = m_fileid.cust_po_date;
                log.debug('m_cust_po_date', m_cust_po_date);
     
                var m_cust_vendorName = m_fileid.cust_vendor;
                log.debug('vendorName',m_cust_vendorName );
                context.write({
                    key: m_cust_doc_num,
                    value: {
                        'm_cust_doc_num': m_cust_doc_num,
                        'm_cust_created_by': m_cust_created_by,
                        'm_cust_total_amt': m_cust_total_amt,
                        'm_cust_po_date': m_cust_po_date,
                        'm_cust_vendorName': m_cust_vendorName

                    }
                });
            } catch (e) {
                log.error('Error in map function', e);
            }

        }

        function reduce(context) {
            try {

                var contentArr = context.values;
                log.debug('In reduce stage', 'In reduce stage');
                log.debug('Key', context.key);
                log.debug('Values', context.values);


                for (var i = 0; i < contentArr.length; i++) {
                    var currRec = JSON.parse(context.values[i]);
                    log.debug('currRec', currRec);

                    var r_docNum = currRec['m_cust_doc_num'];
                    log.debug('r_docNum', r_docNum);
                    var r_createdby = currRec['m_cust_created_by'];
                    log.debug('r_createdby', r_createdby);
                    var r_totalAmount = currRec['m_cust_total_amt'];
                    log.debug('r_totalAmount', r_totalAmount);
                    var r_poDate = currRec['m_cust_po_date'];
                    log.debug('r_podate', r_poDate);
                    var cust_vendor = currRec['m_cust_vendorName'];
                    log.debug('cust_vendor', cust_vendor);



                }
                context.write({
                    key: context.key,
                    value: {
                        'cust_vendor':cust_vendor,
                        'r_docNum': r_docNum,
                        'r_createdby': r_createdby,
                        'r_totalAmount': r_totalAmount,
                        'r_poDate': r_poDate

                    }
                });

            } catch (e) {
                log.error('Error in reduce function' + e);
            }

        }






        /**
         * Executes when the summarize entry point is triggered and applies to the result set.
         *
         * @param {Summary} summary - Holds statistics regarding the execution of a map/reduce script
         * @since 2015.1
         */
        function summarize(summary) {
            var csvdata = 'Document Number,Date,Created by,total Amount,vendorname\r\n';
            var counter = 0;

            summary.output.iterator().each(function (key, value) {
                csvdata += value + '\r\n';
                log.debug('key', key);
                log.debug('value', value);
                counter++;
                return true;
            });

            var fileObj = file.create({
                name: 'asmit_pathak.csv',
                fileType: file.Type.CSV,
                contents: csvdata
            });
24051
            fileObj.folder = 24051;
            var fileId = fileObj.save();

            log.audit({
                title: 'Id of new file record',
                details: fileId
            });
    }

        return {
            getInputData: getInputData,
            map: map,
            reduce: reduce,
            summarize: summarize
        };

    });