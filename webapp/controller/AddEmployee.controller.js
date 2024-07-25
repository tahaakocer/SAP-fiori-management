sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/solvia/management/utils/Helper",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (
	Controller,
	Helper,
	MessageToast,
	MessageBox,

) {
	"use strict";

	return Controller.extend("com.solvia.management.controller.AddEmployee", {
		/**
		 * @override
		 */
		onInit: function () {
			this._wizard = this.byId("idCreateEmployeeWizard");
			var globalModel = this.getOwnerComponent().getModel("globalModel");
			this._sFileContent = null;


		},
		//=======================INFO STEP ACTİVATE AND LIVECHANGES=======================
		onWizardStepInfoActivate: function (oEvent) {
			Helper.validateInfoStep(this);
		},
		onInputLiveChange: function (oEvent) {
			Helper.validateInfoStep(this);
		},

		onSurnameInputLiveChange: function (oEvent) {
			Helper.validateInfoStep(this);
		},
		//=====================CONTACT STEP ACTIVATE AND LIVECHANGES======================
		onWizardStepContactActivate: function (oEvent) {
			Helper.validateContactStep(this);
		},
		onNumberInputLiveChange: function (oEvent) {
			Helper.validateContactStep(this);
		},
		onEmailInputLiveChange: function (oEvent) {
			Helper.validateContactStep(this);
		},
		//====================DEPARTMENT STEP ACTİVATE AND LIVECHANGES====================

		onWizardStepDepartmentActivate: function (oEvent) {
			Helper.validateDepartmentStep(this);
		},
		onSalaryInputLiveChange: function (oEvent) {
			Helper.validateDepartmentStep(this);

		},


		onWizardComplete: function (oEvent) {

		},
		onSubmitButtonPress: function (oEvent) {
			var oDataModel = this.getOwnerComponent().getModel("myOdata");
			var sName = this.byId("idNameInput").getValue();
			var sSurname = this.byId("idSurnameInput").getValue();
			var sDate = this.byId("idBirthdayDatePicker").getDateValue();
			var sNumber = this.byId("idNumberInput").getValue();
			var sEmail = this.byId("idEmailInput").getValue();
			var sDepartment = this.byId("idDepartmentSegmentedButton").getSelectedKey();
			var sSalary = this.byId("idSalaryInput").getValue();
			var oFileUploader = this.byId("idFileUploader");

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

			if (Helper.validationForm(oAddEmpData)) {
				oDataModel.create("/employeeSet", oAddEmpData, {
					method: "POST",
					success: function (data) {
						MessageToast.show("Çalışan başarıyla eklendi.");
					},
					error: function (data) {
						MessageToast.show("Çalışan eklenemedi!");
						console.error("Çalışan eklenemedi!");
					}
				});
			} else {
				MessageToast.show("Lütfen gerekli alanları doldurunuz");
			}

		},
		_clearFormFields: function () {
			var oView = this.getView();

			oView.byId("idNameInput").setValue("");
			oView.byId("idSurnameInput").setValue("");
			oView.byId("idBirthdayDatePicker").setDateValue(null);
			oView.byId("idNumberInput").setValue("");
			oView.byId("idEmailInput").setValue("");
			oView.byId("idDepartmentSegmentedButton").setSelectedKey("");
			oView.byId("idSalaryInput").setValue("");
			oView.byId("idFileUploader").setValue(null);
		},
		_handleMessageBoxOpen: function (sMessage, sMessageBoxType) {
			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === MessageBox.Action.YES) {
						this._clearFormFields();
						this._wizard.discardProgress(this.byId("idInfoWizardStep"));
					}
				}.bind(this)
			});
		},
		onCancelButtonPress: function (oEvent) {
			this._handleMessageBoxOpen("Çalışan ekleme işlemini iptal etmek istiyor musunuz?", "warning");

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
		}
	});
});