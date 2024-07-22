sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (
    Controller
) {
    "use strict";

    return Controller.extend("com.solvia.management.controller.AddProduct", {
        /**
         * @override
         */
        onInit: function () {
            this._wizard = this.byId("idCreateProductWizard");
            this._oNavContainer = this.byId("idWizardNavContainer");
            this._oWizardContentPage = this.byId("idWizardContentPage");


        },

        onWizardComplete: function (oEvent) {
            this._oNavContainer.to(this.byId("idWizardReviewPage"));

        },

        onSubmitButtonPress: function (oEvent) {

        },

        onCancelButtonPress: function (oEvent) {

        },

        onSegmentedButtonSelectionChange: function (oEvent) {

        },
		onWizardStepActivate: function(oEvent) {
			
		},

		onProductNameInputLiveChange: function(oEvent) {
			
		},

		onProductWeightInputLiveChange: function(oEvent) {
			
		},
		onImageWizardStepActivate: function(oEvent) {
			
		}
    });
});