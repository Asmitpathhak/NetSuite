/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/file', 'N/log','N/record'],

    function (file, log, record) {

        function getInputData() {
            try {
                log.debug('Inside the getInputData');

                var fileId = '142356'; 
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
                        var vendorname = columns[0].trim();
                        var documentNumber = columns[1].trim();
                        var CreatedBy = columns[2].trim();
                        var podate = columns[3].trim();
                        podate= new Date(podate);
                        var totalamount= columns[4].trim();

                        arr_List.push({
                            'column0': vendorname,
                            'column1': documentNumber,
                            'column2': CreatedBy,
                            'column3':  podate,
                            'column4': totalamount
                           
                            
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
                
                var customRecord = record.create({
                    type: 'customrecord_mapr_sav_data_of_po',
                    isDynamic: true
                });


                customRecord.setValue({
                    fieldId: 'custrecord_vendor_nameas',
                    value: row.column0
                });
               log.debug(row.column0);

                customRecord.setValue({
                    fieldId: 'custrecord_document_number_asm',
                    value: row.column1
                });
                log.debug(row.column1);

                customRecord.setValue({
                    fieldId: 'custrecord_created_by_as',
                    value: row.column2
                });
                
                log.debug(row.column2);
                customRecord.setValue({
                    fieldId: 'custrecord_date_as',
                    value: row.column3
                });
                log.debug(row.column3);

                customRecord.setValue({
                    fieldId: 'custrecord_total_amountas',
                    value: row.column4
                });
                log.debug(row.column4);
               
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
          
        }

        function summarize(summary) {
        }
        return {
            getInputData: getInputData,
            map: map,
            //reduce: reduce,
            summarize: summarize
        };
    });
