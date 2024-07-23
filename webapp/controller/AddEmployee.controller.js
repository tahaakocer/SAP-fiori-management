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
			var sImage = this.byId("idFileUploader").getValue();
			console.log(sImage);


		},

		onCancelButtonPress: function (oEvent) {

		},


		onWizardStepImageActivate: function (oEvent) {

		}
	});
});