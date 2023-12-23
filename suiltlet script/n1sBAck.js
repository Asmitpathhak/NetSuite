/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/file', 'N/log', 'N/record', 'N/search'], 
function (file, log, record, search) {
    function onRequest(context) {
    	log.debug('in Backend SL');
      if (context.request.method === 'POST') {
        try {

//          var internalId = context.request.parameters.internalId; 
//          var type = context.request.parameters.type;
//          var docNum = context.request.parameters.docNum;
//          var name = context.request.parameters.name;
//          var memo = context.request.parameters.memo;
//          var amount = context.request.parameters.amount;
          
          var date = context.request.parameters.date;
          log.debug('date:',date);
  

          var folderId = 24045; 
          var csvFile = file.create({
            name: 'SavedSearchByHaarish.csv', 
            fileType: file.Type.CSV,
            folder: folderId,
            isOnline: true, // Set to true to make the file accessible onlinz
          });
  
          // Write file header
          var csvContent = 'Header1,Header2,Header3,Header4,Header5,Header6,Header7\r\n';
  
          // Use search.load to fetch data
          var customSearch = search.load({
            id: '', 
          });
  
          var searchResults = customSearch.run();
  
            searchResults.each(function (result) {
            // Retrieve values from the search result
            var column1 = result.getValue({
              name: 'column1', 
            });
            var column2 = result.getValue({
              name: 'column2', 
            });
            var column3 = result.getValue({
              name: 'column3', 
            });
            var column4 = result.getValue({
              name: 'column4', 
            });
            var column5 = result.getValue({
              name: 'column5', 
            });
            var column6 = result.getValue({
              name: 'column6', 
            });
            var column7 = result.getValue({
              name: 'column7', 
            });
  
            // Append values to the CSV content
            // csvContent += `${column1},${column2},${column3},${column4},${column5},${column6},${column7}\r\n`;
  
            return true; // Continue to the next result
          });
  
          // Set contents of the CSV file
          csvFile.contents = csvContent;
  
          // Save the CSV file
          var fileId = csvFile.save();
  
          // Create a new document record in NetSuite
          var documentRecord = record.create({
            type: record.Type.FILE,
            isDynamic: true,
          });
  
          documentRecord.setValue({
            fieldId: 'folder',
            value: folderId,
          });
          documentRecord.setValue({
            fieldId: 'name',
            value: 'Your Document Name', // Specify the desired document name
          });
          documentRecord.setValue({
            fieldId: 'file',
            value: fileId,
          });
  
          var documentId = documentRecord.save();
  
          log.debug({
            title: 'Document Created',
            details: 'Document ID: ' + documentId,
          });
  
          context.response.write('Document Created Successfully');
        } catch (error) {
          log.error({
            title: 'Error Creating Document',
            details: error.toString(),
          });
          context.response.write('Error Creating Document');
        }
      } else {
        context.response.write('Unsupported HTTP Method');
      }
    }
  
    return {
      onRequest: onRequest,
    };
  });
  