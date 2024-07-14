sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("catalogservice.controller.BookDetail", {

        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("BookDetail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sBookId = oEvent.getParameter("arguments").ID;
            console.log("Book id here " +sBookId)
            this.getView().bindElement({
                path: "/Books(" + sBookId + ")",
                model: "mainService"
            });
        }
    });
});
