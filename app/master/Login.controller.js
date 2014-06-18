
sap.ui.controller("app.master.Login", {

	onInit : function() {
		//FIXME - remove when no use Kinvey
		var promise = Kinvey.init({
		    appKey    : 'kid_VTS8kUwpI9',
		    appSecret : 'a34280b4eff141aa94bdaf9aef12a48a'
		});

		promise.then( function() {
			getPetitioners();
			getProducts();	
		});
		
	},
	
	onBeforeShow : function(evt) {

	},
	
	loginTap : function(evt) {
		
		sap.ui.localResources("authentication");
		jQuery.sap.require("authentication.FormAuthentication");

		/*
		 * Get the data model so we can get the credentials
		 */
		var data = sap.ui.getCore().getModel().getData();
		var app = this.getView().app;
		
		var onAuthSuccess = function(oData, statusText, responseXHR) {
			createModel();
			
			app.to("ProductList");
			
			sap.ui.getCore().getEventBus().publish("busyDialog", "close");
		};
		
		var oBindingContext = evt.oSource.getBindingContext();
		sap.ui.getCore().getEventBus().publish("busyDialog", "open");
		initKinveyLogin(data.UserName, data.Password, oBindingContext);
		
		//FIXME - this is only for demo
		/*if(data.UserName == 'demo' && data.Password == 'demo'){
			sap.ui.getCore().getEventBus().publish("busyDialog", "close");
			
			var oBindingContext = evt.oSource.getBindingContext();

			sap.ui.getCore().getEventBus().publish("nav", "to", {
		    	viewId : "app.master.Menu",
		    	data : { bindingContext : oBindingContext }
			});
		} else {
			sap.ui.getCore().getEventBus().publish("busyDialog", "close");
			displayError({
				message : "Usuario o contraseña incorrecto, por favor verifique",
				responseText : "Error",
				statusCode : "404",
				statusText : "Autenticación"
			});	
		}
		*/
		
		//executeFormAuthentication(data.UserName, data.Password, onAuthSuccess);
		
	},
	
	navButtonTap : function(evt) { 

	}
	
	
});
//@ sourceURL=./view/Product.controller.js