/**
 * Google Maps V3 implementation
 */

util.gmaps = {
	goptions: {
		zoom:10
	} 
}

util.gmaps.initialize = function(sel)
{   
    _s(sel).style("width:500px;height:300px;float:left;")
	var map = new google.maps.Map(_s(sel).getNode(), util.gmaps.goptions);
}
util.prepare(function()
{
	util.gmaps.goptions = util.extend(util.gmaps.goptions,{
	      center: new google.maps.LatLng(52, 5.2),
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    })	
})