sap.ui.jsview("app.details.NewSaleNote", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf app.master.NewSaleNote
	 */
	getControllerName : function() {
		return "app.details.NewSaleNote";
	},

	/**
	 * Handler to onBeforeShow event that fires by the NavContainer.<BR>
	 * 
	 * @param oEvent
	 */
	onBeforeShow : function(oEvent) {
		this.getController().onBeforeShow(oEvent);
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf app.master.NewSaleNote
	 */
	createContent : function(oController) {
		
		//Products Search Help
		this.productsHelpDialog = new sap.m.SelectDialog({
			id : "productsHelpDialog",
			title : "{i18n>PRODUCTS_LIST_TITLE}",
			class : "sapUiPopupWithPadding",
			noDataText  : "{i18n>NO_DATA}",
			//growing : true, No funciona
			growingThreshold : 5,
			search : function(oEvent) {
				oController.handleProductsValueHelpSearch(oEvent);
			},
			confirm : function(oEvent) {
				oController.handleProductsValueHelpClose(oEvent);
			},
			cancel : function(oEvent) {
				oController.handleProductsValueHelpClose(oEvent);
			},
		});
		this.productsHelpDialog.setModel( oProductsModel );
		/*var olistProductsTemplate = new sap.m.StandardListItem({
			title : "{Code} {ProductName}",
			type : sap.m.ListType.Active,
			description : "{Price} {CurrencyCode}"
		});
		*/	
		var items = new sap.m.ObjectListItem({
			title : "{Code} {ProductName}",
			number : {path : "Price", formatter : util.formatter.Number},
			numberUnit : "{CurrencyCode}",
			attributes : [ 
			new sap.m.ObjectAttribute({
				text : "Existencia. {Stock}"
			})
			],
			firstStatus : new sap.m.ObjectStatus({
				text : { path: 'Stock',
					formatter: util.formatter.ProductsStateText },
				state: { path: 'Stock',
					formatter: util.formatter.ProductsState }
			})
		});
		
		this.productsHelpDialog.bindAggregation("items", "/", items);
		

		//Petitioner Search Help
		this.petitioner = new sap.m.Input({
			id : "petitionerInput",
			type : "Text",
			placeholder : "{i18n>PETITIONER_PLACEHOLDER}",
			showValueHelp : true,
			valueHelpRequest : function(oEvent) {
				oController.handlePetitionerValueHelp(oEvent);
			}
		});
		
		this.petitionerHelpDialog = new sap.m.SelectDialog({
			title : "{i18n>PETITIONER_LIST_TITLE}",
			class : "sapUiPopupWithPadding",
			search : function(oEvent) {
				oController.handlePetitionerValueHelpSearch(oEvent);
			},
			confirm : function(oEvent) {
				oController.handlePetitionerValueHelpClose(oEvent);
			},
			cancel : function(oEvent) {
				oController.handlePetitionerValueHelpClose(oEvent);
			}
		});
		this.petitionerHelpDialog.setModel( oPetitionersModel );
		
		var olistPetitionerTemplate = new sap.m.StandardListItem({
			title : "{FirstName} {LastName}",
			type : sap.m.ListType.Active,
			description : "{Code}"
		});	
		this.petitionerHelpDialog.bindAggregation("items", "/", olistPetitionerTemplate);
		
		var oLayout1 = new sap.ui.layout.form.GridLayout();
		var oLayout2 = new sap.ui.layout.form.ResponsiveLayout();
		var oLayout3 = new sap.ui.layout.form.ResponsiveGridLayout();
		
		this.validFromInput = new sap.m.DateTimeInput({
			type : "Date",
			dateValue : "{/ValidFrom}",
			displayFormat : "dd-MM-yyyy",
			placeholder : "{i18n>DATE_PLACEHOLDER}"
		});
		this.validToInput = new sap.m.DateTimeInput({
			type : "Date",
			dateValue : "{/ValidTo}",
			displayFormat : "dd-MM-yyyy",
			placeholder : "{i18n>DATE_PLACEHOLDER}"
		});
		this.totalWeightInput = new sap.m.ObjectNumber({
			number : "{/TotalWeight}"
		});
		this.totalValueInput = new sap.m.ObjectNumber({
			number : "0",
			unit : "{/CurrencyCode}"
		});
		this.saleNoteTypeSelect = new sap.m.Select({
			id : "saleNoteTypeSelect",
			type : "Default",
			autoAdjustWidth : true,
			selectedKey : "{/SaleNoteType}",
			items : [ 
			    new sap.ui.core.Item({
					key : "Proforma",
					text : "{i18n>SALENOTE_TYPE_PROFORMA}"
			    }), 
			    new sap.ui.core.Item({ 
				    key : "Nota", 
				    text : "{i18n>SALENOTE_TYPE_NOTA}" 
			    }), 
				new sap.ui.core.Item({ 
					key : "Pre", 
					text: "{i18n>SALENOTE_TYPE_PRE}" 
				})
			]
		});
		
		//sap.m.DisplayListItem({ label : oBundle.getText("SALESORDER_CREATEDAT"), value :{path : "CreatedAt", formatter : fnDateTimeFormatter}})
		var oForm1 = new sap.ui.layout.form.Form("F1", {
			//title : new sap.ui.core.Title({
			//	text : "Datos - Nota de Venta",
			//	tooltip : "Ingrese los siguientes datos..."
			//}),
			layout : oLayout3,
			formContainers : [ new sap.ui.layout.form.FormContainer("F1C1", {
				//title : "Nota de venta",
				formElements : [ 
				new sap.ui.layout.form.FormElement({
					label : ""
				}),   
				new sap.ui.layout.form.FormElement({
					label : "{i18n>SALE_NOTE_TYPE_LABEL}",
					fields : [ this.saleNoteTypeSelect ]
				}),
				new sap.ui.layout.form.FormElement({
					label : "{i18n>SALENOTE_PETITIONER}",
					fields : [ this.petitioner ]
				}),
				new sap.ui.layout.form.FormElement({
					label : "{i18n>SALENOTE_VALID_FROM}",
					fields : [ this.validFromInput	]
				}),
				new sap.ui.layout.form.FormElement({
					label : "{i18n>SALENOTE_VALID_TO}",
					fields : [ this.validToInput ]
				})
				]
			})

			]
		});
		var oForm2 = new sap.ui.layout.form.Form("F2", {
			layout : oLayout2,
			formContainers : [ new sap.ui.layout.form.FormContainer("F2C1", {
				//title : "Nota de venta",
				formElements : [ 
				new sap.ui.layout.form.FormElement({
					label : "{i18n>SALENOTE_TOTAL_VALUE}",
					fields : [ this.totalValueInput ]
				}),
				new sap.ui.layout.form.FormElement({
					label : "{i18n>SALENOTE_TOTAL_WEIGHT}",
					fields : [ this.totalWeightInput ]
				})
				]
			})

			]
		});
		
		// Create new button
		var saveButton = new sap.m.Button({
			icon : "sap-icon://save",
			tap : function(oEvent) {
				oController.onSaveSaleNote(oEvent);
			}		
		});
		
		// Create new button
		var itemsButton = new sap.m.Button({
			icon : "sap-icon://add",
			tap : function(oEvent) {
				oController.onItemsTap(oEvent);			
			}
		});
		// Create new button
		var deleteButton = new sap.m.Button({
			icon : "sap-icon://delete",
			tap : function(oEvent) {
				oController.onDeleteItemsTap(oEvent);
			}		
		});
		
		//Products Table
		this.oTableItems = new sap.m.Table("itemsDataTable", {
			mode : "SingleSelectMaster",
			noDataText  : "{i18n>NO_DATA}",
			//includeItemInSelection : true,
			/*delete : function(oEvent) {
				oController.handleDeleteProduct(oEvent);
			},*/
	        headerToolbar : new sap.m.Toolbar({
	            content : [ new sap.m.Label({
	                text : "{i18n>PRODUCTS_LIST_TITLE}"
	            }), new sap.m.ToolbarSpacer({}), deleteButton, itemsButton  
	            ]
	        }),
	        columns : [ new sap.m.Column({
	            width : "2em",
	            header : new sap.m.Label({
	                text : "{i18n>SALENOTE_COLUMN_HEADER_PNAME}"
	            })
	        }), new sap.m.Column({
	            width : "1em",
	            header : new sap.m.Label({
	                text : "{i18n>SALENOTE_COLUMN_HEADER_PRICE}"
	            })
	        }), new sap.m.Column({
	            width : "1em",
	            header : new sap.m.Label({
	                text : "{i18n>SALENOTE_COLUMN_HEADER_PAMOUNT}"
	            })
	        }) ]
	    });
		
		this.oTableItems.bindItems("/Products", new sap.m.ColumnListItem({
	        cells : [ 
	            new sap.m.Text({
	            	text : "{ProductName}"
		        }), new sap.m.Text({
		            text : "{Price}"
		        }), new sap.m.Input({
					value : "{Amount}",
					liveChange : function(oEvent) {
						oController.onAmountChanged(oEvent);
					},
					type : "Number"
				})
	        ]
	    }));
		

		//Icon Tabs
		var iconTabsBar = new sap.m.IconTabBar({
			expanded : true,
			expandable : false,
			class: "iconTabBarPaddingTop",
			items : [ new sap.m.IconTabFilter({
				icon: "sap-icon://hint",
				iconColor: "Default",
				key : "detail",
				content : [ oForm1, oForm2 ]	
			}), new sap.m.IconTabFilter({
				icon: "sap-icon://cart-full",
				iconColor: "Default",
				key : "cart",
				content : [ this.oTableItems ]	
			})
			]
		});

		return new sap.m.Page({
			title : "{i18n>TITLE__SALE_NOTE}",
			showNavButton : jQuery.device.is.phone,
	    	navButtonTap : [ oController.onNavButtonTap, oController ],
			content : [ iconTabsBar ],
			headerContent : [ saveButton ]
		});
	}

});