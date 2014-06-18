sap.ui.localResources("view");
sap.ui.localResources("model");
jQuery.sap.registerModulePath("app", "app");

/*
jQuery.sap.require("app.Component");

//create app Component and place at dom element with id = root
new sap.ui.core.ComponentContainer({
    name: "app"
}).placeAt('root');
*/

sap.ui.jsview("RootView", "app.App").placeAt('content');

//FIXME - remove when no use Kinvey
var promise = Kinvey.init({
    appKey    : 'kid_VTS8kUwpI9',
    appSecret : 'a34280b4eff141aa94bdaf9aef12a48a'
});

promise.then( function() {
	getPetitioners();
	getProducts();	
});
