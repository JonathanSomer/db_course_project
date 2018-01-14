function executeEdit(revId) {

}

function executeDelete(revId) {

}

var comment_add_form_html = "<div id='formContainer'><div id='popupContact'><h2>Add comment</h2><input " +
    "id='adding_username' type='text' placeholder='Username' required><input id='adding_password' " +
    "type='password' placeholder='Password' required><textarea id='adding_comment' placeholder='Comment' rows='5' cols='80'>" +
    "</textarea> <select id='adding_rank' required><option value=''>Rank</option><option value='1'>1</option>" +
    "<option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option>" +
    "<option value='6'>6</option><option value='7'>7</option><option value='8'>8</option>" +
    "<option value='9'>9</option><option value='10'>10</option></select><button id='adding_btn'>Add</button></div></div>";
function executeAdd() {


}



var artistsList;
function executeFullTextArtistQuery(x) {
    $(".posts").empty();
    $.getJSON("kjgbkhgkhbhbvl,v,jhvl,jvl,v,jvk,kk,jfjj,khcmgcjvj" + x, function (data1) {
        artistsList = data1
    });
    showArtistsList();
}

function showArtistsList() {

}


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
        showArtistPage();
    });
}

function showArtistPage() {
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
        content += "<div><button onClick='executeAdd()' id='addReview'><B>Add  a review!!!</B></button></div>";
        for (i = 0; i < revs.length; i++) {
            content += "<div class='row reviewsRow'><h4> Review id: " + revs[i].review_id + "</h4><p>Username:"
                + revs[i].username + "</p><p>Artist: " + revs[i].artist_name + "</p><p>Ranking: "
                + revs[i].star_rating + "</p><p>" + revs[i].review + "</p><button onClick='executeEdit(this.id)' " +
                "id='editReview_" + revs[i].review_id + "'>Edit</button><button onClick='executeDelete(this.id)' " +
                "id='deleteReview_" + revs[i].review_id + "'>Delete</button>";

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
    //signUp buttens
    $(".signUpB").on("click", function () {
        // window.location.href = "Artists.html";
        window.location.href = "/SignUp";
    });
    //reviews buttens
    // $(".reviewsB").on("click", function () {
    //     // window.location.href = "Reviews.html";
    //     window.location.href = "/Reviews";
    // });

    //_get butten
    $('#artist_btn').on("click", function () {
        var x = document.getElementById('artist_input').value;
        if (x) {
            if (x.length < 4) {
                x = x.split(' ').join('$');
                executeArtistQuery(x)
            }
            else {
                x = x.split(' ').join('$');
                executeFullTextArtistQuery(x);
            }
        }
    });
});

