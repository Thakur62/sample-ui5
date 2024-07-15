sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("catalogservice.controller.BookDetail", {

        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("BookDetail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sBookId = oEvent.getParameter("arguments").ID; // We get the ID directly here!!!!
            console.log("Book id here " +sBookId)
            this.getView().bindElement({
                path: "/Books(" + sBookId + ")", // http://localhost:8080/odata/v4/CatalogService/Books(1) works for ODATA CDS APIs
                model: "mainService"
            });
        },
        onSave: function () {
            var oModel = this.getView().getModel("mainService");
            console.log("Book id here " +oModel)
            // Get the binding context and request a batch change
            var oContext = this.getView().getBindingContext("mainService");
            oModel.submitBatch("batchGroup").then(function() {
                MessageToast.show("Changes saved successfully.");
            }).catch(function(oError) {
                MessageToast.show("Error saving changes: " + oError.message);
            });
        },

        onExit: function () {
            var oModel = this.getView().getModel("mainService");
            if (oModel && oModel.refresh) {
                oModel.refresh();
            }
            this.getOwnerComponent().getRouter().navTo("Books")
        }

    });
});
