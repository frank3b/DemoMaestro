sap.ui.jsview("app.master.Login", {

	getControllerName: function() {
		return "app.master.Login";
	},
	
	onBeforeShow : function(evt) {
		this.getController().onBeforeShow(evt);
	},
	
	createContent : function(controller) {
		
		var ologoBox = new sap.m.FlexBox({
			alignItems: "Center",
			justifyContent : "Center",
			  items: [
			      new sap.m.Image({	src : "img/logo.png" })
			  ]
		});
		
		var oLayout3 = new sap.ui.layout.form.ResponsiveGridLayout();
		var formLogin = new sap.ui.layout.form.Form("FLogin", {
			//title : new sap.ui.core.Title({
			//	text : "Datos - Nota de Venta",
			//	tooltip : "Ingrese los siguientes datos..."
			//}),
			layout : oLayout3,
			formContainers : [ new sap.ui.layout.form.FormContainer("FL1C1", {
				//title : "Person data",
				formElements : [ 
					new sap.ui.layout.form.FormElement({
							label : ""
					}),    
				    new sap.ui.layout.form.FormElement({
						label : "{i18n>USER_NAME}",
						fields : [ new sap.m.Input( { value : "{/UserName}" } )	]
					}),
					new sap.ui.layout.form.FormElement({
						label : "{i18n>PASSWORD}",
						fields : [ new sap.m.Input( { value : "{/Password}", type : sap.m.InputType.Password } ) ]
					})
				]
			})

			]
		});
		
		
		var oVBoxLogin = new sap.m.VBox("vbox2", {
			items:[
				new sap.ui.core.HTML( {  
                 	content : "<div id='map_canvas' style='width: 100%; height: 80px;'></div>"  
				}),
				ologoBox, 
				formLogin 
			]
		});
		
		// create page
		this.page = new sap.m.Page({
			title : "{i18n>TITLE__AUTH}",
			showNavButton : false,
			backgroundDesign : sap.m.PageBackgroundDesign.Solid,
			/*
			 * A simple clean way to add the login button is just to embed it 
			 * in the footer of the page
			 */
			footer: new sap.m.Bar({
				contentMiddle : [
					new sap.m.Button({
						text : "{i18n>LOGIN_BUTTON}",
						icon : "sap-icon://locked",
						tap : [ controller.loginTap, controller ]
					}) 
				]
			}), 
			
			content: [ oVBoxLogin ] 
			/*content: [ ologoBox, 
		  		new sap.m.List({
					items : [ 
						new sap.m.InputListItem({
							label : "{i18n>USER_NAME}",
							content : new sap.m.Input( { value : "{/UserName}" } )
						}),
						new sap.m.InputListItem({
							label : "{i18n>PASSWORD}",
							content : new sap.m.Input( { value : "{/Password}", type : sap.m.InputType.Password } )
						})
					],
				})
			] */
		});
		
		return this.page;
	}
});