var second_card_clicked = false;
var first_card_front_src = null;
var first_card_clicked_id = null;
function click_card(card_back_id) {
	test = card_back_id;

	card_back_id = $(card_back_id);
	console.log('Click occured.', card_back_id);
	
	card_back_id.toggle();

	card_front_id = card_back_id.parent().find('.card_front');
	var card_front_src = card_front_id.attr('src');
	console.log('Src: ', first_card_front_src);
	first_card_clicked_id = card_front_id;
	first_card_front_src = card_front_id.attr('src');

	if (!second_card_clicked) {
		second_card_clicked = true;
		console.log("First card clicked: ", second_card_clicked);
		second_card_front_src = card_front_id.attr('src');
		console.log('Second card src: ', second_card_front_src);
	} else {
		if (first_card_front_src == second_card_front_src) {
			console.log('You have a match');
		} else {
			console.log("Sorry, not a match.");
		}
	}

	/*if () {
			console.log('You have a match!');
		} else {
			console.log('Sorry, not a match');
		}*/
	
}