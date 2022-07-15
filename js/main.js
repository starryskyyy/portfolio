$(function () {
    $('.accordion-toggle .accordion-link').click(function () {
        if (!$(this).hasClass('accordion-on'))
            $('.accordion-toggle .accordion-link').removeClass('accordion-on');
        $(this).toggleClass('accordion-on');
        $(this).next(".accordion-panel").slideToggle().siblings(".accordion-panel:visible").slideToggle();
    })
});

$("#filter-options :checkbox").click(function()
{
    $("#results-list div").hide();
    $("#filter-options :checkbox:checked").each(function()
    {
        $("." + $(this).val()).show();
    });

    if($('#filter-options :checkbox').filter(':checked').length < 1)
    {
        $("#results-list div").show();

    }
});

$("#btn-personal-info,#btn-professional-info, #btn-hobby-info").click(function () {

    var magicBall = "img/magic-ball.png";
    var gamepad = "img/gamepad.png";
    var cmd = "img/cmd.png";
    var divToOpen = $(this).attr("id").replace("btn-", "");

    $("#professional-info,#personal-info,#hobby-info").hide();
    if (divToOpen === "personal-info") {
        $("#btn-personal-info").attr("src", "img/magic-ball-white.png");
        $("#btn-professional-info").attr("src", cmd);
        $("#btn-hobby-info").attr("src", gamepad);
        $("#cv").hide();

    } else if (divToOpen === "professional-info") {
        $("#btn-hobby-info").attr("src", gamepad);
        $("#btn-personal-info").attr("src", magicBall);
        $("#btn-professional-info").attr("src", "img/cmd-white.png");
        $("#cv").show();
        $("#personal-info").hide();
    } else {
        $("#btn-personal-info").attr("src", magicBall);
        $("#btn-professional-info").attr("src", cmd);
        $("#btn-hobby-info").attr("src", "img/gamepad-white.png");
        $("#cv").hide();
    }
    $("#" + divToOpen).show();
});

function displayPhrase(n) {
    if (n === 0)
        document.getElementById("demo").innerHTML = 'professional-info';
    else if (n === 1)
        document.getElementById("demo").innerHTML = 'personal-info';
    else
        document.getElementById("demo").innerHTML = 'hobbies';
}
function openContent(evt, contentName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent1");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks1");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(contentName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen1").click();