jQuery.sap.declare("authentication.SAMLAuthentication");
//jQuery.sap.require("util.Connectivity");

function executeSAMLAuthentication(){
	//"GET" Call to GW -> SAML server to get the form
	executeAjaxCall("GET", serviceUrl, null, null, deserializeForm);	
}

function deserializeForm(oData, statusText, responseXHR){
	
	//Check if a form exists in the response
	var oForm = parseHTML(oData, "form");
	
	//Check response for form
	if(oForm.val() == undefined){
		    //Form was not found-> continue with the application
			launchApplication();
			return;			
	}
	
	if(oData.toLowerCase().indexOf("document.forms[0].submit()") > 0){
		//redirect Form
		executePostRedirect(oData, oForm);	
	}
	else{
		//Post Form
		showForm(oData, oForm);
	}
}


function executePostRedirect(oData, oForm){

	var url = $(oForm).attr('action');
	var type = $(oForm).attr('method');
	//Extract all form's input fields name and value into string
	var sFormData = $(oData).serialize(); 
	executeAjaxCall(type, url, sFormData, null, deserializeForm, routingHandling);
}

function showForm(oData, oForm){
	
	//Remove any old forms if exists
	$("#content").empty();
	
	loadcss("desktop/css/SAMLFormStyleSheet.css");
	
	//Add the new response form
	$("#content").append(oForm);
	
	// Add listener on submit button in the form
	$(oForm).submit(function(event){
		//Override any default submit behavior
		event.preventDefault();
		
		var url = $(this).context.action;
		var type = $(this).context.method;
		//Extract all input fields name and value into string
		var sFormData = $("input").serialize() +
						//Concatenate the input type submit name and value 
						//(the button that was sent need to be send also)
						'&'+$("input[type=submit]").attr('name') 
							+ "=" + $("input[type=submit]").val();
		
		 //Execute post request with login data
		executeAjaxCall(type, url, sFormData, null, deserializeForm);
	});	
}	

//Handle error of unauthorized on redirect.
function routingHandling(oData, textStatus, error ){
	//Post auto submit form with redirect
	if( oData.status == "403" ){
		launchApplication();
	}
	else{
		errorHandling(oData, textStatus, error);
	}
	return;

}