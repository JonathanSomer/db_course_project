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

function executeEventQuery(qNum, x) {
    $(".posts").append("<h3>Wait for it...</h3>");
    var events, address, artist, content;
    switch (qNum) {
        case 1:
            address = "http://127.0.0.1:5000/top_10/" + x;
            break;
        case 5:
            address = "http://127.0.0.1:5000/similar_artists_events/" + x;
            break;
        case 6:
            address = "http://localhost:5000/highest_rated_artist_events";
            break;
        case 7:
            address = "http://localhost:5000/events_by_artist_review/" + x;
    }
    $.getJSON(address, function (data) {
        $(".posts").empty();
        if (data) {
            events = data.events;
            if (events) {
                for (var i = 0; i < events.length; i++) {
                    var event = events[i];
                    content = "<div class='row'>";
                    content += "<div class='post col-md-6'><h2>" + event.event_name + "</h2><p>Event id: " + event.event_id + "</p><p>Event type: " + event.event_type + "</p><p>Popularity: " + event.popularity + "</p><p>Date: " + event.event_date + "</p><p>Event url: " + event.event_url + "</p> <p>Venue: " + event.venue_name + ", " + event.venue_city + ", " + event.venue_country + "</p></div><div class='post col-md-6 performers'><h4><u>Performers:</u></h4>";
                    content += "<div class='row'>";
                    for (var j = 0; j < event.artist_name.length; j++) {
                        if (j != 0 && j % 4 == 0) {
                            content += "</div><div class='row'>";
                        }
                        content += "<div class='col-lg-3'><p>" + event.artist_name[j] + "</p></div>";
                    }
                    content += "</div>";
                    $(".posts").append(content);
                }
            }
            else {
                $(".posts").append("<h3>There seem to have a problem with this request, try something else...</h3>");
            }
        }
    });
}


$(document).ready(function () {
    //home buttens
    $(".navbar-brand").on("click", function () {
        window.location.href = "Home.html";
    });
    //location buttens
    $(".locationB").on("click", function () {
        window.location.href = "Locations.html";
    });
    //artist buttens
    $(".artistB").on("click", function () {
        window.location.href = "Artists.html";
    });

    // q1_get butten
    $('#q1_get').on("click", function () {
        var x = document.getElementById('q1_month').value;
        if (x) {
            executeEventQuery(1, x);
        }
    });

    //q5_get butten
    $('#q5_get').on("click", function () {
        var x = document.getElementById('q5_artist').value;
        if (x) {
            x = x.split(' ').join('_');
            executeEventQuery(5, x);
        }
    });

    //q6_get butten
    $('#q6_get').on("click", function () {
        executeEventQuery(6);
    });

    //q7_get butten
    $('#q7_get').on("click", function () {
        var x = document.getElementById("q7_words").value;
        if (x) {
            x = x.split(' ').join('_');
            executeEventQuery(7, x);
        }
    });
});

