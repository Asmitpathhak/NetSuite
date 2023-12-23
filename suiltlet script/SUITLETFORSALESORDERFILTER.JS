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
                title : 'sales order by as'
            });

            if(request.method == 'GET'){
                log.debug('IN GET METHOD');

                var FromDate = form.addField({
                    id: 'custpage_applicant_fromdate_as',
                    type: serverWidget.FieldType.DATE,
                    label: 'FromDate'
                });
                FromDate.isMandatory = true;

                var ToDate = form.addField({
                    id: 'custpage_applicant_tilldate_as',
                    type: serverWidget.FieldType.DATE,
                    label: 'ToDate'
                });
                ToDate.isMandatory = true;

                
    var SavedSarchAS = form.addSublist({
        id : 'custpage_saved_search_as',
       type : serverWidget.SublistType.INLINEEDITOR,
       label : 'SalesOrder'
        });
      SavedSarchAS.addField({
       id: 'custpage_savedsearch_internalid_as',
     type: serverWidget.FieldType.INTEGER,
     label: 'DocumentNumber',
                           });
      SavedSarchAS.addField({
     id: 'custpage_savedsearch_date_as',
      type: serverWidget.FieldType.DATE,
      label: 'Date',
                           });
      SavedSarchAS.addField({
      id: 'custpage_savedsearch_amount_as',
     type: serverWidget.FieldType.INTEGER,
     label: 'Amount',
                         });
   SavedSarchAS.addField({
   id: 'custpage_savedsearch_name_as',
   type: serverWidget.FieldType.TEXT,
   label: 'Name',
                     });

/////////////////////////////////////////////////////////

        var salesorderSearchObj = search.create({
       type: "salesorder",
       filters:
       [
          ["mainline","is","T"], 
         "AND", 
         ["trandate","within",FromDate,ToDate], 
         "AND", 
         ["type","anyof","SalesOrd"]
      ],
       columns:
       [
         search.createColumn({name: "tranid", label: "Document Number"}),
         search.createColumn({name: "trandate", label: "Date"}),
         search.createColumn({name: "amount", label: "Amount"}),
         search.createColumn({name: "entity", label: "Name"})
      ]
          });
        var searchResultCount = salesorderSearchObj.runPaged().count;
        log.debug("salesorderSearchObj result count",searchResultCount);
        salesorderSearchObj.run().each(function(result){
    // .run().each has a limit of 4,000 results



           var id_ap = result.getValue('tranid');
           log.debug('id_ap',id_ap); 
            var date_ap = result.getValue('trandate');
            log.debug('date_ap',date_ap);
            var amount_ap = result.getValue('amount');
            log.debug('amount_ap',amount_ap);
            var name_ap = result.getValue('entity');
            log.debug('name_ap',name_ap);

              SavedSarchAS.setSublistValue({
                        id : 'custpage_savedsearch_internalid_as',
                        line : lineCount,
                        value : id_ap
                    });
                    SavedSarchAS.setSublistValue({
                        id : 'custpage_savedsearch_date_as',
                        line : lineCount,
                        value : date_ap
                    });
                    SavedSarchAS.setSublistValue({
                        id : 'custpage_savedsearch_amount_as',
                        line : lineCount,
                        value : amount_ap
                    });
                    SavedSarchAS.setSublistValue({
                        id : 'custpage_savedsearch_name_as',
                        line : lineCount,
                        value : name_ap
                    });




          return true;});
///sublist for sales order
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