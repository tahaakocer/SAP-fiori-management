sap.ui.define(["sap/ui/core/BusyIndicator"], function (
	BusyIndicator) {
    "use strict";
    var Helper = {
        refreshTable: function (oComponent) {

            var oDataModel = oComponent.getModel("myOdata");
            var globalModel = oComponent.getModel("globalModel");
            console.log(globalModel);
            BusyIndicator.show();
            oDataModel.read("/employeeSet", {
                success: function (oData) {
                    BusyIndicator.hide();
                    globalModel.setProperty("/getAllEmployees", oData.results);
                    console.log(oData.results);
                },
                error: function (oError) {
                    BusyIndicator.hide();
                    console.error("employe data okunamadi");
                    MessageToast.show("Tablo yüklenirken bir hata oluştu");
                }
            });

        }
     }
    return Helper;
});
