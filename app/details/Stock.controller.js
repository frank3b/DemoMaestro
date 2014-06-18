sap.ui.controller("app.details.Stock", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf app.details.Stock
*/
	onInit: function() {
		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf app.details.Stock
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf app.details.Stock
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf app.details.Stock
*/
//	onExit: function() {
//
//	}
	
	onBeforeShow : function(oEvent) {
		this.loadContent();
	},
	
	onNavButtonTap : function() {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},
	
	onFilterSearchTap : function(evt) {
		var oView = this.getView();
		
		oView.oFilterResponsivePopover.close();
		
		var store = oView.storeInput.getValue();
		var material = oView.materialInput.getValue();
		var code = oView.codeInput.getValue();
		
		var filters = [];
		// add filter for search
		if (material && material.length > 0) {
			var filter = new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, material);
			filters.push(filter);
		}
		if (store && store.length > 0) {
			var filter = new sap.ui.model.Filter("Store", sap.ui.model.FilterOperator.Contains, store);
			filters.push(filter);
		}
		if (code && code.length > 0) {
			var filter = new sap.ui.model.Filter("Code", sap.ui.model.FilterOperator.Contains, code);
			filters.push(filter);
		}
		
		// update list binding
		var list = oView.oList;
		var binding = list.getBinding("items");
		binding.filter(filters);		
	},
	
	loadContent: function(){
		var oView = this.getView();
		
		var promiseStock = Kinvey.DataStore.find('Stock', null, {
			success : function(response) {
				oStockModel = new sap.ui.model.json.JSONModel();
				
				oStockModel.setJSON(JSON.stringify(response));
			},
			error : function(error) {
				jQuery.sap.log.error("Error getting sales notes..."
						+ error.description);
			}
		});
		
		promiseStock.then( function() {
			oView.oList.setModel(oStockModel);
			oView.oList.bindItems("/", this.getView().items);
		});
	},
	
	onLiveChange : function(oEvent) {
		this._updateList();
    },
    
    onFilterSelected : function(oEvent) {
    	var oView = this.getView();
    	var oButton = oEvent.getSource();
    	
    	oView.oFilterResponsivePopover.openBy(oButton);
    },
    
    onCancelFilterTap : function(oEvent) {
    	var oView = this.getView();
    	
    	oView.oFilterResponsivePopover.close();
    },
    
    _updateList : function () {
		
		var filters = [];
		var oView = this.getView();
		
		// add filter for search
		var searchString = oView.searchFieldStock.getValue();
		if (searchString && searchString.length > 0) {
			var filter = new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, searchString);
			filters.push(filter);
		}		
		
		// update list binding
		var list = oView.oList;
		var binding = list.getBinding("items");
		binding.filter(filters);		
	},
	
	onPull : function(oEvent, oController){
		oController.loadContent();
		this.hide();
	},
	
});