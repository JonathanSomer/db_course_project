var artist;
var urls;
var revs;
var reviews;
function executeArtistQuery(x) {
    $(".posts").empty();
    $(".posts").append("<h4>Wait for it...</h4>");
    if (x) {
        $.getJSON("http://localhost:5000/artist_info/" + x, function (data1) {
            artist = data1[0];
            continue_to_urls(x);
        });
    }
    else {
        $(".posts").empty();
        $(".posts").append("<h4>please enter artist's name</h4>");
    }
}
function continue_to_urls(x) {
    if (artist) {
        $.getJSON("http://localhost:5000/urls/" + x, function (data2) {
            urls = data2;
            continue_to_revs(x);
        });
    }
    else {
        $(".posts").empty();
        $(".posts").append("<h4>Artist not found in our database ):</h4>");
    }
}

function continue_to_revs(x) {
    $.getJSON("http://localhost:5000/reviews/" + x, function (data3) {
        revs = data3;
        handleCallback();
    });
}

function handleCallback() {
    $(".posts").empty();
    if (artist) {
        console.log(artist);
        console.log(urls);
        console.log(revs);
        var genres = artist.artist_genres_list.split(',')
        var content = "<h1>" + artist.artist_name + "</h1><h4>Artist id: " + artist.artist_id + "</h4><h4>Artist's type: " + artist.artist_type + "</h4><h4>Artist's origin: " + artist.artist_origin_country + "</h4><h4>Artist's genres:</h4>";
        content += "<div class='row'>";
        for (var i = 0; i < genres.length; i++) {
            if (i != 0 && i % 6 == 0) {
                content += "</div><div class='row'>";
            }
            content += "<div class='col-lg-2'><p>" + genres[i] + "</p></div>";
        }

        content += "</div><h4>Artist's URLs:</h4>";
        for (i = 0; i < urls.length; i++) {
            content += "<p><b>" + urls[i].type + ": </b>" + urls[i].artist_url + "</p>";
        }
        var ids = [];
        for (i = 0; i < revs.length; i++) {
            ids.push(revs[i].review_id);
            content += "<div class='row'><h4> Review id: " + revs[i].review_id + "</h4><p>Username:"
                + revs[i].username + "</p><p>Artist: " + revs[i].artist_name + "</p><p>Ranking: "
                + revs[i].star_rating + "</p><p>"+revs[i].review+"</p>";

            content += "</div>";
        }
        $(".posts").append(content);
    }
    else {
        $(".posts").append("<h4>It seems we have nothing about the artist you are looking for, try something else...</h4>");
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
            x = x.split(' ').join('$');
            executeArtistQuery(x)
        }
    });

    //adding_review butten
    $('#adding_btn').on("click", function () {
        var usr = document.getElementById('adding_username').value;
        var pass = document.getElementById('adding_password').value;
        var rank = document.getElementById('adding_rank').value;
        var comment = document.getElementById('adding_comment').value;
    });
});


// content += "<div form id='adding_form'><input id='adding_username' type='text' placeholder='Username' required>" +
//     "<input id='adding_password' type='password' placeholder='Password' required>" +
//     "</divform><select id='adding_rank' required><option value=''>Rank</option><option value='1'>1</option>" +
//     "<option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option>" +
//     "<option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option>" +
//     "<option value='10'>10</option></select><p>Enter comment:</p><textarea id='adding_comment' placeholder='Comment' rows='5' cols='100'></textarea>" +
//     "<div><button id='adding_btn'>Add comment</button></div></div>";