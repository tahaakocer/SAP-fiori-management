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
        }
    };

    return Helper;
});
