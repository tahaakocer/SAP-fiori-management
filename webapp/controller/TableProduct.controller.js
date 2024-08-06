sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/solvia/management/utils/Helper",
    "com/solvia/management/utils/Formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function (
    Controller,
    Helper,
    Formatter,
    Filter,
    FilterOperator,
    Sorter
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
            const aFilter = [];
            const sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("Title", FilterOperator.Contains, sQuery));
            }

            const oList = this.byId("idGetAllProductsList");
            const oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },
        
        onSelectChange: function (oEvent) {
            const sKey = oEvent.getParameter("selectedItem").getKey();
            const bGroup = (sKey === "Type");
            const oSorter = new Sorter(sKey, true, bGroup ? this.formatter.formatProductType : null); //(key, artan mı azalan mı, gruplama olcak mı)
            const oList = this.byId("idGetAllProductsList");
            const oBinding = oList.getBinding("items");
            oBinding.sort(oSorter);
        },
        onObjectListItemPress: function (oEvent) {
            var globalModel = this.getOwnerComponent().getModel("globalModel");
            var oContext = oEvent.getSource().getBindingContext("globalModel");
            var oData = oContext.getObject();

            globalModel.setProperty("/editProduct",{
                Id: oData.Id,
                Title: oData.Title,
                Price: oData.Price,
                Description: oData.Description,
                Pimage: oData.Pimage,
                Type: oData.Type,
                State: oData.State,
                MfcDate: oData.MfcDate,
                Quantity: oData.Quantity

            })
            globalModel.setProperty("/isEnabled",false);
            var router = this.getOwnerComponent().getRouter();
            router.navTo("editProduct")
            sap.ushell.Container.getRenderer("fiori2").hideHeaderItem("backBtn", false);

            var oBackButton = sap.ui.getCore().byId("backBtn");
        }
    });
});