/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define(['N/search'],

    function (search) {

        /**
         * Function called upon sending a GET request to the RESTlet.
         *
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
         * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
         * @since 2015.1
         */
        function doGet(requestParams) {

        }

        /**
         * Function called upon sending a PUT request to the RESTlet.
         *
         * @param {string | Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain'
         * or parsed into an Object when request Content-Type is 'application/json' (in which case the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
         * @since 2015.2
         */
        function doPut(requestBody) {

        }


        /**
         * Function called upon sending a POST request to the RESTlet.
         *
         * @param {string | Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain'
         * or parsed into an Object when request Content-Type is 'application/json' (in which case the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
         * @since 2015.2
         */
        function doPost(requestBody) {
            try {
                log.debug('This is doPost Part');
                var response = '';
                var g_InternalId, g_Name, g_Email_Id, g_Phone_No, g_DateOB, g_Age, g_Area_Of_interest, g_New_participant;
                var InternalIdSpt = requestBody.internalId;
                log.debug('InternalIdSpt:', InternalIdSpt);
                var Name = requestBody.Applicant_name;
                log.debug('Name:', Name);
                var Email_Id = requestBody.Email;
                log.debug('Email_Id:', Email_Id);
                var Phone_No = requestBody.Phone_Number;
                log.debug('Phone_No:', Phone_No);
                var DateOB = requestBody.DOB;
                log.debug('DateOB:', DateOB);
                var New_participant = requestBody.New_Participant;
                log.debug('New_participant:', New_participant);
                var Age = requestBody.AGE;
                log.debug('Age:', Age);
                if (InternalIdSpt || Name || Email_Id || Phone_No || DateOB || New_participant || Age) {
                    var Sport_Arr = [];
                    var customrecord_spt_app_frm_rahulSearchObj = search.create({
                        type: "customrecord_spt_app_frm_rahul",
                        filters:
                            [
                                ["internalidnumber", "equalto", InternalIdSpt],
                                "AND",
                                ["custrecord_cust_app_name", "startswith", Name],
                                "AND",
                                ["custrecord_cust_email_rr", "startswith", Email_Id],
                                "AND",
                                ["custrecord_cust_phn_number", "startswith", Phone_No],
                                "AND",
                                ["custrecord_cust_dob", "on", DateOB],
                                "AND",
                                ["custrecord_cust_new_participant_rr", "is", New_participant],
                                "AND",
                                ["custrecord_cust_age_rr", "equalto", Age]
                            ],
                        columns:
                            [
                                search.createColumn({ name: "internalid", label: "Internal ID" }),
                                search.createColumn({ name: "custrecord_cust_app_name", label: "Applicant Name :" }),
                                search.createColumn({ name: "custrecord_cust_email_rr", label: "Email :" }),
                                search.createColumn({ name: "custrecord_cust_phn_number", label: "Phone Number :" }),
                                search.createColumn({ name: "custrecord_cust_dob", label: "DOB :" }),
                                search.createColumn({ name: "custrecord_cust_age_rr", label: "Age :" }),
                                search.createColumn({ name: "custrecord_cust_interest_area_r", label: "Area of interest" }),
                                search.createColumn({ name: "custrecord_cust_new_participant_rr", label: "Are you a new participant ?" })
                            ]
                    });
                    var searchResultCount = customrecord_spt_app_frm_rahulSearchObj.runPaged().count;
                    log.debug("customrecord_spt_app_frm_rahulSearchObj result count", searchResultCount);
                    customrecord_spt_app_frm_rahulSearchObj.run().each(function (result) {
                        g_InternalId = result.getValue('internalid');
                        log.debug('g_InternalId:', g_InternalId);
                        g_Name = result.getValue('custrecord_cust_app_name');
                        log.debug('g_Name:', g_Name);
                        g_Email_Id = result.getValue('custrecord_cust_email_rr');
                        log.debug('g_Email_Id:', g_Email_Id);
                        g_Phone_No = result.getValue('custrecord_cust_phn_number');
                        log.debug('g_Phone_No:', g_Phone_No);
                        g_DateOB = result.getValue('custrecord_cust_dob');
                        log.debug('g_DateOB:', g_DateOB);
                        g_Age = result.getValue('custrecord_cust_age_rr');
                        log.debug('g_Age:', g_Age);
                        g_Area_Of_interest = result.getText('custrecord_cust_interest_area_r');
                        log.debug('g_Area_Of_interest:', g_Area_Of_interest);
                        g_New_participant = result.getValue('custrecord_cust_new_participant_rr');
                        log.debug('g_New_participant:', g_New_participant);

                        Sport_Arr.push({
                            'g_InternalId': g_InternalId,
                            'g_Name': g_Name,
                            'g_Email_Id': g_Email_Id,
                            'g_Phone_No': g_Phone_No,
                            'g_DateOB': g_DateOB,
                            'g_Age': g_Age,
                            'g_Area_Of_interest': g_Area_Of_interest,
                            'g_New_participant': g_New_participant
                        })
                        return true;
                    });
                    log.debug('Sport_Arr:', Sport_Arr);
                    if (Sport_Arr) {
                        response = Sport_Arr;
                        return response;
                    }
                }
                else {
                    log.error('SomeThing going wrong please check all value again');
                    response = 'Error: You miss or enter wrong value: like internalId, name, age, DOB, Email, phone';
                    return response;
                }
            } catch (err) {
                log.error('error come in doPost Part', err);
            }
        }

        /**
         * Function called upon sending a DELETE request to the RESTlet.
         *
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
         * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
         * @since 2015.2
         */
        function doDelete(requestParams) {

        }

        return {
            // 'get': doGet,
            // put: doPut,
            post: doPost,
            // 'delete': doDelete
        };

    });