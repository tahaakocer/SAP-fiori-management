sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/solvia/management/utils/Formatter",
    "com/solvia/management/utils/Validations",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
    "com/solvia/management/utils/Helper"
], function (
    Controller,
	Formatter,
	Validations,
	MessageToast,
	History,
	Helper
) {
    "use strict";

    return Controller.extend("com.solvia.management.controller.Edit", {
        /**
         * @override
         */
        formatter: Formatter,
        onInit: function () {
            var globalModel = this.getOwnerComponent().getModel("globalModel");
            this._sFileContent = null;
        },

        onFileUploaderChange: function (oEvent) {
            var oFileUploader = oEvent.getSource();
            var oFile = oEvent.getParameter("files")[0];

            if (oFile) {
                var oReader = new FileReader();

                oReader.onload = function (e) {
                    var sBase64 = e.target.result;
                    this._sFileContent = sBase64.split(",")[1];;
                    var sAvatarImage = this._sFileContent;

                    // Avatar'ı güncelle
                    var oAvatar = this.byId("idAvatar");
                    oAvatar.setSrc("data:image/jpeg;base64," + sAvatarImage);
                }.bind(this);

                oReader.readAsDataURL(oFile);
            }
        },

        onAvatarPress: function (oEvent) {
            this.byId("idFileUploader").$().find("input").click();
        },

        onKaydetButtonPress: function (oEvent) {
            var oDataModel = this.getOwnerComponent().getModel("myOdata");
            var sId = this.byId("idIdInput").getValue();
            var sName = this.byId("idNameInput").getValue();
            var sSurname = this.byId("idSurnameInput").getValue();
            var sDate = this.byId("idBirthdayDatePicker").getDateValue();
            var sNumber = this.byId("idPhoneNumbersInput").getValue();
            var sEmail = this.byId("idEmailInput").getValue();
            var sDepartment = this.byId("idSelect").getSelectedKey();
            var sSalary = this.byId("idSalaryInput").getValue();

            var oAvatar = this.byId("idAvatar");
            this._sFileContent = oAvatar.getSrc().split(",")[1];
            console.log(this._sFileContent);
            var oAddEmpData = {
                Name: sName,
                Surname: sSurname,
                Salary: sSalary,
                Department: sDepartment,
                PhoneNumber: sNumber,
                Birthday: sDate,
                Email: sEmail,
                Pimage: this._sFileContent
            }

            if (Validations.validationForm(oAddEmpData)) {
                const url = `/employeeSet(Id='${sId}')`;
                oDataModel.update(url, oAddEmpData, {
                    method: "PUT",
                    success: function () {
                        MessageToast.show("Çalışan başarıyla güncellendi!");
                    },
                    error: function () {
                        MessageToast.show("Çalışan güncellenirken bir hata oluştu.");
                        console.error("Çalışan güncellenemedi!");
                    }
                });
            } else {
                MessageToast.show("Lütfen gerekli alanları doldurunuz");
            }
        },

        onGeriDnButtonPress: function (oEvent) {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                console.log("Önceki sayfaya gidiliyor");
                window.history.go(-1);
            } else {
                console.log("Router ile Table sayfasına yönlendiriliyor");
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("tableEmployee", {});
            }
            Helper.refreshTable(this.getOwnerComponent());

        },

    });
});