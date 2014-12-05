$(document).ready(function () {
	$(window).scroll(function (evt) {
		var opacity = 1- $(window).scrollTop()/($('#overlay').height()*3);
		if (opacity >= 0) {
			$('#overlay').css('opacity', opacity);
			$('#name-holder').css('opacity', 1-opacity);
			$('#name-center').css('top', '50%');
		} else if ($(window).scrollTop() > $('#overlay').height()*5){
			var goUp = $(window).scrollTop() - ($('#overlay').height()*5);
			console.log($(window).height() - goUp);
			$('#name-center').css('top', ($(window).height()/2) - goUp);
		}
	});
});