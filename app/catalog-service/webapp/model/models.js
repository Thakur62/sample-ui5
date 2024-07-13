sap.ui.define([
    "sap/ui/model/odata/v4/ODataModel"
], 
function (ODataModel) {
    "use strict";

    return {
        /**
         * Creates and returns an ODataModel for the catalog service
         */
        createCatalogModel: function () {
            var sServiceUrl = "http://localhost:8080/odata/v4/CatalogService/"; // Base URL of the OData V4 service
            var oModel = new ODataModel({
                serviceUrl: sServiceUrl,
                synchronizationMode: "None"
            });
            return oModel;
        }
    };
});
