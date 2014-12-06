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
	$('.uw').hover(function () {
		hover('uw', 1);
	}, function () {
		hover('uw', 0);
	});
	$('.autodesk').hover(function () {
		hover('autodesk', 1);
	}, function () {
		hover('autodesk', 0);
	});
	$('.ims').hover(function () {
		hover('ims', 1);
	}, function () {
		hover('ims', 0);
	});
	$('.rbc').hover(function () {
		hover('rbc', 1);
	}, function () {
		hover('rbc', 0);
	});
	$('.fleetbit').hover(function () {
		hover('fleetbit', 1);
	}, function () {
		hover('fleetbit', 0);
	});
	var hover = function (id, opacity) {
		$('#'+id+'info').css('opacity', opacity);
	}
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
