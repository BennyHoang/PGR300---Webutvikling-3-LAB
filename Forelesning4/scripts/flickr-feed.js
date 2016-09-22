$(function () {
    //HTML objects
    var $mainContent;
    var $searchTermTxt;
    var $searchFlickrBtn;
    // flickr api url
    var flickrUrl = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

    //init
    var init = function () {

        var stHTMLObjects = function () {
            $mainContent = $("#mainContent");
            $searchTermTxt = $("#searchTermTxt");
            $searchFlickrBtn = $("#searchFlickrBtn");
        } ();

        var setEvents = function () {
            $searchFlickrBtn.on("click", function () {
                var searchTerm = $searchTermTxt.val();
                getAjaxFlickrFeed(flickrUrl, searchTerm);

            });
        } ();

    } ();//--end init

    //GET Ajax flickr feed
    function getAjaxFlickrFeed(url, searchTerm) {
        var flickrConfig = {
            tags: searchTerm,
            tagMode: "any",
            format: "json"
        };

        $.getJSON(url, flickrConfig)
            .done(function (result) {
                //console.log(result.items[0].title);
            })
            .fail(function () {
                console.log("Error");
            });
    }

    //Show flickr feed



});