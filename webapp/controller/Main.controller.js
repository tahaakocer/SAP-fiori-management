sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageToast",
    "com/solvia/management/utils/Helper",
    "com/solvia/management/utils/Formatter"
],
    function (Controller,
	BusyIndicator,
	MessageToast,
	Helper,
	Formatter) {
        "use strict";

        return Controller.extend("com.solvia.management.controller.Main", {
            formatter: Formatter,
            onInit: function () {
                var globalModel = this.getOwnerComponent().getModel("globalModel");
                var oDataModel = this.getOwnerComponent().getModel("myOdata");

                oDataModel.read("/productSet", {
                    success: function (oData) {
                        const results = oData.results;
                        const range = results.slice(1, 4)
                        globalModel.setProperty("/getProductsForMain", range);

                        const states = [
                            { id: "1", name: "magaza" },
                            { id: "2", name: "depo" },
                            { id: "3", name: "yolda" }
                        ];
                        let ratios = {};

                        states.forEach(state => {
                            const count = results.filter(product => product.State === state.id).length;
                            ratios[state.name + "Ratio"] = Helper.calculateRatio(count, results.length);
                            ratios[state.name + "Count"] = count;
                        });
                        globalModel.setProperty("/getProductsLength", results.length);
                        globalModel.setProperty("/productRatio", ratios);
                    },
                    error: function (oError) {
                        BusyIndicator.hide();
                        console.error("Products data okunamadı");
                        MessageToast.show("Veri yüklenirken bir hata oluştu");
                    }
                })
                BusyIndicator.show();
                oDataModel.read("/employeeSet", {
                    success: function (oData) {
                        BusyIndicator.hide();
                        const results = oData.results;
                        const range = results.slice(1, 4)
                        globalModel.setProperty("/getEmployeesForMain", range);

                        const departments = [
                            { id: "1", name: "admin" },
                            { id: "2", name: "finance" },
                            { id: "3", name: "maintenance" },
                            { id: "4", name: "procurement" },
                            { id: "5", name: "marketing" },
                            { id: "6", name: "production" }
                        ];

                        const genders = [
                            { id: "E", name: "male" },
                            { id: "K", name: "female" }
                        ];
                        let ratios = {};

                        departments.forEach(department => {
                            const count = results.filter(employee => employee.Department === department.id).length;
                            ratios[department.name + "Ratio"] = Helper.calculateRatio(count, results.length);
                            //adminRatio gibi
                            ratios[department.name + "Count"] = count;
                        });

                        genders.forEach(gender => {
                            const count = results.filter(employee => employee.Gender === gender.id).length;
                            ratios[gender.name + "Ratio"] = Helper.calculateRatio(count, results.length);
                            ratios[gender.name + "Count"] = count;
                        });

                        globalModel.setProperty("/getEmployeesLength", results.length);
                        globalModel.setProperty("/employeeRatio", ratios);


                    },
                    error: function (oError) {
                        BusyIndicator.hide();
                        console.error("Employee data okunamadı");
                        MessageToast.show("Veri yüklenirken bir hata oluştu");
                    }
                });
            },

            onGitButtonEmployeePress: function (oEvent) {
                var router = this.getOwnerComponent().getRouter();
                router.navTo("addEmployee");
            },

            onGitButtonProductPress: function (oEvent) {
                var router = this.getOwnerComponent().getRouter();
                router.navTo("addProduct");
            },

            onDahaFazlasnGrButtonPress: function (params) {
                var router = this.getOwnerComponent().getRouter();
                router.navTo("tableEmployee");
            },

            onInteractiveDonutChartSelectionChanged: function (oEvent) {
                var oSegment = oEvent.getParameter("segment");
                MessageToast.show("The selection changed: " + oSegment.getLabel() + " " + ((oSegment.getSelected()) ? "selected" : "not selected"));
            }
        });
    });
