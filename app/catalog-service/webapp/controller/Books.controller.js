sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel",
    "sap/m/MessageBox",
], function (Controller, MessageBox,ODataModel) {
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
        },
        onDeleteRecord: function (oEvent) {
            var oButton = oEvent.getSource();
            var oItem = oButton.getParent();
            var oBindingContext = oItem.getBindingContext("mainService");
            var sPath = oBindingContext.getPath();

            // var oBindingContext = oItem.getBindingContext("mainService");
            // var sPath = oBindingContext.getPath();

            sap.m.MessageBox.confirm("Are you sure you want to delete this record?", {
                actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                onClose: function (sAction) {
                    if (sAction === sap.m.MessageBox.Action.YES) {
                        var oModel = oBindingContext.getModel();
                        oBindingContext.delete("$auto").then(function () {
                            sap.m.MessageBox.success("Record deleted successfully.");
                        }).catch(function (oError) {
                            sap.m.MessageBox.error("Failed to delete the record.");
                        });
                    }
                }
            });
        }
    });
});
