sap.ui.define(["sap/ui/core/BusyIndicator"], function (
    BusyIndicator) {
    "use strict";
    var Helper = {
        refreshTable: function (oComponent) {

            var oDataModel = oComponent.getModel("myOdata");
            var globalModel = oComponent.getModel("globalModel");
            BusyIndicator.show();
            oDataModel.read("/employeeSet", {
                success: function (oData) {
                    BusyIndicator.hide();
                    globalModel.setProperty("/getAllEmployees", oData.results);
                },
                error: function (oError) {
                    BusyIndicator.hide();
                    console.error("employee data okunamadi");
                    MessageToast.show("Tablo yüklenirken bir hata oluştu");
                }
            });

        },
        refreshList: function (oComponent) {
            var oDataModel = oComponent.getModel("myOdata");
            var globalModel = oComponent.getModel("globalModel");
            BusyIndicator.show();
            oDataModel.read("/productSet", {
                success: function (oData) {
                    BusyIndicator.hide();
                    globalModel.setProperty("/getAllProducts", oData.results);
                    console.log(globalModel.getProperty("/getAllProducts"));
                },
                error: function (oError) {
                    BusyIndicator.hide();
                    console.error("product data okunamadi");
                    MessageToast.show("Liste yüklenirken bir hata oluştu");
                }
            });
        },
        calculateRatio: function (count, total) {
            let ratio = (count / total) * 100;
            return ratio;
        }
    }
    return Helper;
});
