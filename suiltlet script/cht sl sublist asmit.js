/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'], (serverWidget) => {
    const onRequest = (scriptContext) => {
        if (scriptContext.request.method === 'GET') {
            let form = serverWidget.createForm({
                title: 'Sublist Form'
            });

           

            let sublist = form.addSublist({
                id: 'custpage_sublist',
                type: serverWidget.SublistType.INLINEEDITOR,
                label: 'Inline Editor Sublist'
            });
            sublist.addField({
                id: 'custpage_sublist_ap1',
                type: serverWidget.FieldType.TEXT,
                label: 'Item',
                source: 'customlist_item_list'
            });
            sublist.addField({
                id: 'custpage_sublist_ap2',
                type: serverWidget.FieldType.INTEGER,
                label: 'Quantity'
            });
          sublist.addField({
                id: 'custpage_sublist_ap3',
                type: serverWidget.FieldType.FLOAT,
                label: 'Rate'
            });
          sublist.addField({
                id: 'custpage_sublist4_ap4',
                type: serverWidget.FieldType.INTEGER,
                label: 'Total Amount'
            });
           form.addResetButton({
                label: 'Reset'
            });
            form.addSubmitButton({
                label: 'Submit Button'
            });




            scriptContext.response.writePage(form);
        } else {
          
           
        }
    }

    return {onRequest}
});