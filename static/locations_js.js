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

function executeLocationQuery(qNum, x) {
    $(".posts").append("<h3>Wait for it...</h3>");
    var address, content;
    switch (qNum) {
        case 2:
            address = "http://localhost:5000/most_genre_city/" + x;
            break;
        case 3:
            address = "http://localhost:5000/most_events_city/" + x;
            break;
        case 4:
            address = "http://localhost:5000/high_season";
            break;
    }
    $.getJSON(address, function (data) {
        $(".posts").empty();
        if (data) {
            content = "<h2>" + data.city + "</h2><h4><u>Country:</u> " + data.country + "</h4><h4><u>Month:</u> " + data.month + "</h4>";
            if (qNum == 2 && data.genres) {
                content += "<h4>Genres:</h4><div class='row'>";
                for (var j = 0; j < data.genres.length; j++) {
                    if (j != 0 && j % 4 == 0) {
                        content += "</div><div class='row'>";
                    }
                    content += "<div class='col-lg-3'><p>" + data.genres[j] + "</p></div>";
                }
                content += "</div>";
            }
            $(".posts").append(content);
        }
        else {
            $(".posts").append("<h3>There seem to have a problem with this request, try something else...</h3>");
        }
    });
}


$(document).ready(function () {
    //events buttens
    $('.eventsB').on("click", function () {
        window.location.href = "Events.html";
    });
    //home buttens
    $(".navbar-brand").on("click", function () {
        window.location.href = "Home.html";
    });
    //artist buttens
    $(".artistB").on("click", function () {
        window.location.href = "Artists.html";
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
