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


// var artistsList;
// function executeFullTextArtistQuery(x) {
//     x = x.split(' ').join('$');
//     $(".posts").empty();
//     $.getJSON("kjgbkhgkhbhbvl,v,jhvl,jvl,v,jvk,kk,jfjj,khcmgcjvj" + x, function (data1) {
//         artistsList = data1
//     });
//     showArtistsList();
// }
//
// function showArtistsList() {
//
// }


var artist;
var urls;
var revs;
var reviews;
function executeArtistQuery(x) {
    x = x.split(' ').join('$');
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
            content += "<p><b>" + urls[i].type + ":&nbsp</b><a href=" + urls[i].artist_url + " target='_blank'>"+urls[i].artist_url+"</a></p>";
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
        var x = document.getElementById('artist_input').value;
        if (x) {
            if (x.length < 4) {
                executeArtistQuery(x)
            }
            else {
                executeFullTextArtistQuery(x);
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

