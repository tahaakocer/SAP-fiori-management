sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/solvia/management/utils/Helper",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (
    Controller,
    Helper,
    MessageToast,
    MessageBox
) {
    "use strict";

    return Controller.extend("com.solvia.management.controller.AddProduct", {
        /**
         * @override
         */
        onInit: function () {
            var globalModel = this.getOwnerComponent().getModel("globalModel");
            var oDataModel = this.getOwnerComponent().getModel("myOdata");
            this._wizard = this.byId("idCreateProductWizard");

        },

        onWizardComplete: function (oEvent) {
        },

        onSubmitButtonPress: function (oEvent) {
            var oDataModel = this.getOwnerComponent().getModel("myOdata");
            var oView = this.getView();
            
            var sType = oView.byId("idSegmentedButton").getSelectedKey();
            var sTitle = oView.byId("idTitleInput").getValue();
            var sPrice = oView.byId("idPriceInput").getValue();
            var sDescription = oView.byId("idDescriptionTextArea").getValue();
            var sImageUrl = oView.byId("idImageUrlInput").getValue();
            var sState = oView.byId("idStateSegmentedButton").getSelectedKey();
            var sDate = oView.byId("idMfcDateDatePicker").getDateValue();

            var oEmpData = {
                Title: sTitle,
                Price: sPrice,
                Description: sDescription,
                ImageUrl: sImageUrl,
                RatingId: "0000000001",
                Type: sType,
                State: sState,
                MfcDate: sDate
            };
            console.log(oEmpData);

            if (Helper.validationForm(oEmpData)) {
                oDataModel.create("/productSet", oEmpData, {
                    method: "POST",
                    success: function (data) {
                        MessageToast.show("Ürün başarıyla eklendi.");
                    },
                    error: function (data) {
                        MessageToast.show("Ürün eklenemedi!");
                        console.error("Ürün eklenemedi!");
                    }
                });
            } else {
                MessageToast.show("Lütfen gerekli alanları doldurunuz!");
            }
        },

        onWizardStepActivate: function (oEvent) {
            Helper.validateProductInfoStep(this);
        },
        _handleMessageBoxOpen: function (sMessage, sMessageBoxType) {
            MessageBox[sMessageBoxType](sMessage, {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.YES) {
                        this._clearFormFields();
                        this._wizard.discardProgress(this.byId("idProductTypeWizardStep"));
                    }
                }.bind(this)
            });
        },

        _clearFormFields: function () {
            var oView = this.getView();

            oView.byId("idSegmentedButton").setSelectedKey("");
            oView.byId("idTitleInput").setValue("");
            oView.byId("idPriceInput").setValue("");
            oView.byId("idDescriptionTextArea").setValue("");
            oView.byId("idImageUrlInput").setValue("");
            oView.byId("idStateSegmentedButton").setSelectedKey("");
            oView.byId("idMfcDateDatePicker").setDateValue(null);
        },

        onCancelButtonPress: function (oEvent) {
            this._handleMessageBoxOpen("Ürün ekleme işlemini iptal etmek istiyor musunuz?", "warning");
        },

        onTitleInputLiveChange: function (oEvent) {
            Helper.validateProductInfoStep(this);

        },

        onPriceInputLiveChange: function (oEvent) {
            Helper.validateProductInfoStep(this);
        }
    });
});
