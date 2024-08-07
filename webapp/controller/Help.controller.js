sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "com/solvia/management/utils/Validations"
], function (
    Controller,
    MessageToast,
    Validations
) {
    "use strict";

    return Controller.extend("com.solvia.management.controller.Help", {

        onGnderButtonPress: function (oEvent) {
            var oDataModel = this.getOwnerComponent().getModel("myOdata");
            var oView = this.getView();

            var sName = oView.byId("idNameInput").getValue();
            var sSurname = oView.byId("idSurnameInput").getValue();
            var sEmail = oView.byId("idEmailInput").getValue();
            var sDescription = oView.byId("idDescriptionTextArea").getValue();

            var oAddEmpData = {
                Name: sName,
                Surname: sSurname,
                Email: sEmail,
                Message: sDescription
            };

            if (Validations.validationForm(oAddEmpData)) {
                oDataModel.create("/mailSet", oAddEmpData, {
                    method: "POST",
                    success: function () {
                        MessageToast.show("Mesajınız başarıyla iletilmiştir. En kısa sürede mail üzerinden dönüş sağlanacaktır.")
                    },
                    error: function () {
                        MessageToast.show("Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.")
                    }
                })
            } else {
                MessageToast.show("Lütfen gerekli alanları doldurunuz!");
            }

        }
    });
});