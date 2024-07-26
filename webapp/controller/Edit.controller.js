sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "com/solvia/management/utils/Formatter"
], function(
	Controller,
	Formatter
) {
	"use strict";

	return Controller.extend("com.solvia.management.controller.Edit", {
        /**
         * @override
         */
        formatter: Formatter,
        onInit: function() {

            var globalModel = this.getOwnerComponent().getModel("globalModel");

        
        }
	});
});