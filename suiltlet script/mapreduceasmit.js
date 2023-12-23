/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/search','N/record','N/file'],

function(search,record,file) {
   
    /**
     * Marks the beginning of the Map/Reduce process and generates input data.
     *
     * @typedef {Object} ObjectRef
     * @property {number} id - Internal ID of the record instance
     * @property {string} type - Record type id
     *
     * @return {Array|Object|Search|RecordRef} inputSummary
     * @since 2015.1
     */
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
    	try{

           // log.debug(context);

    		//log.debug('In Map Stage', 'In Map Stage');
    		var m_fileid = JSON.parse(context.value);
    		log.debug('m_fileid', m_fileid);
    		
    		var m_cust_doc_num = m_fileid.cust_doc_num;
    		log.debug('m_cust_doc_num',m_cust_doc_num);

            var m_cust_vendor =m_fileid.cust_vendor;
            log.debug('m_cust_vendor',m_cust_vendor);
            var m_cust_created_by = m_fileid.cust_created_by;
            log.debug('m_cust_created_by',m_cust_created_by);

            var m_cust_total_amt = m_fileid.cust_total_amt;
            log.debug('m_cust_total_amt',m_cust_total_amt);
            var m_cust_po_date = m_fileid. cust_po_date;
            log.debug('m_cust_po_date',m_cust_po_date);
    		
    		context.write({
				key : m_cust_doc_num,
				value : {
				'm_cust_doc_num' : m_cust_doc_num,
                    
                'cust_created_by':m_cust_created_by,
                'cust_total_amt':m_cust_total_amt,
                'cust_vendor':m_cust_vendor,
                'cust_po_date':m_cust_po_date

				}
		});
    	}catch(e){
    		log.error('Error in map function',e);
    	}

    }


    

    /**
     * Executes when the reduce entry point is triggered and applies to each group.
     *
     * @param {ReduceSummary} context - Data collection containing the groups to process through the reduce stage
     * @since 2015.1
     */
    function reduce(context) {

      log.debug('in reduce');
    	       try {
                 var contentArr = context.value;
                 var  get_PoDate,get_docnum ,get_createdBy ,get_totalamt,get_vendor= '';
                 var fileContent = '';
               
                 fileContent = fileHeader + '\r\n';
                 for (var i = 0; i < contentArr.length; i++) {
              
                    var Data = JSON.parse(contentArr[i]);
                    log.debug('Data', Data);

                    get_PoDate = Data.m_cust_po_date;
                    log.debug('get_PoDate2', get_PoDate2);

             

                    get_docnum = Data.m_cust_doc_num;
                    log.debug('get_docnum', get_docnum);

                    get_createdBy = Data.m_cust_created_by;
                    log.debug('get_createdBy', get_createdBy);
                    
                    get_totalamt = Data.m_cust_total_amt;
                    log.debug('get_totalamt', get_totalamt);
                    
                    get_vendor = Data.m_cust_vendor;
                    log.debug('get_vendor', get_vendor);

              
  var fileHeader = 'internal_ID,Date,Type,Doc_Num,Name,Memo,Total_Amount\r\n';
               fileHeader += podate + ',' + docnum+ ',' + createdby + ',' + totalamount + ',' + vendname ;
                    var fileContent = fileContent +get_PoDate+','+get_docnum+','+get_createdBy+','+get_totalamt+','+get_vendor
                 
                 }
                log.debug('fileContent',fileContent);

                 if(fileContent){
                    var d = new Date();
                    var month=d.getMonth()+1;
                    var date = d.getDate();
                    var year = d.getFullYear();
                    var fileName = 'purchase_order_details_asmit'+'_'+month+'_'+date+'_'+year;
                    var fileObj = file.create({
                        name: fileName+'.csv',
                        fileType: file.Type.CSV,
                        contents: fileHeader + '\r\n',
                        folder: 24049
                    });
            
                    var fileDownload = fileObj.save();
                    log.debug('fileDownload', fileDownload);
            
                    if (fileDownload) {
                        var fileObjURL = file.load({
                            id: fileDownload
                        });
                        var fileURL = fileObjURL.url;
                        log.debug('fileURL', fileURL);
                      context.response.write(fileURL.toString());
                    }
                 }
            }
            catch (error) {
                log.error('error come in reduce', error);
            }

    }



    


    /**
     * Executes when the summarize entry point is triggered and applies to the result set.
     *
     * @param {Summary} summary - Holds statistics regarding the execution of a map/reduce script
     * @since 2015.1
     */
    function summarize(summary) {

    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
       // summarize: summarize
    };
    
});