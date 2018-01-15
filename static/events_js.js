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


var eventss;
function executeEventQuery(qNum, x) {
    $(".posts").empty();
    $(".posts").append("<h4>Wait for it...</h4>");
    switch (qNum) {
        case 1:
            $.getJSON("http://127.0.0.1:5000/top_10/" + x, function (data) {
                eventss = data;
                handleCallback()
            });
            break;
        case 5:
            $.getJSON("http://127.0.0.1:5000/similar_artists_events/" + x, function (data) {
                eventss = data;
                handleCallback()
            });
            break;

        case 6:
            $.getJSON("http://localhost:5000/highest_rated_artist_events/", function (data) {
                eventss = data;
                handleCallback()
            });
            break;
    }

}

function handleCallback() {
    $(".posts").empty();
    if (eventss) {
        eventss = eventss.events;
        if (eventss.length > 0) {
            for (var i = 0; i < eventss.length; i++) {
                var eventt = eventss[i];
                var artistList = eventt.artist_name.split(',');
                var content = "<div class='row'>";
                content += "<div class='post col-md-6'><h2>" + eventt.event_name + "</h2><p><B>Event type: &nbsp&nbsp</B> " + eventt.event_type + "</p><p><B>Popularity: &nbsp&nbsp</B> " + eventt.popularity + "</p><p><B>Date: &nbsp&nbsp</B> " + eventt.event_date + "</p><p><B>Event url: &nbsp&nbsp</B><a href=" + eventt.event_url + ">Songkick's event URL</a></p><p><B>Venue: &nbsp&nbsp</B>" + eventt.venue_name + ", " + eventt.venue_city + ", " + eventt.venue_country + "</p></div><div class='post col-md-6 performers'><h4><u>Performers:</u></h4>";
                content += "<div class='row'>";
                for (var j = 0; j < artistList.length; j++) {
                    if (j != 0 && j % 4 == 0) {
                        content += "</div><div class='row'>";
                    }
                    content += "<div class='col-lg-3'><p>" + artistList[j] + "</p></div>";
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
    //signUp buttens
    $(".signUpB").on("click", function () {
        // window.location.href = "Artists.html";
        window.location.href = "/SignUp";
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
            x = x.split(' ').join('$');
            executeEventQuery(5, x);
        }
    });

    //q6_get butten
    $('#q6_get').on("click", function () {
        executeEventQuery(6);
    });


});

