sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/solvia/management/utils/Helper",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History"
], function (
    Controller,
    Helper,
    MessageBox,
    History
) {
    "use strict";

    return Controller.extend("com.solvia.management.controller.Aside", {
        /**
         * @override
         */
        onInit: function () {
        },

        /**
         * @override
         */
        onAfterRendering: function () {
            const oSideNavigation = this.byId("idSideNavigation");
            oSideNavigation.setSelectedKey(null);
            oSideNavigation.setSelectedItem(null);
            console.log("onrender calisti aside");

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
                    Helper.refreshTable(this.getOwnerComponent());
                    break;
                case "tableProduct":
                    router.navTo("tableProduct");
                    Helper.refreshList(this.getOwnerComponent());
                    break;
                case "help":
                    router.navTo("help");
                    break;
                case "deneme":
                    router.navTo("deneme");
                    break;
                default:
                    router.navTo("home");
                    break;
            }
        }
    });
});