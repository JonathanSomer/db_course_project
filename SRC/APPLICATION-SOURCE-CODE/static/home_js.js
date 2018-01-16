$(document).ready(function () {
    //events buttens
    $('.eventsB').on("click", function () {
        window.location.href = "/Events";
    });
    //location buttens
    $(".locationB").on("click", function () {
        window.location.href = "/Locations";
    });
    //artist buttens
    $(".artistB").on("click", function () {
        window.location.href = "/Artists";
    });
    //signUp buttens
    $(".signUpB").on("click", function () {
        window.location.href = "/SignUp";
    });
});
