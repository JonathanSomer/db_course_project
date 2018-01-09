function executeReviewsQuery(x) {
    $(".posts").append("<h4>Wait for it...</h4>");
    // $.getJSON("http://127.0.0.1:5000/top_10/" + x + y, function (data) {
    //             events = data;
    //         });
}



$(document).ready(function () {
    //events buttens
    $('.eventsB').on("click", function () {
        window.location.href = "Events.html";
        // window.location.href = "/Events"; TODO

    });
    //location buttens
    $(".locationB").on("click", function () {
        window.location.href = "Locations.html";
        // window.location.href = "/Locations"; TODO

    });
    //home buttens
    $(".navbar-brand").on("click", function () {
        window.location.href = "Home.html";
        // window.location.href = "/"; TODO

    });
    //artist buttens
    $(".artistB").on("click", function () {
        window.location.href = "Artists.html";
        // window.location.href = "/Artists"; TODO

    });

    //_get butten
    $('#review_btn').on("click", function () {
        var x = document.getElementById('review_btn').value;
        if (x) {
            x = x.split(' ').join('_');
            executeReviewQuery(x)
        }
    });
});