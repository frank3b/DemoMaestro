var oSalesNotesModel = new sap.ui.model.json.JSONModel();
var oPetitionersModel = null;
var oProductsModel = null;
var oStockModel = new sap.ui.model.json.JSONModel();

function getProduct(code) {
	var product = null;

	var oJSON = JSON.parse(oProductsModel.getJSON());

	for ( var i = 0; i < oJSON.length; i++) {
		if (oJSON[i].Code == code) {
			product = oJSON[i];
			break;
		}
	}

	return product;
}

function getProducts() {
	Kinvey.DataStore.find('Products', null,	{
		success : function(response) {
			oProductsModel = new sap.ui.model.json.JSONModel();
			oProductsModel.setJSON(JSON.stringify(response));
		},
		error : function(error) {
			jQuery.sap.log.error("Error getting products..." + error.description);
		}
	});
}

function getPetitioner(code) {
	var petitioner = null;

	var oJSON = JSON.parse(oPetitionersModel.getJSON());

	for ( var i = 0; i < oJSON.length; i++) {
		if (oJSON[i].Code == code) {
			petitioner = oJSON[i];
			break;
		}
	}

	return petitioner;
}

function getPetitioners(){
	var promisePettitioners = Kinvey.DataStore.find('Petitioners', null,	{
		success : function(response) {
			
			oPetitionersModel = new sap.ui.model.json.JSONModel();
			oPetitionersModel.setJSON(JSON.stringify(response));
			
		},
		error : function(error) {
			jQuery.sap.log.error("Error getting sales notes..." + error.description);
		}
	});
	
}