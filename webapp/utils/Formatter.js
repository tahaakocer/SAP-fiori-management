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
                    return "TEDARİK";
                case "4":
                    return "PAZARLAMA";
                case "5":
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
        }
    };
});
