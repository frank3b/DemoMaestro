jQuery.sap.declare("authentication.Authentication");
//sap.ui.localResources("util");
//jQuery.sap.require("util.Utility");
sap.ui.localResources("model");
jQuery.sap.require("model.model");

function authenticate(){
    authenticateBasic();
    //authenticateSAML();
    //authenticatePortalSSO();
    //authenticateForm();
}

function authenticateBasic(){
    launchApplication();
}

function authenticateSAML(){
    jQuery.sap.require("authentication.SAMLAuthentication");
    executeSAMLAuthentication();
}

function authenticatePortalSSO(){
    jQuery.sap.require("authentication.PortalSSOAuthentication");
    executePortalSSOAuthentication();
}

function authenticateForm() {
	jQuery.sap.require("authentication.FormAuthentication");
	
	initializeModel();
}

function launchApplication(){
	//FIXME -  create mock model
	createModel();

	var myapp = sap.ui.jsview("com.products.App");
	myapp.placeAt('content');	
	
}

function executeAjaxCall(type, url, data, oHeaders, successFunc, errorFunc){
    errorFuncDefault = (typeof errorFunc === "undefined") ? errorHandling : errorFunc;
	jQuery.ajax({
	        type: type,
	        url: url,
	        data: data,
	        headers: oHeaders,
	        success: successFunc,
	        error: errorFuncDefault
	});
}

function errorHandling(oData, textStatus, error){
	//alert('errorHandling ' + oData.status + ' ' + error);
	
	sap.ui.getCore().getEventBus().publish("busyDialog", "close");
	
	displayError({
		message : error,
		responseText : oData.responseText,
		statusCode : oData.status,
		statusText : oData.statusText
	});	
}

function initKinveyLogin(userName, password, oBindingContext){  
	
	try {
	    
	    if(userName != null && password != null && userName != '' && password != ''){	        
	        
	        var promise = Kinvey.User.logout({
	            success: function() {
	            	jQuery.sap.log.info("Logoff..." + userName);
	                loginKiveyUser(userName, password);
	            },
	            error: function(e) {
	            	jQuery.sap.log.error("Error Logoff..." + e.description);
	            	loginKiveyUser(userName, password);
	            }
			});
	        
	    } else {
	       alert("Por favor, ingrese el usuario y password.");
	    }
	} catch (e) {
		jQuery.sap.log.error("Logoff..." + e.message);
	}
    
}

function loginKiveyUser(userName, password, oBindingContext){
	jQuery.sap.require("sap.m.MessageBox");
	
	Kinvey.User.login(userName, password, {
		
        success: function() {
        	jQuery.sap.log.info("Login..." + userName);        	
        	
        	var user = Kinvey.getActiveUser();
        	
        	var txtwelcome = "Bienvenido: " + user.first_name + " " + user.last_name;
        	
        	sap.ui.getCore().getEventBus().publish("nav", "to", {
		    	viewId : "app.master.Menu",
		    	data : { bindingContext : oBindingContext }
			});
        	
        	sap.ui.getCore().getEventBus().publish("busyDialog", "close");
        	
        },
        error: function(error){
        	jQuery.sap.log.error("Error login..." + error.description);
        	sap.ui.getCore().getEventBus().publish("busyDialog", "close");
        	if(error.name == 'InvalidCredentials') {
        		sap.m.MessageBox.alert( oBundle.getText("LOGIN_ERROR") );
        	} else {
        		sap.m.MessageBox.alert( oBundle.getText("CONNECTION_ERROR") );
        	}
        	
        }	
	});
}