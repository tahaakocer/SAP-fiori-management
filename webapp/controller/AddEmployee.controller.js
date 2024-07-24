sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/solvia/management/utils/Helper"
], function (
	Controller,
	Helper,

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

			
			console.log(this._sFileContent);


		},

		onCancelButtonPress: function (oEvent) {

		},


		onWizardStepImageActivate: function (oEvent) {

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