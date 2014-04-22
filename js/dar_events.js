/**
 * Created by anandraj on 3/15/14.
 */


$(document).ready(function () {

    $("#content").on('live', function () {

        alert("ready");

        $("#add_dar").on('click', function () {
            alert('Hi');
        });

    });


});

window.onload(function () {
    alert("onload");
});


function sam() {
    alert('HHHai');
}