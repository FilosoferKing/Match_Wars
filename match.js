var second_card_clicked = false;
var first_card_front_src = null;
var first_card_back_id = null;
var first_card_front_id = null;
var laser = false;
function click_card(card_back_id) {
	test = card_back_id;

	card_back_id = $(card_back_id);
	console.log('Click occured.', card_back_id);
	
	card_back_id.toggle();
	
	first_card_back_id = card_back_id;

	/*var  = card_back_id.parent().find('.card_front');*/

	
	card_front_id = card_back_id.parent().find('.card_front');
	var card_front_src = card_front_id.attr('src');


	first_card_front_src = card_front_id.attr('src');
	console.log('Src: ', first_card_front_src);
	

	if (!second_card_clicked) {
		first_card_front_id = card_front_id;
		second_card_clicked = true;
		console.log("First card clicked: ", second_card_clicked);
		second_card_front_src = card_front_id.attr('src');
		second_card_back_id = card_back_id;

		

		
	} else {
		if (first_card_front_src == second_card_front_src) {
			console.log('You have a match');
			card_front_id.fadeOut(1000);
			first_card_front_id.fadeOut(1000);
			$('.fighter').animate({left: "+=72px"});
			console.log('First clicked id: ',first_card_back_id)
			second_card_clicked = false;
			$('#red_laser').animate({left: "+=790px"}, 500, function() {
				var pos1 = $('.fighter').position();
				console.log(pos1);
				$(this).css(pos1).css({"left": "50px", "top": "45px"});
			});
		} else {
			console.log("Sorry, not a match.");
			second_card_clicked = false;
			alert('Sorry, not a match.');
			first_card_back_id.toggle();
			console.log('First back: ', first_card_back_id)
			second_card_back_id.toggle();
			console.log('Second back: ', second_card_back_id);
			var pos1 = $('.fighter').position();
			$('#green_laser').animate({width: "+=790px"}, 500, function() {
				var pos2 = $('#death_star').position();
				console.log(pos2);
				$(this).css("width", "60px");
			});
		}
	}
	
}