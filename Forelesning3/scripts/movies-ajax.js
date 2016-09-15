$("document").ready(function () {

    var moviesXMLObject = null;


    var $titleSearchTxt;
    var $showSearchByTitleBtn, $showAllBtn;
    var $mainContent;

    var init = function () {
        var setHTMLObjects = function () {
            $titleSearchTxt = $("#titleSearchTxt");
            $showSearchByTitleBtn = $("#showSearchByTitleBtn");
            $showAllBtn = $("#showAllBtn");
            $mainContent = $("#mainContent");
        } ();

        var setEvents = function () {
            $showAllBtn.on("click", showAll);
        } ();

        var initPage = function () {

        } ();
        getMoviesXML();
    } ();

    function showAll() {
        $(moviesXMLObject)
            .find("movie")
            .each(function () {
                var title = $("title", this).text();
                var imageSrc = $("imageSrc", this).text();

                var $newTitle = $("<h3>").html(title);
                var $newImage = $("<img>")
                    .attr(
                    {
                        src: "images/" + imageSrc,
                        alt: title
                    }
                    )
                    .addClass("img-responsive");
                var $newArticle = $("<article>")
                    .addClass("col-md-")
                    .append($newTitle, $newImage);
                $mainContent.append($newArticle);
            });
    }

    function getMoviesXML() {
        $.ajax(
            {
                method: "GET",
                url: "xml/movies.xml",
                dataType: "xml",
                async: true,
                beforeSend: function () {
                    console.log("Skal sende snart!");
                },
                success: function (xmlResult) {
                    moviesXMLObject = xmlResult;
                },
                error: function (xhr, statusText, errorMsg) {
                    console.log(xhr + " " + statusText + " " + errorMsg);
                },
                complete: function () {
                    console.log("Complete");
                }
            }
        );
    }
});