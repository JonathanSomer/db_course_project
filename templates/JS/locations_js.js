function openQuery(queryNum, elmnt) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    $(".posts").empty();
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Show the specific tab content
    document.getElementById(queryNum).style.display = "block";
}

function executeLocationQuery(qNum, x, y){
    $(".posts").append("<h4>Wait for it...</h4>");
    var locations;
    switch (qNum) {
        case 2:
            $.getJSON("http://localhost:5000/most_genre_city/" + x + y, function (data) {
                locations = data;
            });
            break;
        case 3:
            $.getJSON("http://localhost:5000/most_events_city/" + x +y, function (data) {
                locations = data;
            });
            break;

        case 4:
            $.getJSON("http://localhost:5000/high_season", function (data) {
                locations = data;
            });
            break;
    }
    $(".posts").empty();
    console.log(locations);
}

$(document).ready(function () {
    //events buttens
    $('.eventsB').on("click", function () {
        window.location.href = "Events.html";
    });
    //home buttens
    $(".navbar-brand").on("click", function () {
        window.location.href = "Home.html";
    });
    //artist buttens
    $(".artistB").on("click", function () {
        window.location.href = "Artists.html";
    });

    // q2_get butten
    $('#q2_get').on("click", function () {
        var x = document.getElementById('q2_month').value;
        if (x) {
            var tmp = x.split('-');
            executeLocationQuery(2, tmp[0], tmp[1]);
        }
    });

    //q3_get butten
    $('#q3_get').on("click", function () {
        var x = document.getElementById('q3_month').value;
        if (x) {
            var tmp = x.split('-');
            executeLocationQuery(3, tmp[0], tmp[1]);
        }
    });

    //q4_get butten
    $('#q4_get').on("click", function () {
        executeLocationQuery(4)
    });

});
