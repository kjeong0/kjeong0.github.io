$(document).ready(function () {

});

$(window).load(function () {
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
				return;
			}
		}
		$('#parallax_cover').css('opacity', 0);
	})
});