//client

/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/record', 'N/https', 'N/url'],
    /**
     * @param {currentRecord} currentRecord
     */
    function (currentRecord, record, https, url) {

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

        function fieldChanged(scriptContext) {

        }

        function onButtonClick() {
            try {
                var recordId = getCurrentRecordId();

                log.debug('recordId', recordId);

                if (!recordId) {
                    alert('Record ID is not available.');
                } else {
                    if (typeof window !== 'undefined') {
                        var suiteletURL = url.resolveScript({
                            scriptId: 'customscript_tl',
                            deploymentId: 'customdeploy_tl',
                            params: {
                                'recordid': recordId
                            },
                            returnExternalUrl: true
                        });

                        window.open(suiteletURL, '_blank');
                    } else {
                        alert('Window object is not available.');
                    }
                }

            } catch (e) {
                console.error('Error:', e);
            }
        }

        function getCurrentRecordId() {
           
            var currentRecord = require('N/currentRecord');

            var recordId = currentRecord.get().getValue({
                fieldId: 'id'
            });

            return recordId;
        }

        return {
            pageInit: pageInit,
            fieldChanged: fieldChanged,
            onButtonClick: onButtonClick

        };

    });