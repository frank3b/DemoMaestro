sap.ui.jsview("app.details.ThemeSetting", {

	onBeforeShow : function(oEvent) {
		return;
	},

	getControllerName : function() {
		return "app.details.ThemeSetting";
	},

	createContent : function(oController) {

		// Check which theme was selected
		//var bBlueCrystalSelected = !oStorage.get(sKeyTheme)
		//		|| oStorage.get(sKeyTheme) == "sap_bluecrystal";
		
		var bBlueCrystalSelected = false;
		var bGoldreflection = false;
		var bCustomSelected = false;
		switch (oStorage.get(sKeyTheme)) {
			case "sap_goldreflection":
				bGoldreflection = true;
				break;
			case "sap_bluecrystal":
				bBlueCrystalSelected = true;
				break;
			case "custom_bluecrystal":
				bCustomSelected = true;
				break;
			default:	
				bCustomSelected = true;
				break;
		}
		
		this.page = new sap.m.Page({
			showNavButton : jQuery.device.is.phone,
			navButtonTap : [ oController.onNavButtonTap, oController ],
			content : [ new sap.m.List({
				mode : sap.m.ListMode.SingleSelect,
				select : [ oController.onListItemTap ],
				items : [ 					
					new sap.m.StandardListItem({
						title : "sap_bluecrystal",
						selected : bBlueCrystalSelected,
					}).data(sKeyTheme, "sap_bluecrystal"), 
					new sap.m.StandardListItem({
						title : "custom_maestro",
						selected : bCustomSelected,
					}).data(sKeyTheme, "custom_bluecrystal")
				],
			}), ],
		});
		
		return this.page;
	}

});
