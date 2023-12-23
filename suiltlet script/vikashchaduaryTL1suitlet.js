/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/record'], function (serverWidget, record) {
    function onRequest(context) {
        if (context.request.method === 'GET') {

            var form = serverWidget.createForm({
                title: 'Customer Information'
            });

            var usergroup = form.addFieldGroup({
                id: 'usergroup',
                label: 'Primary Information'
            });
            //usergroup.isSingleColumn = true;

            var salesgroup = form.addFieldGroup({
                id: 'salesgroup',
                label: 'Sales Information'
            });

            var classificationgroup = form.addFieldGroup({
                id: 'classificationgroup',
                label: 'Classification'
            });

            var intercompany = form.addFieldGroup({
                id: 'intercompany',
                label: 'Intercompany Management'
            });

            var itemfield = form.addFieldGroup({
                id: 'itemfield',
                label: 'Items'
            });

            // var shippingfield = form.addFieldGroup({
            //     id: 'shippingfield',
            //     label: 'Shipping'
            // });

            // var billingfield = form.addFieldGroup({
            //     id: 'billingfield',
            //     label: 'Billing'
            // });

            var fname = form.addField({
                id: 'customerfield',
                type: serverWidget.FieldType.TEXT,
                label: 'Customer',
                container: 'usergroup'
            });
            fname.isMandatory = true;

            var date = form.addField({
                id: 'datefield',
                type: serverWidget.FieldType.DATE,
                label: 'Date',
                container: 'usergroup'
            });
            date.isMandatory = true;

            var select = form.addField({
                id: 'custpage_titlefield',
                type: serverWidget.FieldType.TEXT,
                label: 'Status',
                container: 'usergroup'
            });

            //--------------------------------------------------------------------------------------------------

            var repname = form.addField({
                id: 'companyfield',
                type: serverWidget.FieldType.TEXT,
                label: 'Sales Rep',
                container: 'salesgroup'
            });

            // repname.addSelectOption({
            //     value: 'vikas chaudhary',
            //     text: 'vikas chaudhary'
            // });
            // repname.addSelectOption({
            //     value: 'Alex Wolfe',
            //     text: 'Alex Wolfe'
            // });
            // repname.addSelectOption({
            //     value: 'Smith',
            //     text: 'Smith'
            // });

            // form.addSubmitButton({
            //     label: 'Submit'
            // });

            //----------------------------------------------------------------------------------------------------------------------


            form.addField({
                id: 'subsidiarygroup',
                type: serverWidget.FieldType.TEXT,
                label: 'SUBSIDIARY',
                container: 'classificationgroup'
            });

            form.addField({
                id: 'departmentgroup',
                type: serverWidget.FieldType.TEXT,
                label: 'DEPARTMENT',
                container: 'classificationgroup'
            });


            //-------------------------------------------------------------------------------------------------------------------------

            var intercom_grp = form.addField({
                id: 'intercmgroup',
                type: serverWidget.FieldType.TEXT,
                label: 'PRIORITY',
                container: 'intercompany'
            });
            intercom_grp.isMandatory = true;

            //--------------------------------------------------------------------------------------------------------

            var tab1 = form.addTab({
                id: 'tab1id',
                label: 'Items'
            });

            var tab2 = form.addTab({
                id: 'tab2id',
                label: 'Shipping'
            });

            var tab3 = form.addTab({
                id: 'tab3id',
                label: 'Billing'
            });

            //------------------------------------------------------------------------------------------------------

            
            var sublist = form.addSublist({
                id: 'sublistid',
                type: serverWidget.SublistType.INLINEEDITOR,
                label: 'Inline Sublist',
                tab: 'tab1id'
            });

            sublist.addField({
                id: 'itemfieldid',
                type: serverWidget.FieldType.TEXT,
                label: 'ITEM'
            });

            sublist.addField({
                id: 'quantityfieldid',
                type: serverWidget.FieldType.TEXT,
                label: 'QUANTITY'
            });

            sublist.addField({
                id: 'amountid',
                type: serverWidget.FieldType.CURRENCY,
                label: 'AMOUNT'
            });


            //--------------------------------------------------------------------------------------

            form.addField({
                id: 'shipdatefield',
                type: serverWidget.FieldType.DATE,
                label: 'SHIP DATE',
                container: 'tab2id'
            });

            form.addField({
                id: 'shipcarrierfield',
                type: serverWidget.FieldType.TEXT,
                label: 'SHIPPING CARRIER',
                container: 'tab2id'
            });

            form.addField({
                id: 'shipmethodfield',
                type: serverWidget.FieldType.TEXT,
                label: 'SHIPPING METHOD',
                container: 'tab2id'
            });

            //----------------------------------------------------------------------------------------------------

            form.addField({
                id: 'billaddid',
                type: serverWidget.FieldType.TEXT,
                label: 'BILLING ADDRESS',
                container: 'tab3id'
            });


            form.addSubtab({
                id: 'paymentsubtabid',
                label: 'Payment',
                tab: 'tab3id'
            });

            form.addSubtab({
                id: 'slitchsubtab2id',
                label: 'Slitch',
                tab: 'tab3id'
            });

           //--------------------------------------------------------------------------------------------------

    
            var salesOrderId = context.request.parameters.recordid;//228183
            log.debug('salesOrderId',salesOrderId);

            if (salesOrderId) {
               
                var salesOrderRecord = record.load({
                    type: record.Type.SALES_ORDER,
                    id: salesOrderId,
                    isDynamic: true
                });

                
                var customer = salesOrderRecord.getText({
                    fieldId: 'entity'
                });
                log.debug('customer',customer);

                var orderDate = salesOrderRecord.getValue({
                    fieldId: 'trandate'
                });
                log.debug('orderDate',orderDate);

                var orderStatus = salesOrderRecord.getText({
                    fieldId: 'orderstatus'
                });
                log.debug('orderStatus',orderStatus);

                //-----------------------------------------------------------------------------------------

                var salesRep = salesOrderRecord.getText({
                    fieldId: 'salesrep'
                });
                log.debug('salesRep',salesRep);

                //------------------------------------------------------------------------------------------

                var subsidiaryFld = salesOrderRecord.getText({
                    fieldId: 'subsidiary'
                });
                log.debug('subsidiaryFld',subsidiaryFld);

                var departmentFld = salesOrderRecord.getText({
                    fieldId: 'department'
                });
                log.debug('departmentFld',departmentFld);

                //--------------------------------------------------------------------------------------------

                var priorityFld = salesOrderRecord.getValue({
                    fieldId: 'custbody_cust_priority'
                });
                log.debug('priorityFld',priorityFld);

                //------------------------------------------------------------------------------------------------

                var itemFld = salesOrderRecord.getText({
                    fieldId: 'itemreq0'
                });
                log.debug('itemFld',itemFld);

                var quantityFld = salesOrderRecord.getValue({
                    fieldId: 'item_quantity_fs'
                });
                log.debug('quantityFld',quantityFld);

                var amountFld = salesOrderRecord.getValue({
                    fieldId: 'item_amount_fs'
                });
                log.debug('amountFld',amountFld);

                //----------------------------------------------------------------------------------------------

                var shipdateFld = salesOrderRecord.getValue({
                    fieldId: 'shipdate'
                });
                log.debug('shipdateFld',shipdateFld);

                var shipcarrierFld = salesOrderRecord.getText({
                    fieldId: 'shipcarrier'
                });
                log.debug('shipcarrierFld',shipcarrierFld);

                var shipmethodFld = salesOrderRecord.getText({
                    fieldId: 'shipmethod'
                });
                log.debug('shipmethodFld',shipmethodFld);

                //-------------------------------------------------------------------------------------------------------

                form.getField({
                    id: 'customerfield'
                }).defaultValue = customer;

                form.getField({
                    id: 'datefield' 
                }).defaultValue = orderDate;

                form.getField({
                    id: 'custpage_titlefield' 
                }).defaultValue = orderStatus;

                //-----------------------------------------------------------------------------------------

                form.getField({
                    id: 'companyfield' 
                }).defaultValue = salesRep;

                //---------------------------------------------------------------------------------------------

                form.getField({
                    id: 'subsidiarygroup' 
                }).defaultValue = subsidiaryFld;

                form.getField({
                    id: 'departmentgroup' 
                }).defaultValue = departmentFld;

                //---------------------------------------------------------------------------------------------

                form.getField({
                    id: 'intercmgroup' 
                }).defaultValue = priorityFld;

                //----------------------------------------------------------------------------------------------

                // form.getField({
                //     id: 'itemfieldid' 
                // }).defaultValue = itemFld;

                // form.getField({
                //     id: 'quantityfieldid' 
                // }).defaultValue = quantityFld;

                // form.getField({
                //     id: 'amountid' 
                // }).defaultValue = amountFld;

                //----------------------------------------------------------------------------------------------

                form.getField({
                    id: 'shipdatefield' 
                }).defaultValue = shipdateFld;

                form.getField({
                    id: 'shipcarrierfield' 
                }).defaultValue = shipcarrierFld;

                form.getField({
                    id: 'shipmethodfield' 
                }).defaultValue = shipmethodFld;

                //--------------------------------------------------------------------------------------------

               
            }

            context.response.writePage(form);
        } else {
            
        }
    }
    return {
        onRequest: onRequest
    };
});