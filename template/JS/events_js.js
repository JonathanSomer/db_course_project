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

function executeEventQuery(qNum, x, y) {
    $(".posts").append("<h4>Wait for it...</h4>");
    var events;
    switch (qNum) {
        case 1:
            $.getJSON("http://127.0.0.1:5000/top_10/" + x + y, function (data) {
                events = data;
            });
            break;
        case 5:
            $.getJSON("http://127.0.0.1:5000/similar_artists_events/" + x, function (data) {
                events = data;
            });
            break;

        case 6:
            $.getJSON("http://localhost:5000/highest_rated_artist_events/", function (data) {
                events = data;
            });
            break;

        case 7:
            $.getJSON("http://localhost:5000/events_by_artist_review/" + x, function (data) {
                events = data;
            });
    }
    $(".posts").empty();
    console.log(events);
    if (events) {
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            $(".posts").append("<div class='row'>");
            var content = "<div class='post col-lg-1'><h2>event.event_name</h2><p>Event id: " + event.event_id + "</p><p>Event type: " + event.event_type + "</p><p>Popularity: " + event.popularity + "</p><p>Date: " + event.event_date + "</p><p>Event url: " + event.event_url + "</p> <p>Venue: " + event.venue_name + ", " + event.venue_city + ", " + event.venue_country + "</p><p><u>Performers:</u></p></div>"
            $(".posts").append(content);
            for (var j = 0; j < event.artist_name.length; j++) {
                artist = "<p>&nbsp&nbsp&nbsp" + event.artist_name[j] + "</p>"
                $(".posts").append(artist);
            }
        }
    }
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
            var tmp = x.split('-');
            executeEventQuery(1, tmp[0], tmp[1]);
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

