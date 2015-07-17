var second_card_clicked = false;
var first_card_front_src = null;
var first_card_back_id = null;
var first_card_front_id = null;
var death_star_x = null;
var time_per_10px = 5;
var num = null;
var score = 0;
var tries = 0;
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
			$('.fighter').animate({left: "+=72px"});
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
				console.log(score = score += 1);
			});
		} else {
			console.log("Sorry, not a match.");
			second_card_clicked = false;
			alert('Sorry, not a match.');
			//first_card_back_id.toggle();
			console.log('First back: ', first_card_back_id)
			//second_card_back_id.toggle();
			console.log('Second back: ', second_card_back_id);
			var pos1 = $('.fighter').position();
			$('#green_laser_1').animate({width: "+=50px"}, 550, function() {
				$(this).delay(3000).css("width", "0");
			});
			$('#green_laser_2').animate({width: "+=36px"}, 600, function() {
				$(this).delay(3000).css("width", "0");
			});
			$('#green_laser_3').animate({width: "+=54px"}, 650, function() {
				$(this).delay(3000).css("width", "0");
			});
			$('#green_laser').delay(500).animate({width: "+=790px"}, 500, function() {
				var pos2 = $('#death_star').position();
				console.log(pos2);
				$(this).css("width", "0");
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