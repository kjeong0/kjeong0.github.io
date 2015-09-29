$(document).ready(function () {

});
$(window).load(function () {
	var height = $(window).height();
	var scrollTop = $(window).scrollTop();
	var calc = scrollTop/height;

	createCloud();
	cloudRecursion();
	populateSkillHovers();

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

	gameLogic()
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

function populateSkillHovers () {
	var skillMappings = {
		'cpp' : ['work_ims', 'work_rbc', 'work_fleetbit'],
		'lua' : ['work_autodesk', 'work_ims', 'work_rbc', 'work_fleetbit'],
		'js'  : ['work_de'],
		'css' : ['work_de'],
		'html': ['work_de'],
		'java': ['work_autodesk', 'work_de']
	};

	for (var skill in skillMappings) {
		$('#'+skill).hover(function(){
			for(var work in skillMappings[this.id]){
				$('#'+skillMappings[this.id][work]).css({opacity: 0.4});
			}
		},function(){
			for(var work in skillMappings[this.id]){
				$('#'+skillMappings[this.id][work]).css({opacity: 1});
			}
		});
	}
}

//--------------------------- MAZE GAME ------------------------------

/*var display_instruction_set = function(instruction_set){
	for (var i = 0; i < instruction_set.length; i++){
		var instructionDiv = document.createElement('div')
		var instruction = instruction_set[i]
		if (instruction.negate) {
			instructionDiv.innerHTML = "not "
		}
		instructionDiv.innerHTML += instruction.condition.id + " | " + instruction.behaviour.id
		$('#instruction_set').append(instructionDiv)
	}
}

var render_game = function(game_state){
	//Garbaggio code plz fix
	$('#game_grid').empty();
	for (var i = 0; i < 9; i++){
		var row = document.createElement('div');
		row.className = 'row';
		for (var k = 0; k < 9; k++){
			var cell = document.createElement('div');
			if (i == game_state.curr_pos.x && k == game_state.curr_pos.y) {
				cell.className = "cell robot";
				var dX = game_state.curr_pos.dir[1]
				var dY = game_state.curr_pos.dir[0]

				var degree = 90 * (dX ? 2 + dX : dX)
				degree += 90 * (dY ? 1 - dY : dY)
				$(cell).css({ 'transform': 'rotate(' + degree + 'deg)'})
			} else {
				cell.className = "cell"
				if (game_state.map[i][k] != 0){
					cell.className += " wall"
				}
			}
			$(row).append(cell)
		}
		$('#game_grid').append(row)
	}
}

var game_loop = function (instruction_set, game_state){
	for (var i = 0; i < instruction_set.length; i ++){
		var instruction = instruction_set[i];
		if (instruction.condition.evaluate(game_state) == !instruction.negate){
			console.log(instruction.condition.id, instruction.behaviour.id)
			instruction.behaviour.apply(game_state);
			break;
		}
	}

	render_game(game_state);

	setTimeout(function(){game_loop(instruction_set, game_state)}, 1000);
}

var define_behaviours = function (){
	// please kill me
	var potential_behaviours = ['go_forward', 'turn_left', 'turn_right', 'turn_around']

	var behaviour_list = [
		{
			id: 'go_forward',
			apply: function(game_state){
				var xp = game_state.curr_pos.x + game_state.curr_pos.dir[0]
				var yp = game_state.curr_pos.y + game_state.curr_pos.dir[1]

				if(xp < 9 && yp < 9 && xp >= 0 && yp >= 0)
				{
					if(game_state.map[xp][yp] == 0){
						game_state.curr_pos.x = xp
						game_state.curr_pos.y = yp
					}
				}
			}
		},
		{
			id: 'turn_left',
			apply: function(game_state){
				var dX = game_state.curr_pos.dir[0]
				var dY = game_state.curr_pos.dir[1]
				dY = -dY
				game_state.curr_pos.dir[0] = dY
				game_state.curr_pos.dir[1] = dX
			}
		},
		{
			id: 'turn_right',
			apply: function(game_state){
				var dX = game_state.curr_pos.dir[0]
				var dY = game_state.curr_pos.dir[1]
				dX = -dX
				game_state.curr_pos.dir[0] = dY
				game_state.curr_pos.dir[1] = dX
			}
		},
		{
			id: 'turn_around', // bright eyes
			apply: function(game_state){
				game_state.curr_pos.dir[0] *= -1
				game_state.curr_pos.dir[1] *= -1
			}
		}
	]

	return behaviour_list
}

var define_conditions = function () {
	var potential_conditions = ['front', 'back', 'left', 'right', 'free']

	var condition_list = [
		{
			id: 'front',
			evaluate: function(game_state) {
				var xp = game_state.curr_pos.x + game_state.curr_pos.dir[0]
				var yp = game_state.curr_pos.y + game_state.curr_pos.dir[1]

				if(xp < 9 && yp < 9 && xp >= 0 && yp >= 0)
				{
					if(game_state.map[xp][yp] == 0){
						return false
					}
				}
				return true
			}
		},
		{
			id: 'back',
			evaluate: function(game_state) {
				var xp = game_state.curr_pos.x - game_state.curr_pos.dir[0]
				var yp = game_state.curr_pos.y - game_state.curr_pos.dir[1]

				if(xp < 9 && yp < 9 && xp >= 0 && yp >= 0)
				{
					if(game_state.map[xp][yp] == 0){
						return false
					}
				}
				return true
			}
		},
		{
			id: 'left',
			evaluate: function(game_state) {
				var xp = game_state.curr_pos.x + game_state.curr_pos.dir[1]
				var yp = game_state.curr_pos.y - game_state.curr_pos.dir[0]

				if(xp < 9 && yp < 9 && xp >= 0 && yp >= 0)
				{
					if(game_state.map[xp][yp] == 0){
						return false
					}
				}
				return true
			}
		},
		{
			id: 'right',
			evaluate: function(game_state) {
				var xp = game_state.curr_pos.x - game_state.curr_pos.dir[1]
				var yp = game_state.curr_pos.y + game_state.curr_pos.dir[0]

				if(xp < 9 && yp < 9 && xp >= 0 && yp >= 0)
				{
					if(game_state.map[xp][yp] == 0){
						return false
					}
				}
				return true
			}
		}
	]

	return condition_list
}

function gameLogic () {
	// beat kevin at AI and text or snapchat me your score and be the new leader!
	var instruction = {
		condition: '', //id, evaluate(game_state)
		behaviour: '' //id, apply(game_state)
	}

	var behaviour_list = define_behaviours();
	var condition_list = define_conditions();

	var instruction_set = [{
		negate: true,
		condition: condition_list[0],
		behaviour: behaviour_list[0]
	},
	{
		negate: false,
		condition: condition_list[0],
		behaviour: behaviour_list[2]
	}]

	//DEVELOP, CREATE AND DESIGN A PUZZLE GAME FOR MY RESUME AND WORK EXPERIENCE
	var game_state = {
		map : new Array(9),
		curr_pos: {x: 0, y: 0, dir: [0,1]}
	};

	for (var i = 0; i < 9; i++){
		game_state.map[i] = new Array (9)
		for (var k = 0; k < 9; k ++){
			game_state.map[i][k] = 0;
		}
	}

	for (var k = 0; k < 25; k++){
		var xSeed = Math.random()
		var ySeed = Math.random()

		var x = Math.floor(xSeed*9)
		var y = Math.floor(ySeed*9)
		game_state.map[x][y] = 1
	}

	display_instruction_set(instruction_set);
	game_loop(instruction_set, game_state);
}*/