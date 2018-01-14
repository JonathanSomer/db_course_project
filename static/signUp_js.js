function handleSignIn(usr, pass, passV) {
    $(".posts").empty();
    debugger;
    if (usr.length == 0 || pass.length == 0 || passV.length == 0){
        $(".posts").append("<h4>Please enter all required details</h4>");
    }
    else if (pass != passV) {
        $(".posts").append("<h4>Please enter a matching password validation</h4>");
    }
    else{

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
    //events buttens
    $('.eventsB').on("click", function () {
        // window.location.href = "Events.html";
        window.location.href = "/Events";

    });
    //signUpBtn butten
    $('#mainSignUpBtn').on("click", function () {
        var usr = document.getElementById('username').value;
        var pass = document.getElementById('password').value;
        var passV = document.getElementById('passwordValidation').value;
        handleSignIn(usr, pass, passV);
    });
});