/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/url','N/https'],

function(url,https) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {

    }

    function createCsvImportAp(){
    	try{
    		var redirectToSl = url.resolveScript({
    			scriptId: 'customscript_cht_bsl_sscsvfield_vikas',
    			deploymentId: 'customdeploy_cht_bsl_sscsvfield_vikas',
    			params: {'orderType': 'PO'},
    			returnExternalUrl: false
    		});
    		alert('redirectToSl: '+redirectToSl);
    		
    		var response = https.post({
    			url: redirectToSl
    		});
    		
    		if(response.body){
    			var fileId = response.body;
    		}
    		var viewOutput = url.resolveDomain({
    			hostType: url.HostType.APPLICATION
    		});
    		var download = window.open('https://'+viewOutput+fileId);
    		
    	}catch(e){
    		alert('Error in createCsvImportVC: '+e);
    	}
    }

    return {
        pageInit: pageInit,
        createCsvImportAp: createCsvImportAp
    };
    
});
