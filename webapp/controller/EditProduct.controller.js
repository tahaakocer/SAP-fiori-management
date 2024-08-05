sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"com/solvia/management/utils/Helper"
], function(
	Controller,
	History,
	Helper
) {
	"use strict";

	return Controller.extend("com.solvia.management.controller.EditProduct", {
		onPageNavButtonPress: function(oEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				console.log("Önceki sayfaya gidiliyor");
				window.history.go(-1);
			} else {
				console.log("Router ile Table sayfasına yönlendiriliyor");
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("tableProduct", {});
			}
			Helper.refreshList(this.getOwnerComponent());
		},

		onGeriDnButtonPress: function(oEvent) {
			
		},

		onKaydetButtonPress: function(oEvent) {
			
		},

		onFileUploaderChange: function(oEvent) {
			
		},

		onAvatarPress: function(oEvent) {
			
		}
	});
});