/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/search','N/email','N/runtime'],

function(search,email,runtime) {
   
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
	var customrecordsports_applictaion_form_asmiSearchObj = search.create({
        type: "customrecordsports_applictaion_form_asmi",
        filters:
        [
        ],
        columns:
        [
           search.createColumn({
              name: "scriptid",
              sort: search.Sort.ASC,
              label: "Script ID"
           }),
           search.createColumn({name: "custrecord_applicantt_name", label: "applicant name"}),
           search.createColumn({name: "custrecordapplicantt_email", label: "applicant email"}),
           search.createColumn({name: "custrecordapplicanttphone", label: "applicant phone"}),
           search.createColumn({name: "custrecordapplicant_dob", label: "applicant DOB"}),
           search.createColumn({name: "custrecord_applicant_area_of_interest", label: "applicant area of interest"}),
           search.createColumn({name: "custrecord_applicantt_age", label: "applicant age"}),
           search.createColumn({name: "custrecord_new_participantt", label: "ARE YOU new participant"})
        ]
     });
     var searchResultCount = customrecordsports_applictaion_form_asmiSearchObj.runPaged().count;
     log.debug("customrecordsports_applictaion_form_asmiSearchObj result count",searchResultCount);
     customrecordsports_applictaion_form_asmiSearchObj.run().each(function(result){


        appEmail = result.getValue('custrecordapplicantt_email');
        log.debug('appEmail',appEmail);

         appName=result.getValue('custrecord_applicantt_name');
         log.debug('appName',appName)
         
          // search.createColumn({name: "custrecordapplicanttphone", label: "applicant phone"}),
           appPhone=result.getValue('custrecordapplicanttphone');
         log.debug('appPhone',appPhone)
        
         appDob=result.getValue('custrecordapplicant_dob');
         log.debug('appDob',appDob)
         
         appAoi=result.getValue('custrecord_applicant_area_of_interest');
         log.debug('appAoi',appAoi)
         
         appAge=result.getValue('custrecord_applicantt_age');
         log.debug('appAge',appAge)
         
         appNewP=result.getValue('custrecord_new_participantt');
         log.debug('appNewP',appNewP)

       arr_List.push({
                 'appEmail':appEmail,
                 'appPhone':appPhone,
                 'appName':appName,
                 'appDob':appDob,
                 'appAoi':appAoi,
                 'appAge':appAge,
                 'appNewP':appNewP
                    });

        // .run().each has a limit of 4,000 results
        return true;
     });
     log.debug('end of get input data')
     return arr_List;
     
     /*
     customrecordsports_applictaion_form_asmiSearchObj.id="customsearch1701492358314";
     customrecordsports_applictaion_form_asmiSearchObj.title="Custom sports applictaion form asmit Search (copy)";
     var newSearchId = customrecordsports_applictaion_form_asmiSearchObj.save();
     */
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
        var i=1;
        log.debug('in map stage',i)
        i++;
    	try{
            var m_fileid = JSON.parse(context.value);
    		log.debug('m_fileid', m_fileid);
    		
            var appEmailas = m_fileid.appEmail;
            log.debug('appEmailas',appEmailas)

            var appPhoneas = m_fileid.appPhone;
            log.debug('appPhoneas',appPhoneas)
             
            var appNameas = m_fileid.appName;
            log.debug('appNameas',appNameas)
            
            var appDobas = m_fileid.appDob;
            log.debug('appDobas',appDobas)
            
            var appAoias = m_fileid.appAoi;
            log.debug('appAoias',appAoias)
            
            var appAgeas = m_fileid.appAge;
            log.debug('appAgeas',appAgeas)
            
            var appNewPas = m_fileid.appNewP;
            log.debug('appNewPas',appNewPas)
            
            context.write({
				key : appEmailas,
				value : {
				'appEmailas' : appEmailas,
                 'appPhoneas':appPhoneas,
                'appNameas':appNameas,
                'appDobas':appDobas,
                'appAoias':appAoias,
                'appAgeas':appAgeas,
                'appNewPas':appNewPas

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
      //var arre=[];
    	       try {
                var contentArr = context.values;
                log.debug('contentArr',contentArr)
                for (var i = 0; i < contentArr.length; i++) {
              
                    var Data = JSON.parse(contentArr[0]);
                    log.debug('Data', Data);

                    
                    get_Email = Data.appEmailas;
                    log.debug('get_Email', get_Email);
                      // var userObj = runtime.getCurrentUser();

                   //  myid 34874 arre.push(get_Email);
                        //  if(true){                                                                      
                         email.send({
                            author: 34874,
                            recipients: get_Email,
                            subject: 'sports application from asmit',
                            body: 'task is completed'
    
    
                        
                        });
                        //  }
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
        reduce: reduce
       // summarize: summarize
    };
    
});