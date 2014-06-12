//
// Definitions for schema: http://pedidos.maestro.com.co/
//  http://localhost:8080/TestWebService/services/NotasVentaServicePort?xsd=notasventaservice_schema1.xsd
//
//
// Constructor for XML Schema item {http://pedidos.maestro.com.co/}testService
//



function pedidos_maestro_com_co__testService () {
    this.typeMarker = 'pedidos_maestro_com_co__testService';
    this._arg0 = null;
}

//
// accessor is pedidos_maestro_com_co__testService.prototype.getArg0
// element get for arg0
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for arg0
// setter function is is pedidos_maestro_com_co__testService.prototype.setArg0
//
function pedidos_maestro_com_co__testService_getArg0() { return this._arg0;}

pedidos_maestro_com_co__testService.prototype.getArg0 = pedidos_maestro_com_co__testService_getArg0;

function pedidos_maestro_com_co__testService_setArg0(value) { this._arg0 = value;}

pedidos_maestro_com_co__testService.prototype.setArg0 = pedidos_maestro_com_co__testService_setArg0;
//
// Serialize {http://pedidos.maestro.com.co/}testService
//
function pedidos_maestro_com_co__testService_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._arg0 != null) {
      xml = xml + '<arg0>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._arg0);
      xml = xml + '</arg0>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

pedidos_maestro_com_co__testService.prototype.serialize = pedidos_maestro_com_co__testService_serialize;

function pedidos_maestro_com_co__testService_deserialize (cxfjsutils, element) {
    var newobject = new pedidos_maestro_com_co__testService();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing arg0');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'arg0')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setArg0(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://pedidos.maestro.com.co/}testServiceResponse
//
function pedidos_maestro_com_co__testServiceResponse () {
    this.typeMarker = 'pedidos_maestro_com_co__testServiceResponse';
    this._return = null;
}

//
// accessor is pedidos_maestro_com_co__testServiceResponse.prototype.getReturn
// element get for return
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for return
// setter function is is pedidos_maestro_com_co__testServiceResponse.prototype.setReturn
//
function pedidos_maestro_com_co__testServiceResponse_getReturn() { return this._return;}

pedidos_maestro_com_co__testServiceResponse.prototype.getReturn = pedidos_maestro_com_co__testServiceResponse_getReturn;

function pedidos_maestro_com_co__testServiceResponse_setReturn(value) { this._return = value;}

pedidos_maestro_com_co__testServiceResponse.prototype.setReturn = pedidos_maestro_com_co__testServiceResponse_setReturn;
//
// Serialize {http://pedidos.maestro.com.co/}testServiceResponse
//
function pedidos_maestro_com_co__testServiceResponse_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._return != null) {
      xml = xml + '<return>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._return);
      xml = xml + '</return>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

pedidos_maestro_com_co__testServiceResponse.prototype.serialize = pedidos_maestro_com_co__testServiceResponse_serialize;

function pedidos_maestro_com_co__testServiceResponse_deserialize (cxfjsutils, element) {
    var newobject = new pedidos_maestro_com_co__testServiceResponse();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing return');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'return')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setReturn(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    return newobject;
}

//
// Definitions for schema: null
//  http://localhost:8080/TestWebService/services/NotasVentaServicePort?wsdl#types1
//
//
// Definitions for service: {http://pedidos.maestro.com.co/}NotasVentaServiceService
//

// Javascript for {http://pedidos.maestro.com.co/}NotasVentaService

function pedidos_maestro_com_co__NotasVentaService () {
    this.jsutils = new CxfApacheOrgUtil();
    this.jsutils.interfaceObject = this;
    this.synchronous = false;
    this.url = null;
    this.client = null;
    this.response = null;
    this.globalElementSerializers = [];
    this.globalElementDeserializers = [];
    this.globalElementSerializers['{http://pedidos.maestro.com.co/}testService'] = pedidos_maestro_com_co__testService_serialize;
    this.globalElementDeserializers['{http://pedidos.maestro.com.co/}testService'] = pedidos_maestro_com_co__testService_deserialize;
    this.globalElementSerializers['{http://pedidos.maestro.com.co/}testServiceResponse'] = pedidos_maestro_com_co__testServiceResponse_serialize;
    this.globalElementDeserializers['{http://pedidos.maestro.com.co/}testServiceResponse'] = pedidos_maestro_com_co__testServiceResponse_deserialize;
    this.globalElementSerializers['{http://pedidos.maestro.com.co/}testService'] = pedidos_maestro_com_co__testService_serialize;
    this.globalElementDeserializers['{http://pedidos.maestro.com.co/}testService'] = pedidos_maestro_com_co__testService_deserialize;
    this.globalElementSerializers['{http://pedidos.maestro.com.co/}testServiceResponse'] = pedidos_maestro_com_co__testServiceResponse_serialize;
    this.globalElementDeserializers['{http://pedidos.maestro.com.co/}testServiceResponse'] = pedidos_maestro_com_co__testServiceResponse_deserialize;
}

function pedidos_maestro_com_co__testService_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling pedidos_maestro_com_co__testServiceResponse_deserializeResponse');
     responseObject = pedidos_maestro_com_co__testServiceResponse_deserializeResponse(this.jsutils, element);
     client.user_onsuccess(responseObject);
    }
}

pedidos_maestro_com_co__NotasVentaService.prototype.testService_onsuccess = pedidos_maestro_com_co__testService_op_onsuccess;

function pedidos_maestro_com_co__testService_op_onerror(client) {
    if (client.user_onerror) {
     var httpStatus;
     var httpStatusText;
     try {
      httpStatus = client.req.status;
      httpStatusText = client.req.statusText;
     } catch(e) {
      httpStatus = -1;
      httpStatusText = 'Error opening connection to server';
     }
     client.user_onerror(httpStatus, httpStatusText);
    }
}

pedidos_maestro_com_co__NotasVentaService.prototype.testService_onerror = pedidos_maestro_com_co__testService_op_onerror;

//
// Operation {http://pedidos.maestro.com.co/}testService
// Wrapped operation.
// parameter arg0
// - simple type {http://www.w3.org/2001/XMLSchema}string//
function pedidos_maestro_com_co__testService_op(successCallback, errorCallback, arg0) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = arg0;
    xml = this.pedidos_maestro_com_co__testService_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.pedidos_maestro_com_co__testService_op_onsuccess(client, responseXml); };
    
    this.client.onerror = function(client) { closureThis.pedidos_maestro_com_co__testService_op_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

pedidos_maestro_com_co__NotasVentaService.prototype.testService = pedidos_maestro_com_co__testService_op;

function pedidos_maestro_com_co__testService_serializeInput(cxfjsutils, args) {
    var wrapperObj = new pedidos_maestro_com_co__testService();
    wrapperObj.setArg0(args[0]);
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://pedidos.maestro.com.co/' ");
    // block for local variables
    {
     xml = xml + wrapperObj.serialize(cxfjsutils, 'jns0:testService', null);
    }
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

pedidos_maestro_com_co__NotasVentaService.prototype.testService_serializeInput = pedidos_maestro_com_co__testService_serializeInput;

function pedidos_maestro_com_co__testServiceResponse_deserializeResponse(cxfjsutils, partElement) {
    var returnObject = pedidos_maestro_com_co__testServiceResponse_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function pedidos_maestro_com_co__NotasVentaService_pedidos_maestro_com_co__NotasVentaServicePort () {
  this.url = 'http://localhost:8080/TestWebService/services/NotasVentaServicePort';
}
pedidos_maestro_com_co__NotasVentaService_pedidos_maestro_com_co__NotasVentaServicePort.prototype = new pedidos_maestro_com_co__NotasVentaService;
