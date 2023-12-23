/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/search', 'N/record', 'N/file', 'N/runtime', 'N/email'],

    function (search, record, file, runtime, email) {

        function getInputData() {
            try {
                var arr_List = [];
                var customrecord_po_list_vikasSearchObj = search.create({
                    type: "customrecord_po_list_vikas",
                    filters:
                        [
                            ["custrecord_po_created_by1", "anyof", "34877"]
                        ],
                    columns:
                        [
                            search.createColumn({
                                name: "scriptid",
                                sort: search.Sort.ASC,
                                label: "Script ID"
                            }),
                            search.createColumn({ name: "custrecord_po_name", label: "Vendor Name" }),
                            search.createColumn({ name: "custrecord_po_datee", label: "PO Date" }),
                            search.createColumn({ name: "custrecord_po_document_numb", label: "Document Number" }),
                            search.createColumn({ name: "custrecord_po_created_by1", label: "Created BY" }),
                            search.createColumn({ name: "custrecord_total_po_amount", label: "Total PO Amount" })
                        ]
                });
                var searchResultCount = customrecord_po_list_vikasSearchObj.runPaged().count;
                log.debug("customrecord_po_list_vikasSearchObj result count", searchResultCount);
                customrecord_po_list_vikasSearchObj.run().each(function (result) {
                    // .run().each has a limit of 4,000 results

                    /*
                    customrecord_po_list_vikasSearchObj.id="customsearch1700057438404";
                    customrecord_po_list_vikasSearchObj.title="Custom Purchase Order List vikas Search (copy)";
                    var newSearchId = customrecord_po_list_vikasSearchObj.save();
                    */



                    var cust_doc_num = result.getValue('custrecord_po_document_numb');
                    log.debug('cust_doc_num', cust_doc_num);
                    var cust_created_by = result.getValue('custrecord_po_created_by1');
                    log.debug('cust_created_by', cust_created_by);
                    var cust_total_amt = result.getValue('custrecord_total_po_amount');
                    log.debug('cust_total_amt', cust_total_amt);
                    var cust_vendor = result.getValue('custrecord_po_name');
                    log.debug('cust_vendor', cust_vendor);
                    var cust_po_date = result.getValue('custrecord_po_datee');
                    log.debug('cust_po_date', cust_po_date);



                    arr_List.push({
                        'cust_doc_num': cust_doc_num,
                        'cust_created_by': cust_created_by,
                        'cust_total_amt': cust_total_amt,
                        'cust_vendor': cust_vendor,
                        'cust_po_date': cust_po_date

                    });
                    return true;
                });
                log.debug('End of getInput Data');

                return arr_List;
                //return searchResultCount;


            } catch (e) {
                log.debug('Error in getInput function', +e);
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
                log.debug('vendorName',vendorName );
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
                name: 'vikas_chaudhary.csv',
                fileType: file.Type.CSV,
                contents: csvdata
            });

            fileObj.folder = 24051;
            var fileId = fileObj.save();

            log.audit({
                title: 'Id of new file record',
                details: fileId
            });

            // var author = 34878; // Replace with the actual internal ID of the user
            // log.debug('author', author);
            // var recipients = 'aditi2910rathore@gmail.com';
            // log.debug('recipients', recipients);
            // var subject = 'test email';
            // log.debug('subject', subject);
            // var body = csvdata;
            // log.debug('body', body);


        }

        return {
            getInputData: getInputData,
            map: map,
            reduce: reduce,
            summarize: summarize
        };

    });