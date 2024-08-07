/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "catalogservice/model/models"
],
function(UIComponent, models) {
    "use strict";

    return UIComponent.extend("catalogservice.Component", {
        metadata: {
            manifest: "json"
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // enable routing
            this.getRouter().initialize();

            // create and set the ODataModel for the catalog service
            // var oCatalogModel = models.createCatalogModel();
            // this.setModel(oCatalogModel, "catalog");
        }
    });
});
