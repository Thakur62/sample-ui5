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
            var oModel = this.getView().getModel("mainService");
            var oContext;
            if(sBookId === "new") {
                oContext = oModel.bindList("/Books").create({
                    title: "",
                    stock: 0
                })   
                this.getView().setBindingContext(oContext, "mainService");
            } else {
                this.getView().bindElement({
                    path: "/Books(" + sBookId + ")", // http://localhost:8080/odata/v4/CatalogService/Books(1) works for ODATA CDS APIs
                    model: "mainService"
                });
            }

        },
        onSave: function () {
            var oModel = this.getView().getModel("mainService");
            var oRouter = this.getOwnerComponent().getRouter(); 
            oModel.submitBatch("changes").then(function() {
                MessageToast.show("Changes saved successfully.");
                oRouter.navTo("Books")
                oModel.refresh();
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
