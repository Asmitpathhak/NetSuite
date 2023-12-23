/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget', 'N/record','N/search','N/file'],

		function (serverWidget, record,search,file) {
   
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
    		log.debug('In Backend Suitelet');
    		if(context.request.method == 'POST'){
    			var orderType = context.request.parameters.orderType;
    			log.debug('orderType: ',orderType);
                //Create a Search
            //     var savedSearch = search.load({
            //         id: 'customsearch_vikas_saved_search'
            //       });
            //       var searchResults = savedSearch.run();

            //       //var csvData = formatSearchResultsToCSV(searchResults);
  
            //     // Create and save CSV file
            //     var file = file.create({
            //     name: 'exported_data.csv',
            //     fileType: file.Type.CSV,
            //     contents: csvData,
            //     folder: 24051
            //     });
            //     var fileId = file.save();
            
            //     // Log or handle the file ID as needed
            //     log.debug('CSV File ID', fileId);
            // }
            // //function formatSearchResultsToCSV(searchResults) {
                            
            //     var csvData = ''; // Initialize the CSV data string
            
            //     // Get the columns of the search
            //     var columns = searchResults.columns;
            
            //     // Add header row with column names
            //     for (var i = 0; i < columns.length; i++) {
            //     csvData += '"' + columns[i].label + '",';
            //     }
            //     csvData = csvData.slice(0, -1); // Remove the trailing comma
            //     csvData += '\n';
            
            //     // Loop through the search results
            //     searchResults.each(function(result) {
            //     for (var i = 0; i < columns.length; i++) {
            //         var value = result.getValue(columns[i]);
            
            //         // Handle special characters and enclose values in double quotes
            //         if (typeof value === 'string') {
            //         value = value.replace(/"/g, '""'); // Double up double quotes
            //         value = '"' + value + '"';
            //         }
            
            //         csvData += value + ',';
            //     }
            //     csvData = csvData.slice(0, -1); // Remove the trailing comma
            //     csvData += '\n';
            //     return true;
            //     });
            //return csvData;
    			//Concatenate the Value from Search
    			//Create a CSV File
    			//Save the File
               // 	//Pass the value to client script

                     var savedSearch = search.load({
                        id: 'customsearch_saved_search_for_sl_asmitp'
                      });
                      var searchResults = savedSearch.run();


                      var csvData = ''; // Initialize the CSV data string
            
                      //     // Get the columns of the search
                          var columns = searchResults.columns;
                      
                          // Add header row with column names
                          for (var i = 0; i < columns.length; i++) {
                          csvData += '"' + columns[i].label + '",';
                          }
                          csvData = csvData.slice(0, -1); // Remove the trailing comma
                          csvData += '\n';
                      
                          // Loop through the search results
                          searchResults.each(function(result) {
                          for (var i = 0; i < columns.length; i++) {
                              var value = result.getValue(columns[i]);
                      
                              // Handle special characters and enclose values in double quotes
                              if (typeof value === 'string') {
                              value = value.replace(/"/g, '""'); // Double up double quotes
                              value = '"' + value + '"';
                              }
                      
                              csvData += value + ',';
                          }
                          csvData = csvData.slice(0, -1); // Remove the trailing comma
                          csvData += '\n';
                          return true;
                          });
    
    			var d = new Date();
    			var month = d.getMonth()+1;
    			var date = d.getDate();
    			var year = d.getFullYear();
    			var fileName = 'Asmit Pathak_'+month+'_'+date+'_'+year;
    			var fileObj = file.create({
    				name: fileName+'.csv',
    				fileType: file.Type.CSV,
    				contents: csvData,
    				folder: 24049
    			});
    			var fileDownload = fileObj.save();
    			log.debug('fileDownload',fileDownload);
    			
    			if(fileDownload){
    				var fileObjURL = file.load({
    					id: fileDownload
    				});
    				var fileURL = fileObjURL.url;
    				log.debug('fileURL',fileURL);
    				
    				context.response.writeLine({output: fileURL.toString()});
    			}
    	     }
    		
    	}catch(e){
    		log.error('Error in backend Suitelet: ',e);
    	}
    }

    return {
        onRequest: onRequest,
        
    };
    
});