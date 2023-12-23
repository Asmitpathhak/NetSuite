/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget','N/search'],

		function(serverWidget, search) {

	/**
	 * Definition of the Suitelet script trigger point.
	 *
	 * @param {Object} context
	 * @param {ServerRequest} context.request - Encapsulation of the incoming request
	 * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
	 * @Since 2015.2
	 */
	function onRequest(context) {
		try{
			var request = context.request;
			var response = context.response;

			var form = serverWidget.createForm({
				title : 'Saved Search fields by Vikas And Exporting DATA'
			});

			if(request.method == 'GET'){
				log.debug('IN GET METHOD');

                var savedSearchVik = form.addSublist({
					id : 'custpage_ss_vc',
					type : serverWidget.SublistType.INLINEEDITOR,
					label : 'Saved Search'
				});
                savedSearchVik.addField({
                    id: 'custpage_ss_internalid_vc',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'INTERNAL ID',
                });

                savedSearchVik.addField({
                    id: 'custpage_ss_date_vc',
                    type: serverWidget.FieldType.DATE,
                    label: 'DATE',
                });

                savedSearchVik.addField({
                    id: 'custpage_ss_type_vc',
                    type: serverWidget.FieldType.TEXT,
                    label: 'TYPE',
                });

                savedSearchVik.addField({
                    id: 'custpage_ss_doctype_vc',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'DOCUMENT TYPE',
                });

                savedSearchVik.addField({
                    id: 'custpage_ss_name_vc',
                    type: serverWidget.FieldType.TEXT,
                    label: 'NAME',
                });

                savedSearchVik.addField({
                    id: 'custpage_ss_memo_vc',
                    type: serverWidget.FieldType.TEXT,
                    label: 'MEMO',
                });

                savedSearchVik.addField({
                    id: 'custpage_ss_amount_vc',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'AMOUNT',
                });

                var salesorderSearchObj = search.create({
                    type: "salesorder",
                    filters:
                    [
                        ["trandate","within","10/10/2023","03/11/2023"], 
                        "AND", 
                        ["type","anyof","SalesOrd"], 
                        "AND", 
                        ["mainline","is","T"], 
                        "AND", 
                        ["memo","startswith","vikas"]
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
                var searchResultCount = salesorderSearchObj.runPaged().count;
                log.debug("salesorderSearchObj result count",searchResultCount);
                salesorderSearchObj.run().each(function(result){
                lineCount++;
                // .run().each has a limit of 4,000 results
                var internalid_vik = result.getValue('internalid');
                log.debug('internalid_vik',internalid_vik); 
                var trandate_vik = result.getValue('trandate');
                log.debug('trandate_vik',trandate_vik); 
                var type_vik = result.getValue('type');
                log.debug('type_vik',type_vik); 
                var tranid_vik = result.getValue('tranid');
                log.debug('tranid_vik',tranid_vik); 
                var entity_vik = result.getValue('entity');
                log.debug('entity_vik',entity_vik); 
                var Memo_vik = result.getValue('memo');
                log.debug('Memo_vik',Memo_vik); 
                var Amount_vik = result.getValue('amount');
                log.debug('Amount_vik',Amount_vik); 

                savedSearchVik.setSublistValue({
                    id : 'custpage_ss_internalid_vc',
                    line : lineCount,
                    value : internalid_vik
                });
                savedSearchVik.setSublistValue({
                    id : 'custpage_ss_date_vc',
                    line : lineCount,
                    value : trandate_vik
                });
                savedSearchVik.setSublistValue({
                    id : 'custpage_ss_type_vc',
                    line : lineCount,
                    value : type_vik
                });
                savedSearchVik.setSublistValue({
                    id : 'custpage_ss_doctype_vc',
                    line : lineCount,
                    value : tranid_vik
                });
                savedSearchVik.setSublistValue({
                    id : 'custpage_ss_name_vc',
                    line : lineCount,
                    value : entity_vik
                });
                savedSearchVik.setSublistValue({
                    id : 'custpage_ss_memo_vc',
                    line : lineCount,
                    value : Memo_vik
                    
                });
                
                savedSearchVik.setSublistValue({
                    id : 'custpage_ss_amount_vc',
                    line : lineCount,
                    value : Amount_vik
                });


                return true;
                });

                form.clientScriptModulePath = "./CHT_CL_ssCSVField_vikas.js";
                

                /*
                salesorderSearchObj.id="customsearch1699199736786";
                salesorderSearchObj.title="Vikas Saved Search (copy)";
                var newSearchId = salesorderSearchObj.save();
*/

                form.addSubmitButton({
                    label: 'Submit'
                });

                form.addButton({
                    id : 'custpage_export_button',
                    label: 'Export to CSV',
                    functionName: 'createCsvImportVC',
                });



                response.writePage(form);
            }
            else {

                context.response.write('saved search displayed successfully.');
            }
		}catch(e){
			log.error('Error in Script:',e);
		}
	}

	return {
		onRequest: onRequest
	};

});