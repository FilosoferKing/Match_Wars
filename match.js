var second_card_clicked = false;
var first_card_click_src = null;
function click_card(card_back_id, card_front_id) {
	console.log('Click occured.');
	console.log('card_front_id is ', card_front_id);
	$(card_back_id).toggle();

	var card_front_src = $(card_front_id).attr('src');
	console.log($('#card_front_1'));
	console.log('Src: ', card_front_src);

	if(second_card_clicked) {
		second_card_clicked = true;
		console.log("Second click status: ", second_card_clicked);
	} 
}