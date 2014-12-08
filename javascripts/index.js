$(document).ready(function () {
	var clicked = false;

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
		hover('uw', 'initial');
	}, function () {
		hover('uw', 'none');
	}).click(function () {
		click('uw');
	});
	$('.autodesk').hover(function () {
		hover('autodesk', 'initial');
	}, function () {
		hover('autodesk', 'none');
	}).click(function () {
		click('autodesk');
	});
	$('.ims').hover(function () {
		hover('ims', 'initial');
	}, function () {
		hover('ims', 'none');
	}).click(function () {
		click('ims');
	});
	$('.rbc').hover(function () {
		hover('rbc', 'initial');
	}, function () {
		hover('rbc', 'none');
	}).click(function () {
		click('rbc');
	});
	$('.fleetbit').hover(function () {
		hover('fleetbit', 'initial');
	}, function () {
		hover('fleetbit', 'none');
	}).click(function () {
		click('fleetbit');
	});
	var hover = function (id, type) {
		if(!clicked){
			$('#'+id+'info').css('display', type);
		}
	}
	var zeroAll = function () {
		$('#uwinfo').css('display', 'none');
		$('#autodeskinfo').css('display', 'none');
		$('#imsinfo').css('display', 'none');
		$('#rbcinfo').css('display', 'none');
		$('#fleetbitinfo').css('display', 'none');
	}
	var click = function (id) {
		if (!clicked) {
			$('#'+id+'info').css('display', 'initial');
			clicked = true;
		} else if ($('#'+id+'info').css('display') == 'block' && clicked){
			zeroAll();
			clicked = false;
		} else if ($('#'+id+'info').css('display') == 'none' && clicked){
			zeroAll();
			$('#'+id+'info').css('display', 'initial');
			clicked = true;
		}
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
