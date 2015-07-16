var second_card_clicked = false;

function click_card(card_back_id, card_front_id) {
	console.log('Click occured.');
	$(card_back_id).toggle();

}