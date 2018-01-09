function openQuery(queryNum, elmnt) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    $(".posts").empty();
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Show the specific tab content
    document.getElementById(queryNum).style.display = "block";
}

function executeLocationQuery(qNum, x, y) {
    $(".posts").append("<h4>Wait for it...</h4>");
    var locations;
    switch (qNum) {
        case 2:
            $.getJSON("http://localhost:5000/most_genre_city/" + x + y, function (data) {
                locations = data;
            });
            break;
        case 3:
            $.getJSON("http://localhost:5000/most_events_city/" + x + y, function (data) {
                locations = data;
            });
            break;

        case 4:
            $.getJSON("http://localhost:5000/high_season", function (data) {
                locations = data;
            });
            break;
    }
    $(".posts").empty();
    if (locations) {
        content = "<h2>" + locations.city + "</h2><h4><u>Country:</u> " + locations.country + "</h4><h4><u>Month:</u> " + locations.month + "</h4>";
        if (qNum == 2 && data.genres) {
            content += "<h4>Num of genres:" + locations.genres + "</h4>";
            $(".posts").append(content);
        }
        else {
            $(".posts").append("<h3>There seem to have a problem with this request, try something else...</h3>");
        }
//    What if no locations? TODO
    }
}

$(document).ready(function () {
    //events buttens
    $('.eventsB').on("click", function () {
        // window.location.href = "Events.html";
        window.location.href = "/Events";
    });
    //home buttens
    $(".navbar-brand").on("click", function () {
        // window.location.href = "Home.html";
        window.location.href = "/";
    });
    //artist buttens
    $(".artistB").on("click", function () {
        // window.location.href = "Artists.html";
        window.location.href = "/Artists";
    });
    //reviews buttens
    $(".reviewsB").on("click", function () {
        // window.location.href = "Reviews.html";
        window.location.href = "/Reviews";
    });

    // q2_get butten
    $('#q2_get').on("click", function () {
        var x = document.getElementById('q2_month').value;
        if (x) {
            executeLocationQuery(2, x);
        }
    });

    //q3_get butten
    $('#q3_get').on("click", function () {
        var x = document.getElementById('q3_month').value;
        if (x) {
            executeLocationQuery(3, x);
        }
    });

    //q4_get butten
    $('#q4_get').on("click", function () {
        executeLocationQuery(4)
    });

});
