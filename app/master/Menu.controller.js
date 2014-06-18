sap.ui.controller("app.master.Menu", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf app.master.Menu
	 */
	 onInit: function() {
			//var oFilter = new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.Contains, "Inicial");
			
			// update list binding
			var list = this.getView().oList;
			var binding = list.getBinding("items");
			binding.filter([]);
	 },
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf app.master.Menu
	 */
	 onBeforeShow: function(oEvent) {
		 this.loadContent();
		  
		 if(oProductsModel == null){
			 getProducts();
		 }
		 if(oPetitionersModel == null){
			 getPetitioners();
		 } 
	 },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf app.master.Menu
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf app.master.Menu
	 */
	// onExit: function() {
	//
	// }
	
	//FIXME - update with the real status
	handleTabSelect : function(oEvent) {
		
		var sKey = oEvent.getParameter("selectedKey");
		var oFilter = null;
		
		if (sKey === "StatusPositive") {
			oFilter = new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.Contains, "Terminado");
		} else if (sKey === "StatusNegative") {
			oFilter = new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.Contains, "Pendiente");
		} 
		
		// update list binding
		var oView = this.getView();
		var list = oView.oList;
		var binding = list.getBinding("items");
		if(oFilter){			
			binding.filter([oFilter]);
		} else {
			binding.filter([]);
		}
		
	},
	//Open Menu
	onMenuTap : function(oEvent) {
		var oButton = oEvent.getSource();
		var oView = this.getView();
		oView._actionSheet.openBy(oButton);
	},
	
	onListSelect : function(oEvent) {
		//FIXME - implement 
		//alert('list select...');
	},

	onBills : function(oEvent) {
		//FIXME - implement 
		//alert('onBills...');
		
		//pedidos_maestro_com_co__NotasVentaService();
		//pedidos_maestro_com_co__NotasVentaService_pedidos_maestro_com_co__NotasVentaServicePort ();
		//pedidos_maestro_com_co__testService_op(this.serviceCallback, this.serviceCallback, "Frank");
	},

	onExit : function(oEvent) {
		var oBindingContext = oEvent.oSource.getBindingContext();

		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId : "app.master.Login",
			data : {
				bindingContext : oBindingContext
			}
		});
	},
	
	onNewSaleNote : function(oEvent) {
		var oBindingContext = oEvent.oSource.getBindingContext();

		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId : "app.details.NewSaleNote",
			data : {
				bindingContext : oBindingContext
			}
		});
	},
	
	onNewSalesOrders : function(oEvent) {
		//FIXME - implement 
		//alert('onNewSalesOrders');
	},
	
	handleFilterChange : function(oEvent) {
		var filters = [];
		var oView = this.getView();
		
		// add filter for filter
		var select = oView.filterSelect;
		var key = select.getSelectedKey();
		var filterMap = {
			"5k" : new sap.ui.model.Filter("TotalValue", sap.ui.model.FilterOperator.GE, 100),
			"10k" : new sap.ui.model.Filter("TotalValue", sap.ui.model.FilterOperator.GE, 1000)
		};
		if (filterMap[key]) {
			filters.push(filterMap[key]);
		}
		
		// update list binding
		var list = oView.oList;
		var binding = list.getBinding("items");
		binding.filter(filters);	
    },
	
	onLiveChange : function(oEvent) {
		this._updateList();
    },
    
    _updateList : function () {
		
		var filters = [];
		var oView = this.getView();
		
		// add filter for search
		var searchString = oView.searchField.getValue();
		if (searchString && searchString.length > 0) {
			var filter = new sap.ui.model.Filter("Petitioner/FirstName", sap.ui.model.FilterOperator.Contains, searchString);
			filters.push(filter);
		}		
		
		// update list binding
		var list = oView.oList;
		var binding = list.getBinding("items");
		binding.filter(filters);		
		
	},
	
	loadContent: function(){
		var oView = this.getView();
		
		var promiseSalesNotes = Kinvey.DataStore.find('SalesNotes', null, {
			success : function(response) {
				oSalesNotesModel = new sap.ui.model.json.JSONModel();
				for ( var i = 0; i < response.length; i++) {
					var petitioner = getPetitioner(response[i].Petitioner);
					response[i].Petitioner = petitioner;
				}
				oSalesNotesModel.setJSON(JSON.stringify(response));
			},
			error : function(error) {
				jQuery.sap.log.error("Error getting sales notes..."
						+ error.description);
			}
		});
		
		promiseSalesNotes.then( function() {
			oView.oList.setModel(oSalesNotesModel);
			oView.oList.bindItems("/", this.getView().items);
		});
		
    	
	},
	
	onPull : function(oEvent, oController){
		oController.loadContent();
		this.hide();
	},
	
	onPersonalizationButtonTap : function() {

        sap.ui.getCore().getEventBus().publish("nav", "to", {
    		viewId : "app.master.SettingsCategories",
    		data : ""
        });

    },
    
    onStockSearch : function(oEvent) {
    	var oBindingContext = oEvent.oSource.getBindingContext();

		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId : "app.details.Stock",
			data : {
				bindingContext : oBindingContext
			}
		});
    }
    
});