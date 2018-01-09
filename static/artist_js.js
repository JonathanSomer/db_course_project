function executeArtistQuery(x) {
    if (x) {
        $.getJSON("http://localhost:5000/reviews_by_artist/" + x, function (data) {
            artist = data;
        }
        debugger;
        // $(".posts").empty();
        // if (events) {
        //     for (var i = 0; i < events.length; i++) {
        //         var event = events[i];
        //         $(".posts").append("<div class='row'>");
        //         var content = "<div class='post col-lg-1'><h2>event.event_name</h2><p>Event id: " + event.event_id + "</p><p>Event type: " + event.event_type + "</p><p>Popularity: " + event.popularity + "</p><p>Date: " + event.event_date + "</p><p>Event url: " + event.event_url + "</p> <p>Venue: " + event.venue_name + ", " + event.venue_city + ", " + event.venue_country + "</p><p><u>Performers:</u></p></div>"
        //         $(".posts").append(content);
        //         for (var j = 0; j < event.artist_name.length; j++) {
        //             artist = "<p>&nbsp&nbsp&nbsp" + event.artist_name[j] + "</p>"
        //             $(".posts").append(artist);
        //         }
        //     }
        // }
    }
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
    //reviews buttens
    $(".reviewsB").on("click", function () {
        window.location.href = "/Reviews.html";
        // window.location.href = "/Reviews"; TODO
    });

    //_get butten
    $('#artist_btn').on("click", function () {
        var x = document.getElementById('artist_input').value;
        if (x) {
            x = x.split(' ').join('_');
            executeArtistQuery(x)
        }
    });
});