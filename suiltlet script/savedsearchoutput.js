/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget','N/search'],

		function(serverWidget,search) {

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
				title : 'Saved Search by as'
			});

			if(request.method == 'GET'){
				log.debug('IN GET METHOD');

                var SavedSarchAS = form.addSublist({
					id : 'custpage_saved_search_as',
					type : serverWidget.SublistType.INLINEEDITOR,
					label : 'Saved Search'
				});
                SavedSarchAS.addField({
                    id: 'custpage_savedsearch_internalid_as',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'INTERNAL ID',
                });

                SavedSarchAS.addField({
                    id: 'custpage_savedsearch_date_as',
                    type: serverWidget.FieldType.DATE,
                    label: 'DATE',
                });

                SavedSarchAS.addField({
                    id: 'custpage_savedsearch_type_as',
                    type: serverWidget.FieldType.TEXT,
                    label: 'TYPE',
                });

                SavedSarchAS.addField({
                    id: 'custpage_savedsearch_doctype_as',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'DOCUMENT TYPE',
                });

                SavedSarchAS.addField({
                    id: 'custpage_savedsearch_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'NAME',
                });

                SavedSarchAS.addField({
                    id: 'custpage_savedsearch_memo',
                    type: serverWidget.FieldType.TEXT,
                    label: 'MEMO',
                });

                SavedSarchAS.addField({
                    id: 'custpage_savedsearch_amount',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'AMOUNT',
                });


           //=====================================================================

           var purchaseorderSearchObj = search.create({
            type: "purchaseorder",
            filters:
                [
                    ["trandate", "within", "10/26/2023", "10/31/2023"],
                    "AND",
                    ["type", "anyof", "PurchOrd"],
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
            var internalid_ap = result.getValue('internalid');
            log.debug('internalid_ap',internalid_ap); 
            var trandate_ap = result.getValue('trandate');
             // var newdate =new Date(trandate_ap);   
            log.debug('trandate_ap',trandate_ap); 
            var type_ap = result.getValue('type');
            log.debug('type_ap',type_ap); 
            var tranid_ap = result.getValue('tranid');
            log.debug('tranid_ap',tranid_ap); 
            var entity_ap = result.getValue('entity');
            log.debug('entity_ap',entity_ap); 
            var Memo_ap = result.getValue('memo');
            log.debug('Memo_ap',Memo_ap); 
            var Amount_ap = result.getValue('amount');
            log.debug('Amount_ap',Amount_ap); 

            SavedSarchAS.setSublistValue({
                id : 'custpage_savedsearch_internalid_as',
                line : lineCount,
                value : internalid_ap
            });
            SavedSarchAS.setSublistValue({
                id : 'custpage_savedsearch_date_as',
                line : lineCount,
                value : trandate_ap
            });
            SavedSarchAS.setSublistValue({
                id : 'custpage_savedsearch_type_as',
                line : lineCount,
                value : type_ap
            });
            SavedSarchAS.setSublistValue({
                id : 'custpage_savedsearch_doctype_as',
                line : lineCount,
                value : tranid_ap
            });
            SavedSarchAS.setSublistValue({
                id : 'custpage_savedsearch_name',
                line : lineCount,
                value : entity_ap
            });
            SavedSarchAS.setSublistValue({
                id : 'custpage_savedsearch_memo',
                line : lineCount,
                value : Memo_ap
            });
            SavedSarchAS.setSublistValue({
                id : 'custpage_savedsearch_amount',
                line : lineCount,
                value : Amount_ap
            });



            return true;
        });

        form.addResetButton({
					label : 'Reset'
				});

				form.addSubmitButton({
					label : 'Submit'
				});
     response.writePage(form);

         }else{
				log.debug('IN POST METHOD');

                
				response.write('<body>Your Response has been noted.</body>');

			}
		}catch(e){
			log.error('Error in Script:',e);
		}
	}

	return {
		onRequest: onRequest
	};

});