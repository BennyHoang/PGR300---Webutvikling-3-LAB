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
                console.log(result.items[0].title);
                showFlickrFeed(result)
            })
            .fail(function () {
                console.log("Error");
            });
    }

    //Show flickr feed
    function showFlickrFeed(feed) {
        $mainContent.html("");
        $(feed.items).each(function () {

            var title = this.title;
            var imageUrl = this.media.m;

            var $article = $("<article>")
                .addClass("col-md-6");

            var $thumbnail = $("<div>")
                .addClass("thumbnail");

            var $caption = $("<div>")
                .addClass("caption");

            var $image = $("<img>")
                .attr({ src: imageUrl, alt: title })
                .addClass("img-responsive");

            var $title = $("<h3>").html(title);

            $article
                .append(
                $thumbnail
                    .append(
                    $image,
                    $caption
                        .append($title)
                    )
                );
            $mainContent.append($article);
        });
    }
});