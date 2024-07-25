sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"com/solvia/management/utils/Helper",
	"com/solvia/management/utils/Formatter"
], function (
	Controller,
	JSONModel,
	Filter,
	FilterOperator,
	Helper,
	Formatter
) {
	"use strict";

	return Controller.extend("com.solvia.management.controller.TableEmployee", {
		formatter: Formatter,
	
		/**
		 * @override
		 */
		// ======================================================================================
		// =======================================ON INIT========================================
		// ======================================================================================
		onInit: function () {
			const oView = this.getView();
			const globalModel = this.getOwnerComponent().getModel("globalModel");
			const oDataModel = this.getOwnerComponent().getModel("myOdata");

			oView.setModel(new JSONModel({
				globalFilter: "",
				availabilityFilterOn: false,
				cellFilterOn: false
			}), "ui");

			this._oGlobalFilter = null;
			this._oPriceFilter = null;
			
			Helper.refreshTable(this.getOwnerComponent());
		},
		// ======================================================================================
		// ====================================FILTER METHODS====================================
		// ======================================================================================
		_filter: function () {
			let oFilter = null;

			if (this._oGlobalFilter && this._oPriceFilter) {
				oFilter = new Filter([this._oGlobalFilter, this._oPriceFilter], true);
			} else if (this._oGlobalFilter) {
				oFilter = this._oGlobalFilter;
			} else if (this._oPriceFilter) {
				oFilter = this._oPriceFilter;
			}

			this.byId("idTable").getBinding().filter(oFilter, "Application");
		},
		filterGlobally: function (oEvent) {
			const sQuery = oEvent.getParameter("query");
			this._oGlobalFilter = null;

			if (sQuery) {
				this._oGlobalFilter = new Filter([
					new Filter("Name", FilterOperator.Contains, sQuery),
					new Filter("Surname", FilterOperator.Contains, sQuery)
				], false);
			}

			this._filter();
		},
		clearAllFilters: function (oEvent) {
			const oTable = this.byId("idTable");

			const oUiModel = this.getView().getModel("ui");
			oUiModel.setProperty("/globalFilter", "");
			oUiModel.setProperty("/availabilityFilterOn", false);

			this._oGlobalFilter = null;
			this._oPriceFilter = null;
			this._filter();

			const aColumns = oTable.getColumns();
			for (let i = 0; i < aColumns.length; i++) {
				oTable.filter(aColumns[i], null);
			}
		}
		,
		onButtonClearFiltersPress: function (oEvent) {

		},

		onGlobalFilterSearchFieldSearch: function (oEvent) {

		},

		onAvatarPress: function (oEvent) {

		}
	});
});