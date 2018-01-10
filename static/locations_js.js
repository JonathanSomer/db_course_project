function openQuery(queryNum) {
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


var locationss;
function executeLocationQuery(qNum, x) {
    $(".posts").append("<h4>Wait for it...</h4>");
    switch (qNum) {
        case 2:
            $.getJSON("http://localhost:5000/most_genre_city/" + x, function (data) {
                locationss = data;
                handleCallback(qNum)
            });
            break;
        case 3:
            $.getJSON("http://localhost:5000/most_events_city/" + x, function (data) {
                locationss = data;
                handleCallback(qNum)
            });
            break;

        case 4:
            $.getJSON("http://localhost:5000/high_season", function (data) {
                locationss = data;
                handleCallback(qNum)
            });
            break;
    }
}

function handleCallback(q) {
    $(".posts").empty();
    debugger;
    if (locationss) {
        var content = "<h2>" + locationss.city + "</h2><h4><u>Country:</u> " + locationss.country + "</h4><h4><u>Month:</u> " + locationss.month + "</h4>";
        if (q == 2 && data.number_of_genres) {
            content += "<h4>Num of genres:" + locationss.number_of_genres + "</h4>";
        }
        $(".posts").append(content);
    }
    else {
        $(".posts").append("<h4>There are no locations to show for your request</h4>");
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
