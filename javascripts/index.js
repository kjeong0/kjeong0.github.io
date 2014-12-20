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
		$('.'+id).css('opacity', 1);
		$('#'+id+'info').css('display', type);
	}
	var zeroAll = function () {
		$('.autodesk').css('opacity', 0.4);
		$('.ims').css('opacity', 0.4);
		$('.rbc').css('opacity', 0.4);
		$('.fleetbit').css('opacity', 0.4);
		$('#uwinfo').css('display', 'none');
		$('#autodeskinfo').css('display', 'none');
		$('#imsinfo').css('display', 'none');
		$('#rbcinfo').css('display', 'none');
		$('#fleetbitinfo').css('display', 'none');
	}
});