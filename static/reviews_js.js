var reviews;
function executeReviewsQuery(x) {
    if (x) {
        $(".posts").append("<h4>Wait for it...</h4>");
        if (x) {
            $.getJSON("http://localhost:5000/events_by_artist_review/" + x, function (data) {
                reviews = data;
                console.log(reviews);
                debugger;
                handleCallback();
            });
        }
        else {
            $(".posts").empty();
            $(".posts").append("<h4>please enter key words</h4>");
        }
    }
}

function handleCallback() {
    $(".posts").empty();
    if (reviews && reviews.reviews) {
        reviews = reviews.reviews;
        var content;
        var ids = [];
        for (var i = 0; i < reviews.length; i++) {
            ids.append(reviews[i].review_id)
            content = "<div class='row'><h4> Review id: " + reviews[i].review_id + "</h4><p>Username:"
                + reviews[i].username + "</p><p>Artist: " + reviews[i].artist_name + "</p><p>Ranking: "
                + reviews[i].star_rating + "</p><p>reviews[i].review</p>";
            content += "</div>";
            $(".posts").append(content);
        }
    }
    else {
        $(".posts").append("<h4>It seems these key words don't appear in none of the comments, try something else...</h4>");
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
    //artist buttens
    $(".artistB").on("click", function () {
        // window.location.href = "Artists.html";
        window.location.href = "/Artists";

    });

    //_get butten
    $('#review_btn').on("click", function () {
        var x = document.getElementById('review_input').value;
        if (x) {
            x = x.split(' ').join('$');
            executeReviewsQuery(x)
        }
    });
});