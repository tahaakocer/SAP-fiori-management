sap.ui.define([], function () {
    "use strict";

    var Helper = {
        validationForm: function (oEmpData) {
            for (var key in oEmpData) {
                if (oEmpData[key] === "" || oEmpData[key] === null) {
                    return false;
                }
            }
            if (oEmpData.Point < 0 || oEmpData.Point > 100) {
                return false;
            }
            return true;
        },
        validateProductInfoStep: function (context) {
            var globalModel = context.getOwnerComponent().getModel("globalModel");
            var title = context.byId("idTitleInput").getValue();
            var price = parseInt(context.byId("idPriceInput").getValue());

            if (isNaN(price)) {
                context._wizard.setCurrentStep(context.byId("idProductInfoWizardStep"));
                globalModel.setProperty("/productPriceState", "Error");
            } else {
                globalModel.setProperty("/productPriceState", "None");
            }

            if (title.length < 6) {
                context._wizard.setCurrentStep(context.byId("idProductInfoWizardStep"));
                globalModel.setProperty("/productTitleState", "Error");
            } else {
                globalModel.setProperty("/productTitleState", "None");
            }

            if (title.length < 6 || isNaN(price)) {
                context._wizard.invalidateStep(context.byId("idProductInfoWizardStep"));
            } else {
                context._wizard.validateStep(context.byId("idProductInfoWizardStep"));
            }
        },

        validateInfoStep: function (context) {
            var globalModel = context.getOwnerComponent().getModel("globalModel");
            var name = context.byId("idNameInput").getValue();
            var surname = context.byId("idSurnameInput").getValue();


            if (name.length < 2) {
                context._wizard.setCurrentStep(context.byId("idInfoWizardStep"));
                globalModel.setProperty("/employeeNameState", "Error");
            } else {
                globalModel.setProperty("/employeeNameState", "None");
            }
            if (surname.length < 2) {
                context._wizard.setCurrentStep(context.byId("idInfoWizardStep"));
                globalModel.setProperty("/employeeSurnameState", "Error");
            } else {
                globalModel.setProperty("/employeeSurnameState", "None");
            }
            if (surname.length < 2) {
                context._wizard.setCurrentStep(context.byId("idInfoWizardStep"));
                globalModel.setProperty("/employeeSurnameState", "Error");
            } else {
                globalModel.setProperty("/employeeSurnameState", "None");
            }
            if (name.length < 2 || surname.length < 2) {
                context._wizard.invalidateStep(context.byId("idInfoWizardStep"));
            } else {
                context._wizard.validateStep(context.byId("idInfoWizardStep"));
            }
        },
        validateContactStep: function (context) {
            var globalModel = context.getOwnerComponent().getModel("globalModel");
            //Bunu normalde parseint yapiyoduk eger bisey bozulursa burayı unutma 
            var number = context.byId("idNumberInput").getValue();
            var email = context.byId("idEmailInput").getValue();

            if (number.length < 11 || isNaN(number)) {
                context._wizard.setCurrentStep(context.byId("idContactWizardStep"));
                globalModel.setProperty("/employeeNumState", "Error");
            } else {
                globalModel.setProperty("/employeeNumState", "None");
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //intten aldim
            if (!emailRegex.test(email)) {
                context._wizard.setCurrentStep(context.byId("idContactWizardStep"));
                globalModel.setProperty("/employeeMailState", "Error");
            } else {
                globalModel.setProperty("/employeeMailState", "None");
            }
            if (number.length < 11 || isNaN(number) || !emailRegex.test(email)) {
                context._wizard.invalidateStep(context.byId("idContactWizardStep"));
            } else {
                context._wizard.validateStep(context.byId("idContactWizardStep"));
            }
        },
        validateDepartmentStep: function (context) {
            var globalModel = context.getOwnerComponent().getModel("globalModel");
            var salary = parseInt(context.byId("idSalaryInput").getValue());

            if (isNaN(salary)) {
                context._wizard.setCurrentStep(context.byId("idDepartmentWizardStep"));
                globalModel.setProperty("/employeeSalaryState", "Error");
                context._wizard.invalidateStep(context.byId("idDepartmentWizardStep"));

            } else {
                globalModel.setProperty("/employeeSalaryState", "None");
                context._wizard.validateStep(context.byId("idDepartmentWizardStep"));
            }
        },
    };

    return Helper;
});
