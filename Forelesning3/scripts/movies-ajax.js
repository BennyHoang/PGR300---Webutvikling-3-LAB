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
            $showAllBtn.on("click", function () {

            });
        } ();

        var initPage = function () {

        } ();
    } ();

    function getMoviesXML() {
        $.ajax(
            {
                method: "GET",
                url: "xml/movies.xml",
                dataType: "xml",
                
            }
        );

    }
});