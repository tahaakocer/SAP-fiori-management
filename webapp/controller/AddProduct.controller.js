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
            this._oNavContainer = this.byId("idWizardNavContainer");
            this._oWizardContentPage = this.byId("idWizardContentPage");
        },

        onWizardComplete: function (oEvent) {
            this._oNavContainer.to(this.byId("idWizardReviewPage"));
        },

        onSubmitButtonPress: function (oEvent) {
            var oDataModel = this.getOwnerComponent().getModel("myOdata");
            var oView = this.getView();
            var iType = oView.byId("idSegmentedButton");
            var iTitle = oView.byId("idTitleInput");
            var iPrice = oView.byId("idPriceInput");
            var iDescription = oView.byId("idDescriptionTextArea");
            var iImageUrl = oView.byId("idImageUrlInput");
            var iState = oView.byId("idStateSegmentedButton");
            var iDate = oView.byId("idMfcDateDatePicker");

            var sType = iType.getSelectedKey();
            var sTitle = iTitle.getValue();
            var sPrice = iPrice.getValue();
            var sDescription = iDescription.getValue();
            var sImageUrl = iImageUrl.getValue();
            var sState = iState.getSelectedKey();
            var sDate = iDate.getDateValue();

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
        validateInfoStep: function () {
            var globalModel = this.getOwnerComponent().getModel("globalModel");
            var title = this.byId("idTitleInput").getValue();
            var price = parseInt(this.byId("idPriceInput").getValue());

            if (isNaN(price)) {
                this._wizard.setCurrentStep(this.byId("idProductInfoWizardStep"));
                globalModel.setProperty("/productPriceState", "Error");
            } else {
                globalModel.setProperty("/productPriceState", "None");
            }

            if (title.length < 6) {
                this._wizard.setCurrentStep(this.byId("idProductInfoWizardStep"));
                globalModel.setProperty("/productTitleState", "Error");
            } else {
                globalModel.setProperty("/productTitleState", "None");
            }

            if (title.length < 6 || isNaN(price)) {
                this._wizard.invalidateStep(this.byId("idProductInfoWizardStep"));
            } else {
                this._wizard.validateStep(this.byId("idProductInfoWizardStep"));
            }
        },

        onWizardStepActivate: function (oEvent) {
            this.validateInfoStep();
        },

        onInputLiveChange: function (oEvent) {
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
            this.validateInfoStep();

        },

        onPriceInputLiveChange: function (oEvent) {
            this.validateInfoStep();
        }
    });
});
