sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/solvia/management/utils/Validations",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (
    Controller,
    Validations,
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
            this._sFileContent = null;


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
            var sImageUrl = oView.byId("idFileUploader").getValue();
            var sState = oView.byId("idStateSegmentedButton").getSelectedKey();
            var sDate = oView.byId("idMfcDateDatePicker").getDateValue();

            var oEmpData = {
                Title: sTitle,
                Price: sPrice,
                Description: sDescription,
                Type: sType,
                State: sState,
                MfcDate: sDate,
                Pimage: this._sFileContent
            };
            console.log(oEmpData);

            if (Validations.validationForm(oEmpData)) {
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
            Validations.validateProductInfoStep(this);
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
            Validations.validateProductInfoStep(this);

        },

        onPriceInputLiveChange: function (oEvent) {
            Validations.validateProductInfoStep(this);
        },

        onFileUploaderChange: function (oEvent) {
            var oFileUploader = oEvent.getSource();
            var aFiles = oEvent.getParameter("files");
            if (aFiles && aFiles.length > 0) {
                var oFile = aFiles[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    var vContent = e.target.result;
                    this._sFileContent = vContent.split(",")[1];
                    const byteString = atob(this._sFileContent);
                    console.log(byteString);
                }.bind(this);
                reader.readAsDataURL(oFile);
            }
        },

        onFileUploaderUploadComplete: function (oEvent) {
            var sResponse = oEvent.getParameter("response"),
                aRegexResult = /\d{4}/.exec(sResponse),
                iHttpStatusCode = aRegexResult && parseInt(aRegexResult[0]),
                sMessage;

            if (sResponse) {
                sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
                MessageToast.show(sMessage);
            }
        }
    });
});
