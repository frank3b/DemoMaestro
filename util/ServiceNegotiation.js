jQuery.sap.declare("util.ServiceNegotiation");

//This feature is only relevant for SAP services.
//When an application supports multiple service versions, the best matching version URL is returned.
var useNegotiation = false;

var minVersion = 1;
var maxVersion = 1;

function getNegotiationService(){
	var serviceCatalog = "/sap/opu/odata/IWFND/CATALOGSERVICE";
		
	var oCatalogModel = new sap.ui.model.odata.ODataModel(serviceCatalog,false);
	var technicalServiceName = "ZGWSAMPLE_SRV";
	var urlParam = 'TechnicalServiceVersionMin='+minVersion+"&TechnicalServiceName='"+technicalServiceName+"'"+'&TechnicalServiceVersionMax='+maxVersion;
	var sServiceUrl = "";
	
	oCatalogModel.read('BestMatchingService', null , [urlParam] , false ,
				function(oData, response) {
					var parser = document.createElement('a');
					parser.href = oData["ServiceUrl"];
					sServiceUrl = parser.pathname + parser.search;
			});
	
	return sServiceUrl;
}