sap.ui.controller("app.details.NewSaleNote", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf app.master.NewSaleNote
*/
	onInit: function() {
		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf app.master.NewSaleNote
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf app.master.NewSaleNote
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf app.master.NewSaleNote
*/
//	onExit: function() {
//
//	}
	
	onBeforeShow : function(oEvent) {
		var oModel = new sap.ui.model.json.JSONModel("model/mockSaleNote.json");
		this.getView().setModel(oModel);
		
		//clean the new sale note data
		this.getView().validFromInput.setValue("");
		this.getView().validToInput.setValue("");
		this.getView().petitioner.setValue("");
		this.getView().totalValueInput.setNumber(0);
	},
	
	onNavButtonTap : function() {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},
	
	onItemsTap : function(evt) {
		// open value help dialog
		var oView = this.getView();
		
		//oView.byId("productsHelpDialog").open();
		oView.productsHelpDialog.open();
	},
	
	handlePetitionerValueHelp : function(evt) {
		// open value help dialog
		var oView = this.getView();
		
		oView.petitionerHelpDialog.open();
	},
	
	handlePetitionerValueHelpSearch : function (evt) {
		var sValue = evt.getParameter("value");
		var oFilter = new sap.ui.model.Filter(
			"FirstName",
			sap.ui.model.FilterOperator.Contains, sValue
		);
		evt.getSource().getBinding("items").filter([oFilter]);
	},

	handlePetitionerValueHelpClose : function (evt) {
		var oSelectedItem = evt.getParameter("selectedItem");
		if (oSelectedItem) {
			var oView = this.getView();
			oView.petitioner.setValue(oSelectedItem.getTitle());
			
			var oData = oView.getModel().getData();
			oData.Petitioner = getPetitioner(oSelectedItem.getDescription());
		}
		evt.getSource().getBinding("items").filter([]);
	},
	
	handleProductsValueHelpSearch : function (evt) {
		var sValue = evt.getParameter("value");
		var oFilter = new sap.ui.model.Filter(
			"ProductName",
			sap.ui.model.FilterOperator.Contains, sValue
		);
		evt.getSource().getBinding("items").filter([oFilter]);
	},

	handleProductsValueHelpClose : function (evt) {
		var oSelectedItem = evt.getParameter("selectedItem");
		if (oSelectedItem) {
			var oView = this.getView();
			
			var productCode = oSelectedItem.getTitle().split(" ")[0];
			
			var product = getProduct( productCode );
			
			var newProduct = {"Code" : product.Code,
				"ProductName": product.ProductName,
				"Price": product.Price,
				"Weight": product.Weight,
				"Amount": 1,
				"CurrencyCode": product.CurrencyCode
			};
			
			var oData = oView.getModel().getData();
			oData.Products.push(newProduct);
			oView.getModel().setData(oData);
			
			//Recalculate TotalWeight and TotalValue
			this._recalculateTotalValues();
			
		}
		evt.getSource().getBinding("items").filter([]);
	},
	
	onDeleteItemsTap : function (evt) {
		var oList = this.getView().oTableItems;
		//var paths = oList._aSelectedPaths;
		
		var lpath, posPath;
		var oData = this.getView().getModel().getData();
		
		var itemsSelected = oList.getSelectedItems();
		for ( var i = 0; i < itemsSelected.length; i++) {			
			//delete from model
			var sPath = itemsSelected[i].getBindingContext().sPath;
			lpath = sPath.split("/");
			posPath = lpath[lpath.length - 1];
			//var productTmp = oData.Products[posPath];
			oData.Products.splice(posPath, 1);
			this.getView().getModel().setData(oData);
			
			//Recalculate TotalWeight and TotalValue
			this._recalculateTotalValues();
		}
		oList.removeSelections(true);
		
	},
	
	onSaveSaleNote : function (evt) {
		
		jQuery.sap.require("sap.m.MessageBox");
		var oData = this.getView().getModel().getData();
		
		var validFrom = this.getView().validFromInput.getValue();
		var validTo = this.getView().validToInput.getValue();
		var petitioner = oData.Petitioner.Code;
		var totalWeight = oData.TotalWeight;
		var totalValue = oData.TotalValue;
		
		//Validate required fields
		var isOk = true;
		if(validFrom == null || validFrom == '' || validFrom == undefined){
			isOk = false;
			sap.m.MessageToast.show( oBundle.getText("SALENOTE_DATE_MSG") );
		} else if (validTo == null || validTo == '' || validTo == undefined) {
			isOk = false;
			sap.m.MessageToast.show( oBundle.getText("SALENOTE_DATE_MSG") );
		} else if(petitioner == null || petitioner == '' || petitioner == undefined){
			isOk = false;
			sap.m.MessageToast.show( oBundle.getText("SALENOTE_PETITIONER_MSG") );
		} else {
			if(oData.Products.length > 0){
				if(isOk){
					var saleNote = {};
					saleNote.ValidFrom = validFrom;
					saleNote.ValidTo = validTo;
					saleNote.Petitioner = petitioner;
					saleNote.TotalWeight = totalWeight;
					saleNote.TotalValue = totalValue;
					saleNote.Status = oData.Status;
					saleNote.CurrencyCode = oData.CurrencyCode;
					saleNote.Type = oData.SaleNoteType;
					
					Kinvey.DataStore.save('SalesNotes', saleNote, {
					    success: function(response) {
					    	//Save the Items				    	
					    	for ( var i = 0; i < oData.Products.length; i++) {
					    		var saleNoteDetail = {};
					    		saleNoteDetail.Amount = oData.Products[i].Amount;
					    		saleNoteDetail.ProductCode = oData.Products[i].Code;
					    		saleNoteDetail.SaleNoteId = response._id;
					    		
					    		var promiseDetail = Kinvey.DataStore.save('SalesNotesDetail', saleNoteDetail, {
								    success: function(response) {
								    	jQuery.sap.log.info("sale note detail saved..." + response._id);
								    },
							        error: function(error){
							        	jQuery.sap.log.error("Error saving sale note detail..." + error.description);
									}
								});
					    		
					    		promiseDetail.then( function() {
					    			//is this the last item?
					    			if( i == oData.Products.length ){
					    				sap.m.MessageToast.show( oBundle.getText("SALENOTE_SUCCESS_MSG") );
					    				//Go to Menu List
					    				sap.ui.getCore().getEventBus().publish("nav", "to", {
					    					viewId : "app.master.Menu",
					    					data : {
					    						bindingContext : oData
					    					}
					    				});
					    				
					    			}
					    		});
					    	}
					    	
					    },
				        error: function(error){
				        	jQuery.sap.log.error("Error saving sale note..." + error.description);
						}
					});
					
				}
			} else {
				sap.m.MessageBox.alert( oBundle.getText("SALENOTE_PRODUCTS_MSG") );
			}
		}
		
	},
	
	onAmountChanged : function (oEvent){
		var sValue = oEvent.getParameter("newValue");
		if(sValue){
			this._recalculateTotalValues();	
		}
			
	},
	
	_recalculateTotalValues : function (){
		//recalculate TotalValue and TotalWeight
		var oData = this.getView().getModel().getData();
		oData.TotalValue = 0;
		oData.TotalWeight = 0;
		for ( var i = 0; i < oData.Products.length; i++) {
			var productSelected = oData.Products[i];
			
			oData.TotalValue = Number(oData.TotalValue) + Number( productSelected.Price * productSelected.Amount );
			oData.TotalWeight = Number(oData.TotalWeight) + Number(productSelected.Weight * productSelected.Amount );
		}
		this.getView().totalValueInput.setNumber(util.formatter.Number(oData.TotalValue));
		this.getView().totalWeightInput.setNumber(oData.TotalWeight);
		
	}
	
});