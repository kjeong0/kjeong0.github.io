$(document).ready(function () {

});
$(window).load(function () {
	var height = $(window).height();
	var scrollTop = $(window).scrollTop();
	var calc = scrollTop/height;

	createCloud();
	cloudRecursion();

	if (height < scrollTop) {
		$('.header').css('opacity', 1);
		$('#profile_cover').css('opacity', 1-calc);
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
				$('#profile_cover').css('opacity', 1-calc);
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

function cloudRecursion () {
	var recursionSpeed = Math.floor(($(document).width()/$(window).width())*900);
	setTimeout(function() {
		if($(window).scrollTop() <= $(window).height()){
			createCloud();
		}
		cloudRecursion();
	}, recursionSpeed);
}

function createCloud () {
	//TO DO: make this work for jQuery
	var cloud = document.createElement('div');
	cloud.className = 'cloud';

	var cloudJquery = $(cloud);
	var height = Math.floor(Math.random()*100) + 100;
	var width = height*2;
	cloudJquery.css('width', width);
	cloudJquery.css('height', height);

	var topPosition = Math.floor(Math.random()*($(window).height()-height));
	cloudJquery.css('top', topPosition);

	$('#clouds').append(cloud);

	var speed = Math.floor(Math.random()*10) + 10;
	if(height%2 == 0){
		TweenLite.set(cloudJquery, {right: -width})
		TweenLite.from(cloudJquery, speed, {right: width+$(window).width()})
	} else {
		TweenLite.set(cloudJquery, {left: -width})
		TweenLite.from(cloudJquery, speed, {left: width+$(window).width()})
	}
	var cloud_id = 1
	if(speed%2 == 0){
		cloud_id = 2;
	}
	cloudJquery.css('background-image', 'url(\'assets/cloud_temp_'+cloud_id+'.png\')');


	setTimeout(function() {
		removeCloud(cloud);
	}, speed*1000);
}

function removeCloud (cloud) {
	cloud.remove();
}