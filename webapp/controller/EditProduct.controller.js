sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"com/solvia/management/utils/Helper",
	"com/solvia/management/utils/Formatter",
	"sap/m/MessageToast",
	"com/solvia/management/utils/Validations",
	"sap/m/MessageBox"
], function (
	Controller,
	History,
	Helper,
	Formatter,
	MessageToast,
	Validations,
	MessageBox
) {
	"use strict";


	return Controller.extend("com.solvia.management.controller.EditProduct", {
		formatter: Formatter,
		/**
		 * @override
		 */
		onInit: function () {
			var globalModel = this.getOwnerComponent().getModel("globalModel");
			this._sFileContent = null;
			console.log("on init calisti");

		},
		/**
		 * @override
		 */
		onBeforeRendering: function() {
			console.log("beforeRendering calisti");

		
		},
		/**
		 * @override
		 */
		onAfterRendering: function() {
			console.log("afterRendering calisti");
		
		},
		onPageNavButtonPress: function (oEvent) {
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

		onGeriDnButtonPress: function (oEvent) {
			var that = this;

			var globalModel = this.getOwnerComponent().getModel("globalModel");
			//DEĞİŞİKLİK VAR MI? KOŞULU
			if (globalModel.getProperty("/isEnabled")) {
				MessageBox.warning("Değişikliklerinizi kaydedip çıkmak istiyor musunuz?", {
					actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
					emphasizedAction: MessageBox.Action.OK,
					onClose: function (sAction) {
						if (sAction == MessageBox.Action.OK) {
							// KAYDETME
							that.onKaydetButtonPress();

							// GERİ DONME
							var oHistory = History.getInstance();
							var sPreviousHash = oHistory.getPreviousHash();

							if (sPreviousHash !== undefined) {
								console.log("Önceki sayfaya gidiliyor");
								window.history.go(-1);
							} else {
								console.log("Router ile Table sayfasına yönlendiriliyor");
								var oRouter = that.getOwnerComponent().getRouter();
								oRouter.navTo("tableProduct", {});
							}
							sap.ushell.Container.getRenderer("fiori2").showHeaderItem("backBtn", true);

							Helper.refreshTable(that.getOwnerComponent());

						}

					},
					dependentOn: this.getView()
				});
			}
			else {
				var oHistory = History.getInstance();
				var sPreviousHash = oHistory.getPreviousHash();

				if (sPreviousHash !== undefined) {
					console.log("Önceki sayfaya gidiliyor");
					window.history.go(-1);
				} else {
					console.log("Router ile Table sayfasına yönlendiriliyor");
					var oRouter = that.getOwnerComponent().getRouter();
					oRouter.navTo("tableProduct", {});
				}
				sap.ushell.Container.getRenderer("fiori2").showHeaderItem("backBtn", true);

				Helper.refreshTable(that.getOwnerComponent());
			}

			var oView = this.getView();
			var globalModel = this.getOwnerComponent().getModel("globalModel");
			var oTitle = oView.byId("idTitleInput");
			var oDescription = oView.byId("idDescriptionTextArea");
			var oPrice = oView.byId("idPriceInput");
			var oType = oView.byId("idSelect");
			var oQuantity = oView.byId("idQuantityInput");
			var oMfcDate = oView.byId("idMfcDateDatePicker");
			var oState = oView.byId("idStateSegmentedButton");

			oTitle.setEditable(false);
			oDescription.setEditable(false);
			oPrice.setEditable(false);
			oType.setEditable(false);
			oQuantity.setEditable(false);
			oMfcDate.setEditable(false);
			oState.setEnabled(false);
		},

		onKaydetButtonPress: function () {
			var oDataModel = this.getOwnerComponent().getModel("myOdata");
			var globalModel = this.getOwnerComponent().getModel("globalModel");
			var sId = this.byId("idIdInput").getValue();
			var sTitle = this.byId("idTitleInput").getValue();
			var sDescription = this.byId("idDescriptionTextArea").getValue();
			var sPrice = this.byId("idPriceInput").getValue();
			var sType = this.byId("idSelect").getSelectedKey();
			var sQuantity = Number(this.byId("idQuantityInput").getValue());
			var sMfcDate = this.byId("idMfcDateDatePicker").getDateValue();
			var sState = this.byId("idStateSegmentedButton").getSelectedKey();
			var oAvatar = this.byId("idAvatar");
			this._sFileContent = oAvatar.getSrc().split(",")[1];

			var oEmpData = {
				Title: sTitle,
				Description: sDescription,
				Price: sPrice,
				Type: sType,
				Quantity: sQuantity,
				MfcDate: sMfcDate,
				State: sState,
				Pimage: this._sFileContent
			};
			if (Validations.validationForm(oEmpData)) {
				const url = `/productSet(Id='${sId}')`;

				oDataModel.update(url, oEmpData,
					{
						method: "PUT",
						success: function () {
							MessageToast.show("Ürün başarıyla güncellendi");
							globalModel.setProperty("/isEnabled",false);
							
						},
						error: function () {
							MessageToast.show("Ürün güncellenirken bir hata oluştu");
						}
					}
				)
			} else {
				MessageToast.show("Lütfen gerekli alanları doldurunuz");
			}

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

		onDzenleButtonPress: function (oEvent) {
			var oView = this.getView();
			var globalModel = this.getOwnerComponent().getModel("globalModel");
			this._isEnabled = globalModel.getProperty("/isEnabled");
			
			var oTitle = oView.byId("idTitleInput");
			var oDescription = oView.byId("idDescriptionTextArea");
			var oPrice = oView.byId("idPriceInput");
			var oType = oView.byId("idSelect");
			var oQuantity = oView.byId("idQuantityInput");
			var oMfcDate = oView.byId("idMfcDateDatePicker");
			var oState = oView.byId("idStateSegmentedButton");

			this._isEnabled = !this._isEnabled;
			globalModel.setProperty("/isEnabled", this._isEnabled);
			oTitle.setEditable(this._isEnabled);
			oDescription.setEditable(this._isEnabled);
			oPrice.setEditable(this._isEnabled);
			oType.setEditable(this._isEnabled);
			oQuantity.setEditable(this._isEnabled);
			oMfcDate.setEditable(this._isEnabled);
			oState.setEnabled(this._isEnabled);



		}
	});
}); 