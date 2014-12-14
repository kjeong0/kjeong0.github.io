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
		hover('uw', 'initial');
	});
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
		$('.uw').css('opacity', 0.4);
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
	var grid = new Array(100);
	for (var i = 0;i<100;i++){
		grid[i] = false;
	}
	var game = new Phaser.Game(749, 598, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update });
	function preload () {
	    game.load.image('spot', 'assets/spot.png');
		game.load.image('bg', 'assets/bg.png');
	}

	function create () {
		game.add.sprite(0,-1,'bg');
		grid.forEach(function(el, index) {
			var centeringx = 100;
			var centeringy = 50;
			var x = (index%10)*52;
			var y = Math.floor(index/10)*48;
			var xoffset = (Math.floor(index/10)%2)*26;
			game.add.sprite(x+xoffset+centeringx, y+centeringy, 'spot');
		});
	}

	function update () {
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
