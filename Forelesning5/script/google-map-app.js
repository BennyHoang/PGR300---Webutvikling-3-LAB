$(function () {
    //HTML Objects
    var $getEarthQuakesBtn;
    var $markerInformationSpan;
    var $googleMapSection;

    //Google map Objects
    var googleMapObject;
    var usGovUrl = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";
    //US GOV API URL

    //init
    var init = function () {
        var setHTMLObjects = function () {
            $getEarthQuakesBtn = $("#getEarthquakesBtn");
            $markerInformationSpan = $("#markerInformationSpan");
            $googleMapSection = $("#googleMapSection").get(0);
        } ();

        var setEvents = function () {
            $getEarthQuakesBtn.on("click", function(){
                getUSGovFeed();
                alert("SUX MAN");
            })
        } ();

        var initGoogleMap = function () {
            var googleMapConfig = {
                zoom: 2,
                center: new google.maps.LatLng(0,0)
            };
            googleMapObject = new google.maps.Map($googleMapSection, googleMapConfig);
        } ();
        createMarker(24, 134, "oslo");
        createMarker(-24, -134, "trondheim");
        createMarker(-54, 234, "stavanger");
        createMarker(-14, 44, "bergen");
    } ();
    function getUSGovFeed(){
        $.getJSON(usGovUrl)
            .done(function(eqResult){
                alert("SUX MAN");
                createAllMarkers(eqResult.features);
            })
            .fail(function(){
                alert("fail!");
            });
    }
    //application logic
    function createAllMarkers(earthquakes){
        $.each(earthquakes, function(i, earthquakes){
            var title = earthquakes.properties.place;
            var latitude = earthquakes.geometry.coordinates[1];
            var longitude =  earthquakes.geometry.coordinates[0];
            createMarker(latitude,longitude,title);
       });
    }
    function createMarker(latitude, longitude, information){
        var newMarker = new google.maps.Marker(
            {
                title: information,
                label: "T",
                position: new google.maps.LatLng(latitude,longitude),
                map: googleMapObject,
                information: information
            }
        );

        newMarker.addListener("mouseover",function(){
            $markerInformationSpan.html(this.information);
        });
    }
});