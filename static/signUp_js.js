var usr;
var pass;
var passV;
var message;
function handleSignIn(usr, pass, passV) {
    $(".posts").empty();
    if (usr.length == 0 || pass.length == 0 || passV.length == 0) {
        message = "Please enter all required details";
        postMessage();
    }
    else if (pass != passV) {
        message = "Please enter a matching password validation";
        postMessage();
    }
    else {
        console.log(JSON.stringify({"username": usr, "password": pass}));
        debugger;
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/create_user",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({'username': usr, 'password': pass}),
            success: function (result) {
                message = result.status;
                postMessage();
            }
        });
    }

}

function postMessage() {
    $(".posts").append("<h4>" + message + "</h4>");
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
    //events buttens
    $('.eventsB').on("click", function () {
        // window.location.href = "Events.html";
        window.location.href = "/Events";

    });
    //signUpBtn butten
    $('#mainSignUpBtn').on("click", function () {
        usr = document.getElementById('username').value;
        pass = document.getElementById('password').value;
        passV = document.getElementById('passwordValidation').value;
        handleSignIn(usr, pass, passV);
    });
});