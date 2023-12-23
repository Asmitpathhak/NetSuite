/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget','N/record','N/format'],

function(serverWidget,record,format) {

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
        title : 'Sports Application Form asmit'
    });

    if(request.method == 'GET'){
        log.debug('IN GET METHOD');

        var appliName = form.addField({
            id : 'custpage_applicant_name_ap',
            type : serverWidget.FieldType.TEXT,
            label : 'Applicant Name'
        });
        appliName.isMandatory = true;

        var appliEmail = form.addField({
            id : 'custpage_applicant_email_ap',
            type : serverWidget.FieldType.EMAIL,
            label : 'Email'
        });
        appliEmail.isMandatory = true;
        
            var appliPhone = form.addField({
            id : 'custpage_applicant_phone_ap',
            type : serverWidget.FieldType.PHONE,
            label : 'Phone'
        });
        
        //     var appliDOB = form.addField({
        //     id : 'custpage_applicant_dob_ap',
        //     type : serverWidget.FieldType.DATE,
        //     label : 'DOB'
        // });
      //  appliDOB.isMandatory = true;

        
            var appliAoi = form.addField({
            id : 'custpage_applicant_aoi_ap',
            type : serverWidget.FieldType.SELECT,
            label : 'select your interset',
            source:'customlist_area_of_interst12'
        });
       // appliAOI.isMandatory = true;
        
            var appliAge = form.addField({
            id : 'custpage_applicant_age_ap',
            type : serverWidget.FieldType.INTEGER,
            label : 'Age'
        });
        appliAge.isMandatory = true;

        var appliNew = form.addField({
            id : 'custpage_applicant_new_ap',
            type : serverWidget.FieldType.CHECKBOX,
            label : 'Are you a new Applicant?'
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

        var p_appliName= request.parameters.custpage_applicant_name_ap;
        log.debug('p_appliName',p_appliName);

        var p_appliEmail= request.parameters.custpage_applicant_email_ap;
        log.debug('p_appliEmail',p_appliEmail);

        var p_appliPhone= request.parameters.custpage_applicant_phone_ap;
        log.debug('appliPhone',p_appliPhone);

        // var p_appliDob= request.parameters.custpage_applicant_dob_ap;
        // log.debug('p_appliDOB',p_appliDOB);

        var p_appliAoi= request.parameters.custpage_applicant_aoi_ap;
        log.debug('p_appliAOI',p_appliAOI);

        var p_appliAge= request.parameters.custpage_applicant_age_ap;
        log.debug('p_appliAge',p_appliAge);

        var p_appliNew= request.parameters.custpage_applicant_new_ap ==='T';
        log.debug('p_appliNew',p_appliNew);
        
        //Create a Record
               var custRec = record.create({
                type: 'customrecordsports_applictaion_form_asmi'

            });

            custRec.setValue('custrecord_applicantt_name',p_appliName);
            custRec.setValue('custrecordapplicantt_email',p_appliEmail);
            custRec.setValue('custrecordapplicanttphone',p_appliPhone);
           // custRec.setValue('custrecordapplicant_dob', p_appliDob);
            custRec.setValue('custrecord_applicant_area_of_interest',p_appliAoi);
            custRec.setValue('custrecord_applicantt_age',p_appliAge);
            custRec.setValue('custrecord_new_participantt',p_appliNew);
            
            custRec.save(true);
        
            response.write('<body>Your Response has been noted.</body>');
        
// email.send({
//     author: 15507,
//     recipients: p_appliEmail,
//     subject: 'sports application from',
//     body: 'your respose have been recorded',
    
   
    
// });
        
        

    }
}catch(e){
    log.error('Error in Script:',e);
}
}

return {
onRequest: onRequest
};

});