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
var current_time;
var time_differnce;
var card_check = true;
var card_array = ["yodacard.png", "chewcard.png", "hancard.png", "c3pocard.png", "maulcard.png", "vadercard.png", "leiacard.png", "r2d2card.png", "lukecard.png"];

function reset() {
var source_array = card_array.slice();
source_array = source_array.concat(source_array);

console.log('Game board reset: ', card_check);

if (!card_check) {

	while (source_array.length ) {
	var random_card_index = Math.floor(Math.random() * source_array.length);
	var card_image = source_array[random_card_index];
	var front_image = $('<img>').addClass("card_front").attr('src','img/'+card_image);
	var back_image = $('<img>').addClass("card_back").attr('onclick', 'click_card(this)').attr('src','img/dscard.png');
	card_container = $('<div>').addClass('card_container');
	card_container.append(front_image, back_image);
	$('.cards').append(card_container);
	source_array.splice(random_card_index, 1);
} 

} else {
	$('.card_container').remove(); //remove div conatainers from DOM
	while (source_array.length ) {
	var random_card_index = Math.floor(Math.random() * source_array.length);
	var card_image = source_array[random_card_index];
	var front_image = $('<img>').addClass("card_front").attr('src','img/'+card_image);
	var back_image = $('<img>').addClass("card_back").attr('onclick', 'click_card(this)').attr('src','img/dscard.png');
	card_container = $('<div>').addClass('card_container');
	card_container.append(front_image, back_image);
	$('.cards').append(card_container);
	source_array.splice(random_card_index, 1);
} 

}

} //End function reset()

function click_card(card_back_id) {
	test = card_back_id;

	card_back_id = $(card_back_id);
	console.log('Click occured.', card_back_id);
	
	first_card_back_id = card_back_id;

	
	card_front_id = card_back_id.parent().find('.card_front');
	var card_front_src = card_front_id.attr('src');


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
    /*var start_timer = setInterval(function(){
	console.log("Timer Check");
	current_time = new Date();
	time_difference = Math.floor((current_time - static_time)/1000);
	console.log(time_difference);
	}, 1000);*/
	

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







	