function executeArtistQuery(x) {
    $(".posts").append("<h4>Wait for it...</h4>");
    if (x) {
        $.getJSON("http://localhost:5000/reviews_by_artist/" + x, function (data) {
            var artist = data;
        });
        $(".posts").empty();
        if (artist) {
            var content = "<h1>" + artist.artist_name + "</h1><h4>Artist id: " + artist.artist_id + "</h4><h4>Artist's type: " + artist.artist_type + "</h4><h4>Artist's origin: " + artist.artist_origin_country + "</h4><h4>Artist;s genres:</h4><p>";
            for (var i = 0; i < artist.artist_genres_list.length; i++) {
                content += artist.artist_genres_list[i] + "&nbsp";
            }
            content += "</p><h4>Artist's URLs:</h4>";
            for (var i = 0; i < artist.url_list.length; i++) {
                content += "<p>" + artist.url_list[i].type + ": " + artist.url_list[i].url + "</p>";
            }
            reviews = artist.reviews;
            var ids = [];
            for (var i = 0; i < reviews.length; i++) {
                ids.append(reviews[i].review_id)
                content = "<div class='row'><h4> Review id: " + reviews[i].review_id + "</h4><p>Username:"
                    + reviews[i].username + "</p><p>Artist: " + reviews[i].artist_name + "</p><p>Ranking: "
                    + reviews[i].star_rating + "</p><p>reviews[i].review</p>";

                content += "</div>";
            }
            $(".posts").append(content);
        }
        else {
            $(".posts").append("<h3>There seem to have a problem with this request, try something else...</h3>");
        }
    }
    else {
        $(".posts").empty();
        $(".posts").append("<h3>please enter artist's name</h3>");
    }
}


$(document).ready(function () {
    //events buttens
    $('.eventsB').on("click", function () {
        // window.location.href = "Events.html";
        window.location.href = "/Events";

    });
    //location buttens
    $(".locationB").on("click", function () {
        // window.location.href = "Locations.html";
        window.location.href = "/Locations";

    });
    //home buttens
    $(".navbar-brand").on("click", function () {
        // window.location.href = "Home.html";
        window.location.href = "/";

    });
    //reviews buttens
    $(".reviewsB").on("click", function () {
        // window.location.href = "Reviews.html";
        window.location.href = "/Reviews";
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