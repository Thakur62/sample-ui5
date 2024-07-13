sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel"
], function (Controller, ODataModel) {
    "use strict";

    return Controller.extend("catalogservice.controller.Books", {

        onInit: function () {
            // Initialization logic can be added here if needed
        },

        // Example of a method to refresh the table data
        onRefresh: function () {
            var oTable = this.byId("booksTable");
            var oBinding = oTable.getBinding("items");
            console.log(oTable);
            oBinding.refresh();
        },

        // Example of a method to handle a row selection event
        onRowSelect: function (oEvent) {
            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext("catalog");
            var sPath = oContext.getPath();

            // Do something with the selected row data
            console.log(sPath);
        }
    });
});
