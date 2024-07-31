sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageToast"
],
    function (Controller,
        BusyIndicator,
        MessageToast) {
        "use strict";

        return Controller.extend("com.solvia.management.controller.Main", {
            onInit: function () {
                var globalModel = this.getOwnerComponent().getModel("globalModel");
                var oDataModel = this.getOwnerComponent().getModel("myOdata");
                BusyIndicator.show();
                oDataModel.read("/employeeSet", {
                    success: function (oData) {
                        BusyIndicator.hide();
                        const results = oData.results;
                        const range = results.slice(1, 4)

                        globalModel.setProperty("/getEmployeesForMain", range);
                        globalModel.setProperty("/getEmployeesLength", results.length);

                        console.log(globalModel.getProperty("/getEmployeesForMain"), results.length);
                    },
                    error: function (oError) {
                        BusyIndicator.hide();
                        console.error("employe data okunamadi");
                        MessageToast.show("Tablo yüklenirken bir hata oluştu");
                    }
                });
            },

            onGitButtonEmployeePress: function (oEvent) {
                var router = this.getOwnerComponent().getRouter();
                router.navTo("addEmployee");
            },

            onGitButtonProductPress: function (oEvent) {
                var router = this.getOwnerComponent().getRouter();
                router.navTo("addProduct");
            },
            onGitButtonEmployeeTablePress: function (params) {
                var router = this.getOwnerComponent().getRouter();
                router.navTo("tableEmployee");
            }
        });
    });
