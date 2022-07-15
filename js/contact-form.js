
function sendMail() {
    var params = {
        from_name : document.getElementById("name").value,
        email_id : document.getElementById("email_id").value,
        message : document.getElementById("message").value
    }

    emailjs.send("service_vqnoby5","template_is1ti5m", params).then(function (res) {
        console.log("Success " + res.status);
    })
}

var submit_button = document.getElementById("btn-submit");

submit_button.addEventListener("click", function(e) {
    var required = document.querySelectorAll("input[required]");

    required.forEach(function(element) {
        if(element.value.trim() == "") {
            element.style.borderColor = "#48101B";
        } else {
            element.style.backgroundColor = "#011321";
        }
    });
});
$(document).ready(function () {
    $("#name").keyup(function () {
        $(".name-code").text($("#name").val());
    });
    $("#email_id").keyup(function () {
        $(".email-code").text($("#email_id").val());
    });
    $("#message").keyup(function () {
        $(".message-code").text($("#message").val());
    });
});

var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
var dayNames= ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

var newDate = new Date();
newDate.setDate(newDate.getDate() );
$('.date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()]);
