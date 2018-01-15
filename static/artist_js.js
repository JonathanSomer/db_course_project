//edit review

var edit_message;
function executeEdit(usr, pass, rank, comment) {
    $("#editionResult").empty();
    if (rank == "" || comment == "") {
        message = "Please enter rank and comment";
        postAddMessage();
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:5000/edit_review",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            'username': usr, 'password': pass, 'review': {
                'id': chosenRevId, 'text': comment, 'rank': rank
            }
        }),
        success: function (result) {
            edit_message = result.status;
            postEditMessage();
        }
    });
}
function postEditMessage() {
    $("#editionResult").append(edit_message);
    if (edit_message == "success") {
        executeArtistQuery(artist.artist_name);
    }
}


//delete review

var delete_message;
function executeDelete(usr, pass) {
    $("#deletionResult").empty();
    $.ajax({
        type: "POST",
        url: "http://localhost:5000/delete_review",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            'username': usr, 'password': pass, 'review': {
                'id': chosenRevId
            }
        }),
        success: function (result) {
            delete_message = result.status;
            postDeleteMessage();
        }
    });
}
function postDeleteMessage() {
    $("#deletionResult").append(delete_message);
    if (delete_message == "success") {
        executeArtistQuery(artist.artist_name);
    }
}


//add review

var add_message;
function executeAdd(usr, pass, rank, comment) {
    if (rank == "" || comment == "") {
        add_message = "Please enter rank and comment";
        postAddMessage();
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:5000/create_review",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            'username': usr, 'password': pass, 'review': {
                'artist_id': artist.artist_id, 'text': comment, 'rank': rank
            }
        }),
        success: function (result) {
            add_message = result.status;
            postAddMessage();
        }
    });
}
function postAddMessage() {
    $("#additionResult").append(add_message);
    if (add_message == "success") {
        executeArtistQuery(artist.artist_name);
    }
}


//full query text

var artistsList;
function executeFullTextArtistQuery() {
    chosenArtist = chosenArtist.split(' ').join('$');
    $(".posts").empty();
    $.getJSON("http://localhost:5000/artists_by_name/" + chosenArtist, function (data1) {
        if (data1) {
            artistsList = data1.artists;
            showArtistsList();
        }
        else {
            $(".posts").append("<h4>There seems we have problem with this request... (err1)</h4>");
        }
    });
}


// load artists list to page
var btn = [];
var t = [];
function showArtistsList() {
    if (artistsList.length == 0) {
        $(".posts").append("<h4>It seems there are no results for artists with that name, perhaps try something else...</h4>");
    }
    else {
        var content = "<h4>Results: (press to see more)</h4>";
        $(".posts").append(content);
        for (var j = 0; j < artistsList.length; j++) {
            btn.push(document.createElement("BUTTON"));
            t.push(document.createTextNode(artistsList[j].artist_name));
            btn[j].appendChild(t[j]);
            btn[j].className = 'artistsNames';
            btn[j].id = artistsList[j].artist_name.split(' ').join('$');
            btn[j].onclick = function () {
                chosenArtist = this.id;
                executeArtistQuery();
            }
            $(".posts").append(btn[j]);
        }
    }
}


//artist details query

var artist;
var urls;
var revs;
var reviews;
function executeArtistQuery() {
    chosenArtist = chosenArtist.split(' ').join('$');
    $(".posts").empty();
    $(".posts").append("<h4>Wait for it...</h4>");
    if (chosenArtist) {
        $.getJSON("http://localhost:5000/artist_info/" + chosenArtist, function (data1) {
            artist = data1[0];
            continue_to_urls();
        });
    }
    else {
        $(".posts").empty();
        $(".posts").append("<h4>please enter artist's name</h4>");
    }
}
function continue_to_urls() {
    if (artist) {
        $.getJSON("http://localhost:5000/urls/" + chosenArtist, function (data2) {
            urls = data2;
            continue_to_revs();
        });
    }
    else {
        $(".posts").empty();
        $(".posts").append("<h4>Artist not found in our database ):</h4>");
    }
}
function continue_to_revs() {
    $.getJSON("http://localhost:5000/reviews/" + chosenArtist, function (data3) {
        revs = data3;
        showArtistPage();
    });
}


//load artist details to page

var chosenRevId;
function showArtistPage() {
    $(".posts").empty();
    if (artist) {
        var genres = artist.artist_genres_list.split(',');
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
            content += "<p><b>" + urls[i].type + ":&nbsp</b><a href=" + urls[i].artist_url + " target='_blank'>" + urls[i].artist_url + "</a></p>";
        }
        content += "<a id='addReview' data-toggle='modal' data-target='#add_comment_modal' data-original-title>" +
            "<B>Add  a review</B></a>";
        for (i = 0; i < revs.length; i++) {
            content += "<div class='row reviewsRow'><h4> Review id: " + revs[i].review_id + "</h4><p>Username:&nbsp"
                + revs[i].username + "</p><p>Artist: " + revs[i].artist_name + "</p><p>Ranking: "
                + revs[i].star_rating + "</p><p>" + revs[i].review + "</p>" +
                "<button onClick='chosenRevId = " + revs[i].review_id + "' data-toggle='modal' data-target='#edit_comment_modal' data-original-title>Edit</button>" +
                "<button onClick='chosenRevId = " + revs[i].review_id + "' data-toggle='modal' data-target='#delete_comment_modal' data-original-title>Delete</button>";

            content += "</div>";
        }
        $(".posts").append(content);
    }
    else {
        $(".posts").append("<h4>It seems we have nothing about the artist you are looking for, try something else...</h4>");
    }
}


var chosenArtist;
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
    //_get butten
    $('#artist_btn').on("click", function () {
        chosenArtist = document.getElementById('artist_input').value;
        if (chosenArtist) {
            if (chosenArtist.length < 4) {
                executeArtistQuery()
            }
            else {
                executeFullTextArtistQuery();
            }
        }
    });


    //add comment butten
    $('#adding_btn').on("click", function () {
        var usr = document.getElementById('adding_username').value;
        var pass = document.getElementById('adding_password').value;
        var rank = document.getElementById('adding_rank').value;
        var comment = document.getElementById('adding_comment').value;
        executeAdd(usr, pass, rank, comment);
    });

    //edit comment butten
    $('#edit_btn').on("click", function () {
        var usr = document.getElementById('edit_username').value;
        var pass = document.getElementById('edit_password').value;
        var rank = document.getElementById('edit_rank').value;
        var comment = document.getElementById('edit_comment').value;
        executeEdit(usr, pass, rank, comment);
    });
    // clear reviews modal
    $('#edit_comment_modal').on('hidden.bs.modal', function () {
        $(this).find('#edit_username, #edit_rank, #edit_password, #edit_password').val('');
    });

    //delete comment butten
    $('#delete_btn').on("click", function () {
        var usr = document.getElementById('delete_username').value;
        var pass = document.getElementById('delete_password').value;
        executeDelete(usr, pass);
    });

});





