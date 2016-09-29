$(function () {
    //HTML Objects
    var $getEarthQuakesBtn;
    var $markerInformationSpan;
    var $googleMapSection;

    //Google map Objects
    var googleMapObject = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";
    var apiKey = "AIzaSyAcAnbCzEI69jMH6aAkLfJYyyX3U8ED0F8";
    //US GOV API URL

    //init
    var init = function () {
        var setHTMLObjects = function () {
            $getEarthQuakesBtn = $("#getEarthQuakesBtn");
            $markerInformationSpan = $("#markerInformationSpan");
            $googleMapSection = $("#googleMapSection").get(0);
        } ();

        var setEvents = function () {

        } ();

        var initGoogleMap = function () {
            var googleMapConfig = {
                zoom: 2,
                center: new google.maps.LatLng(0,0)
            };
            googleMapObject = new google.maps.Map($googleMapSection, googleMapConfig);
        } ();
        createMarker(24, 134, 1);
        createMarker(-24, -134, 2);
        createMarker(-54, 234, 2);
        createMarker(-14, 44, 2);

    } ();

    //application logic
    function createAllMarkers(){

    }
    function createMarker(latitude, longtitude, information){
        var newMarker = new google.maps.Marker(
            {
                title: information,
                label: "T",
                position: new google.maps.LatLng(latitude,longtitude),
                map: googleMapObject,
                information: information
            }
        );
    }
});