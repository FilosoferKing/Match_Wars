var second_card_clicked = false;
var first_card_front_src = null;
var first_card_back_id = null;
var first_card_front_id = null;
var death_star_x = null;
var time_per_10px = 5;
var num = null;
var score = 0;
var score_post;
var tries = 0;
var static_time = new Date();
var current_time = null;
var time_difference = null;
var start_timer = null;
var accuracy = null;
var random_fx = null;
var isClicked;
var card_array = ["yodacard.png", "chewcard.png", "hancard.png", "c3pocard.png", "maulcard.png", "vadercard.png", "leiacard.png", "r2d2card.png", "lukecard.png"];
//var saber_fx = ["saber1.wav", "saber2.wav", "saber3.wav", "saber4.wav", "saber5.wav", "saber6.wav", "saber7.wav", "saber8.wav", "saber9.wav", "saber10.wav", "saber11.wav", "saber12.wav", "saber13.wav", "saber14.wav", "saber15.wav", "saber16.wav", "saber17.wav", "saber18.wav"];


function reset() {
    var source_array = card_array.slice();
    source_array = source_array.concat(source_array);

    $('.cards img').remove();
    $('#reset_img').removeClass('reset_flash');
    $('span').show();

    $('.game').css({
        "-webkit-perspective": "none",
        "-moz-perspective": "none",
        "-ms-perspective": "none",
        "-o-perspective": "none",
        "perspective": "none"});

    //End Credits reset
    $('.game #title').removeClass('titles');
    $('.game #text').removeClass('titlecontent');
    $('.game #p').css({"display": "none"});

    $('.card_container').remove(); //remove div conatainers and cards from DOM
    while (source_array.length) { //Load DOM with div containers and cards
        var random_card_index = Math.floor(Math.random() * source_array.length);
        var card_image = source_array[random_card_index];
        var front_image = $('<img>').addClass("card_front").attr('src', 'img/' + card_image);
        var back_image = $('<img>').addClass("card_back").attr('onclick', 'click_card(this)').attr('src', 'img/dscard.png');
        card_container = $('<div>').addClass('card_container');
        card_container.append(front_image, back_image);
        $('.cards').append(card_container);
        source_array.splice(random_card_index, 1);
    }
    //Score Reset
    score = 0;
    $('#score').html("").append(score);
    //Timer Reset
    clearInterval(start_timer);
    start_timer = 0;
    console.log('Timer reset: ', start_timer)
    static_time = new Date();
    $('#timer_text').html("Time");
    $('#timer').html("0");
    //Accruacy Reset
    $('#accuracy').html("0");

    $('#death_star').stop().append().attr('src', 'img/deathstar1.png').css({
        "width": "120px",
        "height": "120px"
    }).show();
    $('#xwing_final').stop().hide().css({"right": "35px", "top": "15px", "width": "50px", "height": "50px"});
    $('.fighter').stop().css({"top": "0", "left": "280px"}).show();

    console.log('Game board reset');

    $('#start_music').trigger('pause');
    $('#start_music').prop('currentTime', 0);

    $('#end_music').trigger('pause');
    $('#end_music').prop('currentTime', 0);

    $('#xwing_music').trigger('pause');
    $('#xwing_music').prop('currentTime', 0);

    $('#vader_vocal').trigger('pause');
    $('#vader_vocal').prop('currentTime', 0);

    $('#mood').css("-webkit-animation", "flash .5s linear infinite");
    $('#mood').css("-moz-animation", "flash .5s linear infinite");
    $('#mood').css("-ms-animation", "flash .5s linear infinite");
    $('#mood').css("-o-animation", "flash .5s linear infinite");
    $('#mood').css("animation", "flash .5s linear infinite");


} //End function reset()

function click_card(card_back_id) {
    test = card_back_id;

    card_back_id = $(card_back_id);
    console.log('Click occured.', card_back_id);

    first_card_back_id = card_back_id;

    card_front_id = card_back_id.parent().find('.card_front');
    var card_front_src = card_front_id.attr('src');

    /*Darth & Yoda Sound Fx
     if (card_front_src == "img/vadercard.png") {
     console.log('THIS IS VADER!');
     $('body').append('<embed id="embed_player" src="img/darthgive.wav" autostart="true" hidden="true"></embed>');
     }
     if (card_front_src == "img/yodacard.png") {
     console.log('THIS IS YODA!');
     $('body').append('<embed id="embed_player" src="img/force.wav" autostart="true" hidden="true"></embed>');
     }*/


    /*Light Saber Sound Fx
     if (card_back_id) {
     random_fx = Math.floor(Math.random() * saber_fx.length);
     var fx = saber_fx[random_fx]
     console.log('RANDOM EFFETCS ', fx)
     $('body').append('<embed id="embed_player" src="img/'+ fx +'" autostart="true" hidden="true"></embed>');
     }*/

    //Light Saber Sound Fx
    var id = ['#1', '#2', '#3', '#4', '#5', '#6', '#7', '#8', '#9', '#10', '#11', '#12', '#13', '#14', '#15', '#16', '#17', '#18'];


        var fx = Math.floor(Math.random() * id.length);
        var random_id;
        random_id = id[fx];
        $(random_id)[0].play();
        console.log("Random number: ", $(random_id));



    first_card_front_src = card_front_id.attr('src');
    console.log('Src: ', first_card_front_src);

    //Initial Card Flip
    card_back_id.css({
        "transform": "rotateX(90deg)",
        "transform-style": "preserve-3d",
        "transition": "transform .10s linear"
    });
    card_front_id.css({
        "transform": "rotateX(360deg)",
        "transform-style": "preserve-3d",
        "transition": "transform .20s linear"
    });

    //Interval Timer on Card Click
    if (start_timer == 0) {
        start_timer = setInterval(function () {
            console.log("Timer Check");
            current_time = new Date();
            time_difference = Math.floor((current_time - static_time) / 1000);
            $('#timer').html("").append(time_difference);
            console.log(time_difference);
        }, 1000);
    }

    if (!second_card_clicked) {
        first_card_front_id = card_front_id;
        second_card_clicked = true;
        console.log("First card clicked: ", second_card_clicked);
        second_card_front_src = card_front_id.attr('src');
        second_card_back_id = card_back_id;
        console.log('Tries: ', tries = tries + 1)
    } else {
        if (first_card_front_src == second_card_front_src) {
            console.log('You have a match');
            card_front_id.animate({width: "0%"}, 500).fadeOut(500);
            first_card_front_id.animate({width: "0%"}, 500).fadeOut(500);
            $('.fighter').animate({left: "+=72px"}, 1000);
            console.log('First clicked id: ', first_card_back_id)
            second_card_clicked = false;
            var red_laser_x = $('#red_laser').offset().left;
            var position_delta = death_star_x - red_laser_x - 72;
            console.log('Position Delta: ', position_delta);
            var travel_time = (position_delta / 4) * time_per_10px;
            $('#red_laser').animate({left: "+=" + position_delta + "px"}, travel_time, function () {

                var pos1 = $('.fighter').position();
                console.log(pos1);
                $(this).css(pos1).css({"left": "50px", "top": "45px"});
            });
            score_post = (score = score += 1);
            console.log('Score: ', score_post);
            $('#score').html("").append(score_post);

            accuracy = Math.floor((score_post / tries) * 100);
            $('#accuracy').html("").append(accuracy, "%");
            console.log('Accuracy: ', (Math.floor((score_post / tries) * 100)));

            /*Darth & Yoda Sound Fx*/
            if (card_front_src == "img/vadercard.png") {
                console.log('THIS IS VADER!');
                vader_vocal()
            }
            /*if (card_front_src == "img/yodacard.png") {
             console.log('THIS IS YODA!');
             $('body').append('<embed id="embed_player" src="img/force.wav" autostart="true" hidden="true"></embed>');
             }*/

            if (score_post == score_post/*card_array.length*/) { //Game won actions
                clearInterval(start_timer);
                console.log('You won the game!');


                $('#death_star').append().attr('src', 'img/explode.png').animate({width: "+=20px", height: "+=20px"});
                $('#xwing_final').show().animate({
                    right: "+=1200px",
                    top: "+=1080px",
                    width: "+=1400px",
                    height: "+=1400px"
                }, 8000, function(){
                        $(this).hide();
                    }
                );
                $('.fighter').hide();

                $('.card_container').remove(); //remove div conatainers and cards from DOM

                $('.game #title').addClass('titles');
                $('.game #text').addClass('titlecontent');
                $('.game #p').css({"display": "block"});

                //Loop to remove distant end_credits
                var i = 1;

                function credit_loop(){
                    setTimeout(function(){
                        $('span:nth-child(' + i + ')').fadeTo(2000, 0);
                        console.log("Time OUT!");
                        i++;
                        if (i <= 8) {
                            credit_loop();
                        }
                    }, 8000);
                }

                setTimeout(function(){
                    credit_loop();
                    console.log("Loop started!");
                }, 16000);

                setTimeout(function() {
                    $('#reset_img').addClass('reset_flash');
                    $('span').fadeOut(1000);
                }, 80000);

                $('#start_music').trigger('pause');
                $('#start_music').prop('currentTime', 0);
                end_music();
                xwing_music();

                $('#mood').css("-webkit-animation", "none");
                $('#mood').css("-moz-animation", "none");
                $('#mood').css("-ms-animation", "none");
                $('#mood').css("-o-animation", "none");
                $('#mood').css("animation", "none");
            }
        } else {
            console.log("Sorry, not a match.");
            second_card_clicked = false;


            console.log('First back: ', first_card_back_id)

            console.log('Second back: ', second_card_back_id);
            var pos1 = $('.fighter').position();
            $('#green_laser_1').animate({width: "+=50px"}, 100, function () {

                $('#green_laser_2').animate({width: "+=36px"}, 100, function () {

                    $('#green_laser_3').animate({width: "+=54px"}, 100, function () {

                        $('#green_laser').animate({width: "+=790px"}, 400, function () {
                            var pos2 = $('#death_star').position();
                            console.log(pos2);
                            $('#green_laser, #green_laser_1, #green_laser_2, #green_laser_3').css("width", "0");
                        });
                    });
                });
            });

            setTimeout(function () {
                //Card Flip Back Over
                second_card_back_id.css({
                    "transform": "rotateX(0)",
                    "transform-style": "preserve-3d",
                    "transition": "transform .10s linear"
                });
                card_front_id.css({
                    "transform": "rotateX(180deg)",
                    "transform-style": "preserve-3d",
                    "transition": "transform .20s linear"
                });
                first_card_back_id.css({
                    "transform": "rotateX(0)",
                    "transform-style": "preserve-3d",
                    "transition": "transform .10s linear"
                });
                card_front_id.css({
                    "transform": "rotateX(180deg)",
                    "transform-style": "preserve-3d",
                    "transition": "transform .20s linear"
                });
            }, 300);
        }
    }


}

$(document).ready(function () {
    death_star_x = $('#death_star').offset().left;
    console.log($('#death_star').position());
    console.log($('#death_star').offset());
});

function duel_music() {
    console.log('DUEL MUSIC!');
    $('#start_music').trigger('play');
    $('#mood').css("-webkit-animation", "none");
    $('#mood').css("-moz-animation", "none");
    $('#mood').css("-ms-animation", "none");
    $('#mood').css("-o-animation", "none");
    $('#mood').css("animation", "none");
}

function end_music() {
    console.log('END MUSIC!');
    $('#end_music').trigger('play');
}

function xwing_music() {
    console.log('XWING MUSIC!');
    setTimeout(function() {
        $('#xwing_music').trigger('play');
    }, 1000);
}

function vader_vocal() {
    console.log('DARTH VOICE!');
        $('#vader_vocal').trigger('play');
        $('body').append('<img id="darth_jet" src="img/vaderfighter.png" alt=""Darth Fighter">');
        $('#darth_jet').animate({top: "+=2500px", left: "+=2500px"}, 4000, function() {
            $(this).hide();
        });

}








	