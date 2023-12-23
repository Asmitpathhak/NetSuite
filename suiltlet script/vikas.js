/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
// , 'N/format'
// , format
define(['N/ui/serverWidget','N/record', 'N/email'],

		function(serverWidget, record, email) {

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
					id : 'custpage_applicant_name_vc',
					type : serverWidget.FieldType.TEXT,
					label : 'Applicant Name'
				});
                appliName.isMandatory = true;
				
                var appliEmail = form.addField({
					id : 'custpage_applicant_email_vc',
					type : serverWidget.FieldType.EMAIL,
					label : 'Email'

				});
                appliEmail.isMandatory = true;
				

                    var appliPhone = form.addField({
					id : 'custpage_applicant_phone_vc',
					type : serverWidget.FieldType.PHONE,
					label : 'Phone'
				});
                
                    var appliDOB = form.addField({
					id : 'custpage_applicant_dob_vc',
					type : serverWidget.FieldType.DATE,
					label : 'Date of Birth'
					
				});
                //appliDOB.isMandatory = true;
					// var parsedDate = format.parse({
					// 	value: appliDOB,
					// 	type: format.Type.DATE
			 		// });
					// log.error('error in parsedate',parsedDate);

                
                    var appliAOI = form.addField({
					id : 'custpage_applicant_aoi_vc',
					type : serverWidget.FieldType.SELECT,
					label : 'Area of Interest',
                    source : 'customlist_sports_list_vikas'
				});
                appliAOI.isMandatory = true;
				

                    var appliAge = form.addField({
					id : 'custpage_applicant_age_vc',
					type : serverWidget.FieldType.INTEGER,
					label : 'Age'
				});
                appliAge.isMandatory = true;


				var appliNew = form.addField({
					id : 'custpage_applicant_new_vc',
					type : serverWidget.FieldType.CHECKBOX,
					label : 'Are you a new Applicant?',
					//value :
				});
                appliNew.isMandatory = true;


				form.addSubmitButton({
					label : 'Submit Button'
				});

				response.writePage(form);
			}
            //post method =====================================================
            else{
				log.debug('IN POST METHOD');

				var p_appliName= request.parameters.custpage_applicant_name_vc;
				log.debug('p_appliName',p_appliName);

				var p_appliEmail= request.parameters.custpage_applicant_email_vc;
				log.debug('p_appliEmail',p_appliEmail);

                var p_appliPhone= request.parameters.custpage_applicant_phone_vc;
				log.debug('appliPhone',p_appliPhone);

                var p_appliDOB= request.parameters.custpage_applicant_dob_vc;
				log.debug('p_appliDOB',p_appliDOB);

                var p_appliAOI= request.parameters.custpage_applicant_aoi_vc;
				log.debug('p_appliAOI',p_appliAOI);

                var p_appliAge= request.parameters.custpage_applicant_age_vc;
				log.debug('p_appliAge',p_appliAge);

                var p_appliNew= request.parameters.custpage_applicant_new_vc ==='T';
				log.debug('p_appliNew',p_appliNew);
				
				

    
                    var custRec = record.create({
                        type: 'customrecord_sports_application_form_vc'
    
                    });
    
                    custRec.setValue('custrecord_applicant_name', p_appliName);
                    custRec.setValue('custrecord_applicant_email', p_appliEmail);
                    custRec.setValue('custrecord_applicant_phone', p_appliPhone);
                    //custRec.setValue('custrecord_applicant_dob', p_appliDOB);
                    custRec.setValue('custrecord_applicant_aoi', p_appliAOI);
                    custRec.setValue('custrecord_applicant_age', p_appliAge);
                    custRec.setValue('custrecord_applicant_newparticipant', p_appliNew);
                    
                    //custRec.save();

					var recSaved = custRec.save(true);
					if(recSaved){
						email.send({
							author: 15507,
							recipients: p_appliEmail,
							subject: 'Regarding your Sports Application',
							body: 'Hello sir, Your Application has been recorded in our system, we will contact you soon. Kindly wait for our response. Thanks ',
							//attachments: [fileObj],
							// relatedRecords: {
							// 	entityId: recipientId,
							// 	customRecord:{
							// 		id:recordId,
							// 		recordType: recordTypeId   //an integer value
							// 	}
							// }
						});
					}
                
        
    
				
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