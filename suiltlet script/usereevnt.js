/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget','N/record'],

function(serverWidget,record) {
   
    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     * @Since 2015.2
     */
    function beforeLoad(scriptContext) {
    	// try{
    	// 	log.debug('scriptContext.type:',scriptContext.type);
    		
    	// 	//if(scriptContext.type == 'view'){
    			
    	// 		var objRecord = record.transform({
        //         fromType: record.Type.SALES_ORDER,
        //         fromId: 107,
        //         toType: record.Type.INVOICE,
        //         isDynamic: true,
        //     });
    	// 	log.debug('objRecord',objRecord)
    	// }catch(err){
    	// 	log.error("Error in beforeLoad function",err);
    	// }
    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(scriptContext) {
        // try{
    	// 	log.debug('scriptContext.type:',scriptContext.type);
    		
    	// 	//if(scriptContext.type == 'view'){
    			
    	// 		var objRecord = record.transform({
        //         fromType: record.Type.SALES_ORDER,
        //         fromId: 107,
        //         toType: record.Type.INVOICE,
        //         isDynamic: true,
        //     });
    	// 	log.debug('objRecord',objRecord)
    	// }catch(err){
    	// 	log.error("Error in beforeLoad function",err);
    	// }

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function afterSubmit(scriptContext) {

          try {
                if (scriptContext.type === scriptContext.UserEventType.CREATE || scriptContext.type === scriptContext.UserEventType.EDIT) {
                    // Load the Item Fulfillment record
                    var itemFulfillmentRecord = record.load({
                        type: record.Type.SALES_ORDER,
                        id: scriptContext.newRecord.id,
                        isDynamic: true
                    });
//scriptContext.newRecord.id
                    log.debug('itemFulfillmentRecord',itemFulfillmentRecord);
                    var invoiceRecordId = record.transform({
                        fromType: record.Type.SALES_ORDER,
                        fromId: scriptContext.newRecord.id,
                        toType: record.Type.ITEM_FULFILLMENT,
                        isDynamic: true
                    }).save();
                    // Create the Invoice record based on the Item Fulfillment
                    var invoiceRecordId = record.transform({
                        fromType: record.Type.ITEM_FULFILLMENT,
                        fromId: scriptContext.newRecord.id,
                        toType: record.Type.INVOICE,
                        isDynamic: true
                    }).save();

                    log.debug({
                        title: 'Invoice Created',
                        details: 'Invoice ID: ' + invoiceRecordId
                    });
                }
            } catch (e) {
                log.error({
                    title: 'Error',
                    details: e
                });
            }


      

    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});