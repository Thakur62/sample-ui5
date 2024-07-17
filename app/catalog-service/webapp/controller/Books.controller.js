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
            var oContext = oSelectedItem.getBindingContext("mainService");
            var sBookId = oContext.getProperty("ID");
            console.log("sBookId ::: " + sBookId);
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("BookDetail", {
                ID: sBookId
            });
        },
        onAddRecord: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("BookDetail", {
                ID: "new"
            });
            }
    });
});
