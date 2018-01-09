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


var events;
function executeEventQuery(qNum, x) {
    $(".posts").append("<h4>Wait for it...</h4>");
    switch (qNum) {
        case 1:
            $.getJSON("http://127.0.0.1:5000/top_10/" + x, function (data) {
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
                console.log(data);
                console.log(events);
            });
            break;
    }
    $(".posts").empty();
    if (events) {
        events = events.events;
        if (events) {
            if (events.length > 0) {
                for (var i = 0; i < events.length; i++) {
                    var event = events[i];
                    content = "<div class='row'>";
                    content += "<div class='post col-md-6'><h2>" + event.event_name + "</h2><p><B>Event id:</B> " + event.event_id + "</p><p><B>Event type:</B> " + event.event_type + "</p><p><B>Popularity:</B> " + event.popularity + "</p><p><B>Date:</B> " + event.event_date + "</p><p><B>Event url:</B> " + event.event_url + "</p> <p><B>Venue: </B>" + event.venue_name + ", " + event.venue_city + ", " + event.venue_country + "</p></div><div class='post col-md-6 performers'><h4><u>Performers:</u></h4>";
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
                $(".posts").append("<h4>There are no events to show for your request</h4>");
            }
        }
        else {
            $(".posts").append("<h4>There seem to have a problem with this request, try something else... (err1)</h4>");
        }
    }
    else {
        $(".posts").append("<h4>There seem to have a problem with this request, try something else... (err2)</h4>");
    }
}


$(document).ready(function () {

    //home buttens
    $(".navbar-brand").on("click", function () {
        // window.location.href = "Home.html";
        window.location.href = "/";

    });
    //location buttens
    $(".locationB").on("click", function () {
        // window.location.href = "Locations.html";
        window.location.href = "/Locations";

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

    // //q7_get butten
    // $('#q7_get').on("click", function () {
    //     var x = document.getElementById("q7_words").value;
    //     if (x) {
    //         x = x.split(' ').join('_');
    //         executeEventQuery(7, x);
    //     }
    // });
});

