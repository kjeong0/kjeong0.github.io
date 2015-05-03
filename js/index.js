$(document).ready(function () {

});

$(window).load(function () {
	var height = $(window).height();
	var scrollTop = $(window).scrollTop();
	var calc = scrollTop/height;

	if (height < scrollTop) {
		$('.header').css('opacity', 1);
	} else if (calc < 1){
		if (calc >= 0.6){
			calc -= 0.6;
			calc /= 0.4;
			$('#parallax_cover').css('opacity', calc);
			$('.header').css('opacity', calc);
		}
	}

	setTimeout(function () {
		$('#loading').css('opacity', 0);
	}, 200);
	setTimeout(function () {
		$('#loading').css('display', 'none');
	}, 1200);

	$( window ).scroll (function () {
		var height = $(window).height();
		var scrollTop = $(window).scrollTop();
		var calc = scrollTop/height;
		if (calc < 1){
			if (calc >= 0.6){
				calc -= 0.6;
				calc /= 0.4;
				$('#parallax_cover').css('opacity', calc);
				$('.header').css('opacity', calc);
				return;
			}
		}
		if (scrollTop < height){
			$('.header').css('opacity', 0);
		}
		$('#parallax_cover').css('opacity', 0);
	});

	$( '.work' ).click (function () {
		if (jQuery.data(this, "open") != "true") {
			TweenLite.set($(this), {height: 'auto'});
			TweenLite.from($(this), 1, {height: '28', ease: Quart.easeInOut});
			jQuery.data(this, "open", "true");
		} else {
			TweenLite.to($(this), 1, {height: '28', ease: Quart.easeInOut});
			jQuery.data(this, "open", "false");
		}
	});
});