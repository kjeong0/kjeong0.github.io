$(document).ready(function () {
	var overlay = $('#overlay-white');
	TweenLite.set(overlay, {opacity: 0.8});
	TweenLite.to(overlay, 1, {opacity: 0, ease: Quad.easeInOut});
	
	var bt = $('#b-t'),
		bb = $('#b-b'),
		bl = $('#b-l'),
		br = $('#b-r'),
		animtime = 1.5,
		name = $('#name');
	setTimeout(function () {
		TweenLite.to(bt, animtime, {
			ease: Cubic.easeInOut,
			width: '100%'
		});
		TweenLite.to(bl, animtime, {
			ease: Cubic.easeInOut,
			height: '100%'
		});
		TweenLite.to(bb, animtime, {
			ease: Cubic.easeInOut,
			width: '100%'
		});
		TweenLite.to(br, animtime, {
			ease: Cubic.easeInOut,
			height: '100%'
		});
		setTimeout(function () {
			TweenLite.to(name, 1, {
				opacity: 1
			});
		}, 1000);
	}, 500);
	$('.autodesk').hover(function () {
		hover('autodesk', 'initial');
	});
	$('.ims').hover(function () {
		hover('ims', 'initial');
	});
	$('.rbc').hover(function () {
		hover('rbc', 'initial');
	});
	$('.fleetbit').hover(function () {
		hover('fleetbit', 'initial');
	});
	var hover = function (id, type) {
		zeroAll();
		TweenLite.to($('.'+id),0.3,{'opacity': 1});
		TweenLite.to($('#'+id+'info'),0.1,{'opacity': 1});
		$('#'+id+'info').css('display', type);
	}
	var zeroAll = function () {
		TweenLite.to($('.autodesk'),0.3,{'opacity': 0.4});
		TweenLite.to($('.ims'),0.3,{'opacity': 0.4});
		TweenLite.to($('.rbc'),0.3,{'opacity': 0.4});
		TweenLite.to($('.fleetbit'),0.3,{'opacity': 0.4});
		TweenLite.to($('#autodeskinfo'),0.1,{'opacity': 0});
		TweenLite.to($('#imsinfo'),0.1,{'opacity': 0});
		TweenLite.to($('#rbcinfo'),0.1,{'opacity': 0});
		TweenLite.to($('#fleetbitinfo'),0.1,{'opacity': 0});
	}
});
