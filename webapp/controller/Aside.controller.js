sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/solvia/management/utils/Helper"
], function (
    Controller,
	Helper
) {
    "use strict";

    return Controller.extend("com.solvia.management.controller.Aside", {
        /**
         * @override
         */
        onInit: function () {

        },
        onNavigationListItemSelect() {
            const oSideNavigation = this.byId("idSideNavigation"),
                bExpanded = oSideNavigation.getExpanded();

            oSideNavigation.setExpanded(!bExpanded);
        },

        onSideNavigationItemSelect: function (oEvent) {
            const oItem = oEvent.getParameter("item");
            const sKey = oItem.getKey();
            var router = this.getOwnerComponent().getRouter();


            switch (sKey) {
                case "main":
                    router.navTo("RouteMain");
                    break;
                case "addProduct":
                    router.navTo("addProduct");
                    break;
                case "addEmployee":
                    router.navTo("addEmployee");
                    break;
                case "addAddress":
                    router.navTo("addAddress");
                    break;
                case "tableEmployee":
                    router.navTo("tableEmployee");
                    break;
                default:
                    router.navTo("home");
                    break;
            }
            Helper.refreshTable(this.getOwnerComponent());
        }
    });
});