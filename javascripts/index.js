$(document).ready(function () {
	$(window).scroll(function (evt) {
		var opacity = 1- $(window).scrollTop()/($('#overlay-white').height());
		hundredEverything();
		if (opacity >= 0) {
			$('#overlay-white').css('opacity', opacity);
			$('#name').css('opacity', 1-opacity);
			$('#b-t').css('width', (100-opacity * 100)+'%');
			$('#b-b').css('width', (100-opacity * 100)+'%');
			$('#b-r').css('height', (100-opacity * 100)+'%');
			$('#b-l').css('height', (100-opacity * 100)+'%');
			$('#name-center').css('top', '50%');
		} else if ($(window).scrollTop() > $('#overlay-white').height()*1.5){
			var goUp = ($(window).scrollTop() - ($('#overlay-white').height()*1.5))/2;
			$('#name-center').css('top', ($(window).height()/2) - goUp);
		} 
	});
});

function hundredEverything () {
	$('#b-t').css('width', '100%');
	$('#b-b').css('width', '100%');
	$('#b-l').css('height', '100%');
	$('#b-r').css('height', '100%');
	$('#overlay-white').css('opacity', 0);
	$('#name').css('opacity', 1);
	$('#name-center').css('top', '50%');
}
