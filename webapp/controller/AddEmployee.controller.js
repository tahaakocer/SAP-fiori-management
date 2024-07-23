sap.ui.define([
	"sap/ui/core/mvc/Controller",

], function (
	Controller,

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
		//==================================VALIDATIONS==================================
		validateInfoStep: function () {
			var globalModel = this.getOwnerComponent().getModel("globalModel");
			var name = this.byId("idNameInput").getValue();
			var surname = this.byId("idSurnameInput").getValue();
			

			if (name.length < 2) {
				this._wizard.setCurrentStep(this.byId("idInfoWizardStep"));
				globalModel.setProperty("/employeeNameState", "Error");
			} else {
				globalModel.setProperty("/employeeNameState", "None");
			}
			if (surname.length < 2) {
				this._wizard.setCurrentStep(this.byId("idInfoWizardStep"));
				globalModel.setProperty("/employeeSurnameState", "Error");
			} else {
				globalModel.setProperty("/employeeSurnameState", "None");
			}
			if (surname.length < 2) {
				this._wizard.setCurrentStep(this.byId("idInfoWizardStep"));
				globalModel.setProperty("/employeeSurnameState", "Error");
			} else {
				globalModel.setProperty("/employeeSurnameState", "None");
			}
			if (name.length < 2 || surname.length < 2) {
				this._wizard.invalidateStep(this.byId("idInfoWizardStep"));
			} else {
				this._wizard.validateStep(this.byId("idInfoWizardStep"));
			}
		},
		validateContactStep: function () {
			var globalModel = this.getOwnerComponent().getModel("globalModel");
			//Bunu normalde parseint yapiyoduk eger bisey bozulursa burayı unutma 
			var number = this.byId("idNumberInput").getValue();
			var email = this.byId("idEmailInput").getValue();

			if (number.length < 11 || isNaN(number)) {
				this._wizard.setCurrentStep(this.byId("idContactWizardStep"));
				globalModel.setProperty("/employeeNumState", "Error");
			} else {
				globalModel.setProperty("/employeeNumState", "None");
			}
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //intten aldim
			if (!emailRegex.test(email)) {
				this._wizard.setCurrentStep(this.byId("idContactWizardStep"));
				globalModel.setProperty("/employeeMailState", "Error");
			} else {
				globalModel.setProperty("/employeeMailState", "None");
			}
			if (number.length < 11 || isNaN(number) || !emailRegex.test(email)) {
				this._wizard.invalidateStep(this.byId("idContactWizardStep"));
			} else {
				this._wizard.validateStep(this.byId("idContactWizardStep"));
			}
		},
		validateDepartmentStep: function () {
			var globalModel = this.getOwnerComponent().getModel("globalModel");
			var salary = parseInt(this.byId("idSalaryInput").getValue());

			if (isNaN(salary)) {
				this._wizard.setCurrentStep(this.byId("idDepartmentWizardStep"));
				globalModel.setProperty("/employeeSalaryState", "Error");
				this._wizard.invalidateStep(this.byId("idDepartmentWizardStep"));

			} else {
				globalModel.setProperty("/employeeSalaryState", "None");
				this._wizard.validateStep(this.byId("idDepartmentWizardStep"));
			}
		},
		//=======================INFO STEP ACTİVATE AND LIVECHANGES=======================
		onWizardStepInfoActivate: function (oEvent) {
			this.validateInfoStep();
		},
		onInputLiveChange: function (oEvent) {
			this.validateInfoStep();
		},

		onSurnameInputLiveChange: function (oEvent) {
			this.validateInfoStep();
		},
		//=====================CONTACT STEP ACTIVATE AND LIVECHANGES======================
		onWizardStepContactActivate: function (oEvent) {
			this.validateContactStep();
		},
		onNumberInputLiveChange: function (oEvent) {
			this.validateContactStep();
		},
		onEmailInputLiveChange: function (oEvent) {
			this.validateContactStep();
		},
		//====================DEPARTMENT STEP ACTİVATE AND LIVECHANGES====================

		onWizardStepDepartmentActivate: function (oEvent) {
			this.validateDepartmentStep();
		},
		onSalaryInputLiveChange: function (oEvent) {
			this.validateDepartmentStep();

		},


		onWizardComplete: function (oEvent) {

		},
		onSubmitButtonPress: function (oEvent) {

		},

		onCancelButtonPress: function (oEvent) {

		},


		onWizardStepImageActivate: function (oEvent) {

		}
	});
});