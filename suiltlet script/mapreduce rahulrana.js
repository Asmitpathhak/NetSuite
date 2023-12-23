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
            try {
               var get_dataArr = [];
                var salesorderSearchObj = search.create({
                    type: "salesorder",
                    filters:
                        [
                            ["type", "anyof", "SalesOrd"],
                            "AND",
                            ["trandate", "within", "10/10/2023", "10/11/2023"],
                            "AND",
                            ["mainline", "is", "T"],
                            "AND",
                            ["memo", "startswith", "Rahul"]
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

                var searchResultCount = salesorderSearchObj.runPaged().count;
                log.debug("salesorderSearchObj result count", searchResultCount);
                salesorderSearchObj.run().each(function (result) {
                    // .run().each has a limit of 4,000 results
                   

                /*
                salesorderSearchObj.id="customsearch1700032973280";
                salesorderSearchObj.title="Saved_Search_Rahul_Rana_ui (copy)";
                var newSearchId = salesorderSearchObj.save();
                */
                   var get_internalID = result.getValue('internalid');
                    var get_tranDate = result.getValue('trandate');
                    var get_Type = result.getValue('type');
                    var get_tranId = result.getValue('tranid');
                    var get_tranName = result.getValue('entity');
                    var get_tranMemo = result.getValue('memo');
                    var get_tranAmt = result.getValue('amount');
                    //var get_dataArr = [];
                    get_dataArr.push({
                        'get_internalID': get_internalID,
                        'get_tranDate': get_tranDate,
                        'get_Type': get_Type,
                        'get_tranId': get_tranId,
                        'get_tranName': get_tranName,
                        'get_tranMemo': get_tranMemo,
                        'get_tranAmt': get_tranAmt
                    });
                    return true;
                });
                return get_dataArr;
            }
            catch (err) {
                log.error('error come in get_dataArr', err);
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
                var DataObj = JSON.parse(context.value);

                var get_internalID1 = DataObj.get_internalID;
                log.debug('get_internalID1', get_internalID1);

                var get_tranDate1 = DataObj.get_tranDate;
                log.debug('get_tranDate1', get_tranDate1);

                var get_Type1 = DataObj.get_Type;
                log.debug('get_Type1', get_Type1);

                var get_tranId1 = DataObj.get_tranId;
                log.debug('get_tranId1', get_tranId1);

                var get_tranName1 = DataObj.get_tranName;
                log.debug('get_tranName1', get_tranName1);

                var get_tranMemo1 = DataObj.get_tranMemo;
                log.debug('get_tranMemo1', get_tranMemo1);

                var get_tranAmt1 = DataObj.get_tranAmt;
                log.debug('get_tranAmt1', get_tranAmt1);

                // if (get_internalID1 && get_tranDate1 && get_Type1 && get_tranId1 && get_tranName1 && get_tranMemo1 && get_tranAmt1) {
                    context.write({
                        key: get_tranId1,
                        value: {
                            'get_internalID1': get_internalID1,
                            'get_tranDate1': get_tranDate1,
                            'get_Type1': get_Type1,
                            'get_tranId1': get_tranId1,
                            'get_tranName1': get_tranName1,
                            'get_tranMemo1': get_tranMemo1,
                            'get_tranAmt1': get_tranAmt1
                        }
                    });

                // }
            }
            catch (error) {
                log.error('error come in map', error);
            }

        }

        /**
         * Executes when the reduce entry point is triggered and applies to each group.
         *
         * @param {ReduceSummary} context - Data collection containing the groups to process through the reduce stage
         * @since 2015.1
         */
        function reduce(context) {
            try {
                 var contentArr = context.value;
                 var  get_PoDate,get_docnum ,get_createdBy ,get_totalamt,get_vendor= '';
                 var fileContent = '';
               
                 fileContent = fileHeader + '\r\n';
                 for (var i = 0; i < contentArr.length; i++) {
              
                    var DataObj2 = JSON.parse(contentArr[i]);
                    log.debug('DataObj2', DataObj2);

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
                    var fileContent = fileContent +get_PoDate+','+get_docnum+','+get_createdBy+','+get_totalamt+','+get_vendor;
                 
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
            summarize: summarize
            
        };

    });