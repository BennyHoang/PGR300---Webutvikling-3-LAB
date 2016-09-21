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
            $showSearchByTitleBtn.on("click", showSearchByTitle);
        } ();

        var initPage = function () {

        } ();
        getMoviesXML();
    } ();

    function showSearchByTitle() {
        $mainContent.html("");
        $(moviesXMLObject)
            .find("movie")
            .each(function () {
                var title = $("title", this).text();
                var searchTerm = $titleSearchTxt.val();
                var searchMatch = title.toLowerCase().indexOf(searchTerm.toLowerCase());

                if (searchMatch !== -1) {
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
                        .addClass("col-md-3")
                        .append($newTitle, $newImage);

                    $mainContent.append($newArticle);
                }
            })
    }
    function showAll() {
        $mainContent.html("");

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
                    .addClass("col-md-3")
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

                beforeSend: function(){
                    console.log("Skal sende snart");
                    $mainContent
                        .append("<div class='col-md-12'><p class='alert alert-warning'>XML-filen laster...</p></div>")
                }, 
                success: function(xmlResult){
                    moviesXMLObject = xmlResult;
                    $(".alert")
                        .html("XML på plass :)")
                        .delay(1000).fadeOut(3000);
                },
                error: function(xhr, statusText, errorMsg){
                    console.log(xhr + " " + statusText + " " + errorMsg);
                },
                complete: function(){
                    console.log("Complete");
                }                
            }
        );//end ajax call
    }
});