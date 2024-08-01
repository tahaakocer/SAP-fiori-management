sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/solvia/management/utils/Helper",
    "com/solvia/management/utils/Formatter"
], function (
    Controller,
	Helper,
	Formatter
) {
    "use strict";

    return Controller.extend("com.solvia.management.controller.TableProduct", {
        /**
         * @override
         */
        formatter: Formatter,
        onInit: function () {
            var globalModel = this.getOwnerComponent().getModel("globalModel");
            Helper.refreshList(this.getOwnerComponent());
        },

        onSearchFieldSearch: function (oEvent) {

        },

        onSelectChange: function (oEvent) {

        },

		onObjectListItemPress: function(oEvent) {
			
		}
    });
});