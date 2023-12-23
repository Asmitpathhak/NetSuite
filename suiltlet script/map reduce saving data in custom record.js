/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/file', 'N/log', 'N/search','N/record'],

    function (file, log, search,record) {

        function getInputData() {
            try {
                log.debug('Inside the getInputData');

                var fileId = '143259'; 
                var fileObj = file.load({
                    id: fileId
                });

                var csvContent = fileObj.getContents();
                log.debug('CSV Content:', csvContent);

                var arr_List = []; 

                var csvLines = csvContent.split('\n');
                for (var i = 1; i < csvLines.length; i++) { 
                    var line = csvLines[i].trim();
                    if (line) {
                        var columns = line.split(',');
                        var documentNumber = columns[0].trim();
                        var podate = columns[1].trim();
                        var vendorname = columns[2].trim();
                        var totalamount= columns[3].trim();
                        var CreatedBy = columns[4].trim();

                        arr_List.push({
                            'cust_created_by': CreatedBy,
                            'cust_vendor': vendorname,
                            'cust_doc_num': documentNumber,
                            'cust_total_amt': totalamount,
                            'cust_po_date':  podate
                           
                            
                        });
                    }
                }

                log.debug('Parsed CSV Data:', arr_List);
                log.debug('End of getInput Data');

                return arr_List;

            } catch (e) {
                log.error('Error in getInputData function', e);
            }
        }
        function map(context) {
            try {
                var row = JSON.parse(context.value);
                
                // Extract data from CSV row and create custom record
                var customRecord = record.create({
                    type: 'customrecord_pk_cht_customer_po_list',
                    
                    isDynamic: true
                });

                // Set field values on the custom record based on CSV data
                customRecord.setValue({
                    fieldId: 'custrecorddocnum_shaista',
                    value: row.column0
                });

                customRecord.setValue({
                    fieldId: 'custrecordpo_date_shaista',
                    value: row.column1
                });
                customRecord.setValue({
                    fieldId: 'custrecordvendor_name_shaista',
                    value: row.column2
                });
                customRecord.setValue({
                    fieldId: 'custrecordtotalamt_shaista',
                    value: row.column3
                });
                customRecord.setValue({
                    fieldId: 'custrecordcreatedby_shaista',
                    value: row.column4
                });

                // Add more fields as needed

                // Save the custom record
                var recordId = customRecord.save();

                log.debug({
                    title: 'Record Created',
                    details: 'Record ID: ' + recordId
                });
            } catch (e) {
                log.error({
                    title: 'Error Processing Record',
                    details: e
                });
            }
        
            
        }

        function reduce(context) {
            try {
            log.debug('Inside the Reduce Function');
                var fileId = '143259'; 
                var fileObj = file.load({
                    id: fileId
                });
                var csvContents = fileObj.getContents();

                // Parse CSV data (example assumes CSV has headers)
                var csvLines = csvContents.split('\n');
                var headers = csvLines[0].split(',');
                for (var i = 1; i < csvLines.length; i++) {
                    var values = csvLines[i].split(',');
                    var rowData = {};
                    for (var j = 0; j < headers.length; j++) {
                        rowData[headers[j]] = values[j];
                    }
                    // Log the parsed data
                    log.debug('CSV Data Row ' + i, rowData);
                }

            } catch (e) {
                log.error('Error in reduce', e);
            }
        }

        function summarize(summary) {
        }
        return {
            getInputData: getInputData,
            map: map,
            reduce: reduce,
            summarize: summarize
        };
    });
