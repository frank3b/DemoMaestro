sap.ui.controller("app.master.SettingsCategories", {

	onInit : function() {

	},

	onListItemTap : function(oEvent) {
		// Check to which category to navigate
		if (oEvent.oSource.data(sKeyTheme)) {
			sap.ui.getCore().getEventBus().publish("nav", "to", {
				viewId : "app.details.ThemeSetting",
				data : ""
			});
		}
	},

	onNavButtonTap : function() {
		
		//On tablet,we set the details section to empty when returning back to the data list 
		if (!jQuery.device.is.phone) {
			sap.ui.getCore().getEventBus().publish("nav", "to", {
	    		viewId : "app.details.Empty",
	    		data : ""
	        });
		}
		sap.ui.getCore().getEventBus().publish("nav", "back");

	},

});