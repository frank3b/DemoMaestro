jQuery.sap.declare("util.formatter"); 

jQuery.sap.require("sap.ui.core.format.DateFormat");
jQuery.sap.require("sap.ui.core.format.NumberFormat");

util.formatter = {
		//Function that formats date time values as received from an Odata service. 
		fnDateTimeFormatter : function(oValue){
			if (oValue == undefined || oValue == "")
				return;
			
		    var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance();
		    return oDateFormat.format(new Date(oValue));
		},
		
		_statusStateMap : {
			"Inicial" : "Warning",
			"Pendiente" : "Error",
			"Terminado" : "Success"
		},
		
		StatusState :  function (value) {
			return (value && util.formatter._statusStateMap[value]) ? util.formatter._statusStateMap[value] : "None";
		},
		
		ProductsState :  function (value) {
			if(value > 0){
				return "Success";
			} else {
				return "Error";
			}
			
		},
		
		ProductsStateText :  function (value) {
			if(value > 0){
				return "Disponible";
			} else {
				return "Agotado";
			}
			
		},
		
		Quantity :  function (value) {
			try {
				return (value) ? parseFloat(value).toFixed(0) : value;
			} catch (err) {
				return "Not-A-Number";
			}
		},
		
		Date : function (value) {
			if (value) {
				var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd"}); 
				return oDateFormat.format(new Date(value));
			} else {
				return value;
			}
		},
		
		AttachmentMap : {
			"ppt" : "ppt-attachment",
			"pdf" : "pdf-attachment",
			"zip" : "attachment-zip-file"
		},
		
		AttachmentIcon : function (value) {
			var map = pedidos.util.formatter.AttachmentMap;
			var code = (value && map[value]) ? map[value] : "question-mark";
			return "sap-icon://" + code;
		},
		
		Number : function (value) {
			if(value){
				var oNumberFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
					  maxFractionDigits: 2,
					  groupingEnabled: true,
					  groupingSeparator: ",",
					  decimalSeparator: "."
				});
				return oNumberFormat.format(value);
			} else {
				return value;
			}
			
		},
		
		SaleNoteType : {
			"Proforma" : oBundle.getText("SALENOTE_TYPE_PROFORMA"),
			"Nota" : oBundle.getText("SALENOTE_TYPE_NOTA"),
			"Pre" : oBundle.getText("SALENOTE_TYPE_PRE")
		}
};		



