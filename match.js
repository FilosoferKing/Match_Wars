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
var card_array = ["yodacard.png", "chewcard.png", "hancard.png", "c3pocard.png", "maulcard.png", "vadercard.png", "leiacard.png", "r2d2card.png", "lukecard.png"];
var saber_fx = ["saber1.wav", "saber2.wav", "saber3.wav", "saber4.wav", "saber5.wav", "saber6.wav", "saber7.wav", "saber8.wav", "saber9.wav", "saber10.wav", "saber11.wav", "saber12.wav", "saber13.wav", "saber14.wav", "saber15.wav", "saber16.wav", "saber17.wav", "saber18.wav"];
var random_fx = null;

function reset() {
	var source_array = card_array.slice();
	source_array = source_array.concat(source_array);

	$('.card_container').remove(); //remove div conatainers and cards from DOM
	while (source_array.length ) { //Load DOM with div containers and cards
	var random_card_index = Math.floor(Math.random() * source_array.length);
	var card_image = source_array[random_card_index];
	var front_image = $('<img>').addClass("card_front").attr('src','img/'+card_image);
	var back_image = $('<img>').addClass("card_back").attr('onclick', 'click_card(this)').attr('src','img/dscard.png');
	card_container = $('<div>').addClass('card_container');
	card_container.append(front_image, back_image);
	$('.cards').append(card_container);
	source_array.splice(random_card_index, 1);
}
	//Display Score
	score = 0;
	$('#score').html("Score: ").append(score);


	clearInterval(start_timer);
	start_timer = 0;
	console.log('Timer reset: ', start_timer)
	static_time = new Date();
	$('#timer').html("Time Played: 0");

	$('#death_star').stop().append().attr('src','img/deathstar1.png').css({"width": "120px", "height": "120px"}).show();
	$('#xwing_final').stop().hide().css({"right": "35px", "top": "15px", "width": "50px", "height": "50px"});
	$('.fighter').stop().css({"top": "0", "left": "280px"}).show();
	

	console.log('Game board reset');

} //End function reset()

function click_card(card_back_id) {
	test = card_back_id;

	card_back_id = $(card_back_id);
	console.log('Click occured.', card_back_id);
	
	first_card_back_id = card_back_id;

	card_front_id = card_back_id.parent().find('.card_front');
	var card_front_src = card_front_id.attr('src');

	if (card_front_src == "img/vadercard.png") {
		console.log('THIS IS VADER!');
		$('body').append('<embed id="embed_player" src="img/darthgive.wav" autostart="true" hidden="true"></embed>');
	}

	//Light Saber sound fx
	if (card_back_id) {
	random_fx = Math.floor(Math.random() * saber_fx.length);
	var fx = saber_fx[random_fx]
	console.log('RANDOM EFFETCS ', fx)
	$('body').append('<embed id="embed_player" src="img/'+ fx +'" autostart="true" hidden="true"></embed>');
	}


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
    start_timer = setInterval(function(){
	console.log("Timer Check");
	current_time = new Date();
	time_difference = Math.floor((current_time - static_time)/1000);
	$('#timer').html("Time Played: ").append(time_difference);
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
			console.log('First clicked id: ',first_card_back_id)
			second_card_clicked = false;
			var red_laser_x = $('#red_laser').offset().left;
			var position_delta = death_star_x - red_laser_x - 72;
			console.log('Position Delta: ', position_delta);
			var travel_time = (position_delta/10) * time_per_10px;
			$('#red_laser').animate({left: "+=" + position_delta + "px"}, travel_time , function() {
				
				var pos1 = $('.fighter').position();
				console.log(pos1);
				$(this).css(pos1).css({"left": "50px", "top": "45px"});
			});
				score_post = (score = score += 1);
				console.log('Score: ', score_post);
				$('#score').html("Score: ").append(score_post);

				if (score_post == score_post/*card_array.length*/) { //Game won actions
					clearInterval(start_timer);
					console.log('You won the game!');

					accuracy = Math.floor((score_post/tries) * 100);
					$('#accuracy').html("Accuracy: ").append(accuracy, "%")
					console.log('Accuracy: ', (Math.floor((score_post/tries) * 100)));

					$('#death_star').append().attr('src','img/explode.png').animate({width: "+=20px", height: "+=20px"});
					$('#xwing_final').show().animate({right: "+=1200px", top: "+=1080px", width: "+=1400px", height: "+=1400px"}, 8000);
					$('.fighter').hide();
				}
		} else {
			console.log("Sorry, not a match.");
			second_card_clicked = false;
			alert('Sorry, not a match.');
			
			console.log('First back: ', first_card_back_id)
			
			console.log('Second back: ', second_card_back_id);
			var pos1 = $('.fighter').position();
			$('#green_laser_1').animate({width: "+=50px"}, 100, function() {
				
				$('#green_laser_2').animate({width: "+=36px"}, 100, function() {
					
					$('#green_laser_3').animate({width: "+=54px"}, 100, function() {
					
						$('#green_laser').animate({width: "+=790px"}, 400, function() {
				var pos2 = $('#death_star').position();
				console.log(pos2);
				$('#green_laser, #green_laser_1, #green_laser_2, #green_laser_3').css("width", "0");
			});
			});
			});
			});
			
		
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
		}
	}


	
}

$(document).ready(function() {
	death_star_x = $('#death_star').offset().left;
	console.log($('#death_star').position());
	console.log($('#death_star').offset());
});







	