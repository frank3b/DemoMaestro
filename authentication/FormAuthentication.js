/**
 * This module try to authenticate with service url, if server returns a form to authenticate, 
 * then a login screen will appear so user can provide server credentials.
 * Then another request to authenticate with user credential is performed.
 * This can be used to authenticate with BPM Java Server when form based authentication is configured.
 * 
 * Note that some customers may block basic authentication on server side.   
 */
jQuery.sap.declare("authentication.FormAuthentication");
//jQuery.sap.require("util.Connectivity");

var credentials = "";


function executeFormAuthentication(username, password, fnSuccess) {
	var oHeaders = {};
	
	credentials = 'Basic ' + Base64.encode(username + ":" + password);
	
	oHeaders["Authorization"] = credentials;
	
	executeAjaxCall("GET", getServiceURL(), null, oHeaders, fnSuccess);
}

/**
 * Create and opens a login dialog for user to enter his/her credentials
 */
function openLoginDialog() {
	sap.ui.getCore().loadLibrary("sap.m");
	sap.ui.getCore().applyTheme("sap_bluecrystal");

	var oUserNameInput = new sap.m.Input({
		placeholder : oBundle.getText("ENTER_USERNAME"),
	});

	var oUserPassInput = new sap.m.Input({
		placeholder : oBundle.getText("ENTER_PASSWORD"),
		type : sap.m.InputType.Password,
	});

	var oButtonOk = new sap.m.Button({
		text : "Log On",
		width : "100%",
		press : function() {
			dialog.close();
		}
	});
	
	var oText = new sap.m.Text({
		text : oBundle.getText("CONNECTION") + " " + window.location.host,
		width : "100%",
	});

	//placeholder for error message or server details 
	var vBox = new sap.m.VBox({
		width : "100%",
		height : "50px",
		justifyContent : sap.m.FlexJustifyContent.Center,
		items : [ oText ],
	});

	var dialog = new sap.m.Dialog({
		title : oBundle.getText("AUTHENTICATION_REQUIRED"),
		showHeader : true,
		stretchOnPhone : true,
		content : [ oUserNameInput, oUserPassInput, vBox ],
		leftButton : oButtonOk,
		rightButton : new sap.m.Button({
			text : "Cancel",
			width : "100%",
			press : function() {
				dialog.close();
			}
		}),
		afterClose : [
				{
					nameInput : oUserNameInput,
					passInput : oUserPassInput
				},
				function(oEvent, cred) {
					var encodedData = window.btoa(cred.nameInput.getValue()
							+ ":" + cred.passInput.getValue());
					credentials = "Basic " + encodedData;
					if (oEvent.getParameter("origin") == oButtonOk) {
						executeFormAuthentication(cred.nameInput.getValue(), cred.passInput.getValue());
					}
				} ]
	});

	dialog.open();
}

/**
 * 
 * @param oData - response text 
 * @returns some object if a html Form tag was found
 */
function getFormData(oData) {

	var oFormData = undefined;

	if (typeof oData != "string")
		return oFormData;

	var index = oData.indexOf("<FORM");

	if (index != -1) {
		oFormData = {};
	}

	return oFormData;
}


