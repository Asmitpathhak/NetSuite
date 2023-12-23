/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(["N/currentRecord", "N/url",'N/https'], /**
 * @param {currentRecord,url} currentRecord
 */ function (currentRecord, url,https) {
  /**
   * Function to be executed after page is initialized.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
   *
   * @since 2015.2
   */
  function pageInit(scriptContext) {}

  /**
   * Function to be executed when field is changed.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @param {string} scriptContext.sublistId - Sublist name
   * @param {string} scriptContext.fieldId - Field name
   * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
   * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
   *
   * @since 2015.2
   */
  function fieldChanged(scriptContext) {}

  /**
   * Function to be executed when field is slaved.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @param {string} scriptContext.sublistId - Sublist name
   * @param {string} scriptContext.fieldId - Field name
   *
   * @since 2015.2
   */
  function postSourcing(scriptContext) {}

  /**
   * Function to be executed after sublist is inserted, removed, or edited.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @param {string} scriptContext.sublistId - Sublist name
   *
   * @since 2015.2
   */
  function sublistChanged(scriptContext) {}

  /**
   * Function to be executed after line is selected.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @param {string} scriptContext.sublistId - Sublist name
   *
   * @since 2015.2
   */
  function lineInit(scriptContext) {}

  /**
   * Validation function to be executed when field is changed.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @param {string} scriptContext.sublistId - Sublist name
   * @param {string} scriptContext.fieldId - Field name
   * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
   * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
   *
   * @returns {boolean} Return true if field is valid
   *
   * @since 2015.2
   */
  function validateField(scriptContext) {}

  /**
   * Validation function to be executed when sublist line is committed.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @param {string} scriptContext.sublistId - Sublist name
   *
   * @returns {boolean} Return true if sublist line is valid
   *
   * @since 2015.2
   */
  function validateLine(scriptContext) {}

  /**
   * Validation function to be executed when sublist line is inserted.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @param {string} scriptContext.sublistId - Sublist name
   *
   * @returns {boolean} Return true if sublist line is valid
   *
   * @since 2015.2
   */
  function validateInsert(scriptContext) {}

  /**
   * Validation function to be executed when record is deleted.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @param {string} scriptContext.sublistId - Sublist name
   *
   * @returns {boolean} Return true if sublist line is valid
   *
   * @since 2015.2
   */
  function validateDelete(scriptContext) {}

  /**
   * Validation function to be executed when record is saved.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @returns {boolean} Return true if record is valid
   *
   * @since 2015.2
   */
  function saveRecord(scriptContext) {}

  // function createCsvImport() {

  //     alert('Client script is working');

  //     try {
  //         var suiteRecord = currentRecord.get();
  //         var lineCount = suiteRecord.getLineCount({
  //             sublistId: 'custpage_hello'
  //         });

  //         if (lineCount != '0') {

  //             // Add additional code.

  //             var Internal_id_url = suiteRecord.getValue({
  //                 fieldId: 'internalid_hk'
  //             });
  //             console.log('Internal_id_url=' , Internal_id_url);
  //             console.log('internalid_hk=' , internalid_hk);

  //             // alert('Internal_id_url=' + Internal_id_url);

  //             // var Date_url = suiteRecord.getValue({
  //             //     fieldId: 'custpage_date'
  //             // });
  //             // console.log('Date_url'+ Date_url);

  //             // var Type_url = suiteRecord.getValue({
  //             //     fieldId: 'custpage_type'
  //             // });
  //             // console.log('Type_url'+ Type_url);

  //             // var Doc_Num_url = suiteRecord.getValue({
  //             //     fieldId: 'custpage_docnum'
  //             // });
  //             // console.log('Doc_Num_url'+ Doc_Num_url);

  //             // var Name_url = suiteRecord.getValue({
  //             //     fieldId: 'custpage_name'
  //             // });
  //             // console.log('Name_url'+ Name_url);

  //             // var Memo_url = suiteRecord.getValue({
  //             //     fieldId: 'custpage_memo'
  //             // });
  //             // console.log('Memo_url'+ Memo_url);

  //             // var Amount_url = suiteRecord.getValue({
  //             //     fieldId: 'custpage_amount'
  //             // });
  //             // console.log('Amount_url'+ Amount_url);

  //         }

  //     } catch (error) {
  //         alert('error in create csv file', error);
  //     }

  // }
  function createCsvImport() {
    alert("Client script is working");

    try {
      var suiteRecord = currentRecord.get();
      /*
      var lineCount = suiteRecord.getLineCount({
        sublistId: "custpage_hello",
      });

      for (var i = 0; i < lineCount; i++) {
        // Retrieve values for each line
        var internalid_hk = suiteRecord.getSublistValue({
          sublistId: "custpage_hello",
          fieldId: "custpage_internal_id",
          line: i,
        });
        var date_hk = suiteRecord.getSublistValue({
          sublistId: "custpage_hello",
          fieldId: "custpage_date",
          line: i,
        });
        var type_hk = suiteRecord.getSublistValue({
          sublistId: "custpage_hello",
          fieldId: "custpage_type",
          line: i,
        });
        var docnum_hk = suiteRecord.getSublistValue({
          sublistId: "custpage_hello",
          fieldId: "custpage_docnum",
          line: i,
        });
        var name_hk = suiteRecord.getSublistValue({
          sublistId: "custpage_hello",
          fieldId: "custpage_name",
          line: i,
        });
        var memo_hk = suiteRecord.getSublistValue({
          sublistId: "custpage_hello",
          fieldId: "custpage_memo",
          line: i,
        });
        var amount_hk = suiteRecord.getSublistValue({
          sublistId: "custpage_hello",
          fieldId: "custpage_amount",
          line: i,
        });

        alert("internalid_hk="+internalid_hk);
        console.log("internalid_hk=", internalid_hk);
        console.log("date_hk=", date_hk);
        console.log("type_hk=", type_hk);
        console.log("docnum_hk=", docnum_hk);
        console.log("name_hk=", name_hk);
        console.log("memo_hk=", memo_hk);
        console.log("amount_hk=", amount_hk);

       
      }
*/
      var confirmmess = confirm("Do you want to create Csv File?");
      if(confirmmess)
      {

        var backendSuiteletUrl = url.resolveScript({
            scriptId: "customscriptcht_backend_sl_savedsearch",
            deploymentId: "customdeploy_backend_sl_savedsearch",
            params: {
              "date": "10/26/2023"
            	  },
          });
        
        alert("backendSuiteletUrl: "+backendSuiteletUrl);
          var response = https.post({
            url: backendSuiteletUrl,
          });
       
          if (response.body) {
            var fileID = response.body;
          }
          alert(fileID);
          var output = url.resolveDomain({
            hostType: url.HostType.APPLICATION,
          });
          var downlaod = window.open('https://'+output+fileID);

      }
    //   return false;
    } catch (error) {
      alert("error in create csv file"+error);
    }
  }

  return {
    pageInit: pageInit,
    createCsvImport: createCsvImport,
    // fieldChanged: fieldChanged,
    // postSourcing: postSourcing,
    // sublistChanged: sublistChanged,
    // lineInit: lineInit,
    // validateField: validateField,
    // validateLine: validateLine,
    // validateInsert: validateInsert,
    // validateDelete: validateDelete,
    // saveRecord: saveRecord
  };
});