function executeArtistQuery(x) {
    $(".posts").append("<h4>Wait for it...</h4>");
    $.getJSON("http://127.0.0.1:5000/top_10/" + x + y, function (data) {
                events = data;
            });
}


$(document).ready(function () {
    //events buttens
    $('.eventsB').on("click", function () {
        window.location.href = "Events.html";
    });
    //location buttens
    $(".locationB").on("click", function () {
        window.location.href = "Locations.html";
    });
    //home buttens
    $(".navbar-brand").on("click", function () {
        window.location.href = "Home.html";
    });

    //_get butten
    $('#artist_btn').on("click", function () {
        var x = document.getElementById('artist_input').value;
        if(x){
            executeArtistQuery(x)
        }
    });
});