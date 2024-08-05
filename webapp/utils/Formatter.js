sap.ui.define([], function () {
    "use strict";
    return {
        formatSalary: function (sValue) {
            if (!sValue) {
                return "";
            }
            return parseFloat(sValue).toFixed(2);
        },
        formatPhoneNum: function (sValue) {
            if (!sValue) {
                return "";
            }
            return sValue.toString().slice(9);
        },
        formatDepartment: function (sKey) {
            switch (sKey) {
                case "1":
                    return "ADMIN";
                case "2":
                    return "FINANS";
                case "3":
                    return "BAKIM";
                case "4":
                    return "TEDARIK";
                case "5":
                    return "PAZARLAMA";
                case "6":
                    return "ÜRETİM";
                default:
                    return "ERROR";
            }
        },
        formatDate: function (date) {
            if (!date) {
                return "";
            }
            var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "dd/MM/yyyy"
            });
            return oDateFormat.format(new Date(date));
        },
        formatProductState: function (sKey) {
            switch (sKey) {
                case "1":
                    return "Mağazada";
                case "2":
                    return "Depoda";
                case "3":
                    return "Yolda";
                default:
                    return "ERROR";
            }
        },

        formatProductType: function (sKey) {
            switch (sKey) {
                case '1':
                    return "Teknolojik Alet";
                case '2':
                    return "Beyaz Eşya";
                case '3':
                    return "Diğer";
                default:
                    return "ERROR";
            }
        },

        getStateColor: function (sKey) {
            switch (sKey) {
                case "1": // Mağazada
                    return "Success";
                case "2": // Depoda
                    return "Warning";
                case "3": // Yolda
                    return "Information";
                default:
                    return "None"; // ERROR durumu için
            }
        },

        formatPrice: function (price) {
            return parseFloat(price).toFixed(2);
        },
        formatGroupHeader: function (oContext) {
            var sKey = oContext.getProperty("Type");

            switch (sKey) {
                case "1":
                    return "Teknolojik Aletler";
                case "2":
                    return "Beyaz Eşyalar";
                case "3":
                    return "Diğer Ürünler";
                default:
                    return "ERROR";
            }
        }
    };
});
