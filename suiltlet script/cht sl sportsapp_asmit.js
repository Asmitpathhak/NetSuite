/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget'],

		function(serverWidget) {

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
				title : 'Sports Application Form Vikas'
			});

			if(request.method == 'GET'){
				log.debug('IN GET METHOD');

				var appliName = form.addField({
					id : 'custpage_applicant_name',
					type : serverWidget.FieldType.TEXT,
					label : 'Applicant Name'
				});
                appliName.isMandatory = true;
				var isMandatory = appliName.isMandatory;

                var appliEmail = form.addField({
					id : 'custpage_applicant_email',
					type : serverWidget.FieldType.EMAIL,
					label : 'Email'
				});
                appliEmail.isMandatory = true;
				var isMandatory = appliEmail.isMandatory;
                
                    var appliPhone = form.addField({
					id : 'custpage_applicant_phone',
					type : serverWidget.FieldType.PHONE,
					label : 'Phone'
				});
                
                    var appliDOB = form.addField({
					id : 'custpage_applicant_DOB',
					type : serverWidget.FieldType.DATE,
					label : 'DOB'
				});
                appliDOB.isMandatory = true;
				var isMandatory = appliDOB.isMandatory;

                
                    var appliAOI = form.addField({
					id : 'custpage_applicant_AOI',
					type : serverWidget.FieldType.TEXTAREA,
					label : 'Applicant Name'
				});
                appliAOI.isMandatory = true;
				var isMandatory = appliAOI.isMandatory;
                
                    var appliAge = form.addField({
					id : 'custpage_applicant_Age',
					type : serverWidget.FieldType.INTEGER,
					label : 'Age'
				});
                appliAge.isMandatory = true;
				var isMandatory = appliAge.isMandatory;

				var appliNew = form.addField({
					id : 'custpage_applicant_New',
					type : serverWidget.FieldType.CHECKBOX,
					label : 'Are you a new Applicant?'
				});
                appliNew.isMandatory = true;
				var isMandatory = appliNew.isMandatory;


				form.addSubmitButton({
					label : 'Submit Button'
				});

				response.writePage(form);
			}
            //post method =====================================================
            else{
				log.debug('IN POST METHOD');

				var p_appliName= request.parameters.custpage_applicant_name;
				log.debug('p_appliName',p_appliName);

				var p_appliEmail= request.parameters.custpage_applicant_email;
				log.debug('p_appliEmail',p_appliEmail);

                var p_appliPhone= request.parameters.custpage_applicant_phone;
				log.debug('appliPhone',p_appliPhone);

                var p_appliDOB= request.parameters.custpage_applicant_DOB;
				log.debug('p_appliDOB',p_appliDOB);

                var p_appliAOI= request.parameters.custpage_applicant_AOI;
				log.debug('p_appliAOI',p_appliAOI);

                var p_appliAge= request.parameters.custpage_applicant_Age;
				log.debug('p_appliAge',p_appliAge);

                var p_appliNew= request.parameters.custpage_applicant_New;
				log.debug('p_appliNew',p_appliNew);
				
				//Create a Record



                
                    // var userObj = runtime.getCurrentUser();
                    // log.debug('userObj', userObj);
                    // var userId = userObj.id;
    
    
                    // var vendorName = scriptContext.newRecord.getValue('entity');
                    // log.debug('vendorName', vendorName);
    
                    // var docNum = scriptContext.newRecord.getValue('tranid');
                    // log.debug('docNum', docNum);
    
                    // var poDate = scriptContext.newRecord.getValue('trandate');
                    // log.debug('poDate', poDate);
    
                    // var toAmount = scriptContext.newRecord.getValue('total');
                    // log.debug('toAmount', toAmount);

    
                    var custRec = record.create({
                        type: 'customrecord_sports_application_form_vc'
    
                    });
    
                    custRec.setValue('custrecord_applicant_name', p_appliName);
                    custRec.setValue('custrecord_applicant_email', p_appliEmail);
                    custRec.setValue('custrecord_applicant_phone', p_appliPhone);
                    custRec.setValue('custrecord_applicant_dob', p_appliDOB);
                    custRec.setValue('custrecord_applicant_aoi', p_appliAOI);
                    custRec.setValue('custrecord_applicant_age', p_appliAge);
                    custRec.setValue('custrecord_applicant_newparticipant', p_appliNew);
                    
                    custRec.save();
                
        
    
				
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