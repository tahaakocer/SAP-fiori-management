sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("com.solvia.management.controller.Main", {
            onInit: function () {
                var globalModel = this.getOwnerComponent().getModel("globalModel");
            }
        });
    });
