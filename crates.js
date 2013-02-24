
map_width = 10;
map_height = 10;

LEFT_ARROW = 37;
RIGHT_ARROW = 39;
UP_ARROW = 38;
DOWN_ARROW = 40;

WALL = 0;
GRASS = 1;
TARGET = 2;
CRATE = 3;
HERO = 4;
HERO_TARGET = 5;
CRATE_TARGET = 6;

LEFT = 0;
RIGHT = 1;
UP = 2;
DOWN = 3;

MODE_DESIGN = 'design';
MODE_GAME = 'game';
MODE = 'test';

mode = MODE_GAME;
is_game_running = false;

timer_interval = null;
timer_value = "";

moves_made = 0;

test_game_matrix = [];

all_levels = [
	[
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
	[1, 4, 1, 1, 1, 0, 0, 1, 1, 1],
	[1, 1, 3, 1, 1, 0, 0, 1, 1, 1],
	[0, 0, 1, 0, 1, 0, 0, 1, 1, 1],
	[2, 0, 1, 0, 1, 1, 0, 1, 1, 1],
	[2, 3, 1, 1, 0, 1, 0, 1, 1, 1],
	[2, 1, 1, 1, 3, 1, 0, 1, 1, 1]
	],

	[
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
	[1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
	[1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
	[0, 0, 0, 1, 1, 1, 1, 0, 1, 1],
	[0, 2, 1, 3, 0, 0, 1, 0, 1, 1],
	[2, 2, 3, 3, 4, 1, 1, 1, 0, 1],
	[2, 2, 1, 3, 1, 3, 1, 0, 1, 1],
	[0, 0, 0, 0, 0, 1, 1, 0, 1, 1]
	],

	[
	[0, 1, 1, 1, 1, 0, 0, 1, 1, 1], 
	[1, 4, 3, 3, 3, 1, 0, 1, 1, 1], 
	[2, 2, 2, 2, 2, 2, 0, 1, 1, 1], 
	[1, 3, 3, 1, 3, 1, 0, 1, 1, 1], 
	[0, 0, 1, 1, 0, 0, 0, 1, 1, 1], 
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],

	[
	[0, 0, 1, 1, 1, 2, 1, 1, 3, 1],
	[1, 1, 1, 0, 0, 3, 0, 0, 4, 1],
	[1, 1, 3, 2, 1, 2, 1, 2, 1, 0],
	[0, 1, 3, 0, 0, 3, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 2, 1, 1, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
 	],

 	[
 	[0,0,1,1,1,1,0,0,0,0],[0,0,1,3,1,1,1,1,0,0],[0,0,1,3,1,0,0,1,0,0],[2,2,2,3,3,1,1,1,0,0],[2,2,2,4,0,3,1,0,0,0],[0,0,0,1,0,1,3,1,0,0],[0,0,0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]
 	],

 	[
 	[2,2,3,2,2,0,1,1,1,1],[2,2,0,6,2,0,1,1,1,1],[1,3,3,1,1,0,1,1,1,1],[1,1,3,3,1,0,1,1,1,1],[1,3,3,4,1,0,1,1,1,1],[1,1,0,1,1,0,1,1,1,1],[0,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1]
 	],
 	
 	[
 	[0,1,1,0,0,2,1,1,1,0],[0,1,1,0,1,2,0,0,1,0],[0,1,1,3,5,2,1,1,1,0],[0,1,1,0,1,2,0,1,0,0],[0,0,3,0,1,1,0,1,1,0],[1,3,1,1,1,1,3,3,1,0],[1,0,1,0,1,1,0,1,1,0],[1,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]
 	],

 	[
 	[0,1,1,1,0,0,1,1,0,0],[0,1,3,1,1,1,1,1,1,1],[0,0,3,0,0,0,1,0,0,1],[0,1,1,0,0,1,1,1,0,1],[0,1,3,2,2,2,2,2,2,1],[0,1,0,0,0,1,2,1,0,1],[1,1,1,1,3,3,0,0,0,3],[1,1,1,0,4,3,1,1,1,1],[0,0,0,0,1,0,1,0,0,0],[0,0,0,0,1,1,1,0,0,0]
 	],

 	[
 	[1,1,1,0,0,1,1,0,0,0],[1,0,1,3,1,3,1,0,0,0],[1,1,6,2,0,1,1,0,0,0],[0,1,0,2,4,2,0,0,0,0],[0,3,0,0,0,6,0,0,0,0],[1,1,1,1,1,1,1,1,0,0],[1,1,1,0,0,1,0,1,0,0],[0,0,0,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]
 	]

];

original_game_matrix = [];

game_matrix = [];

function new_game() {
	is_game_running = true;
	mode = MODE_GAME;

	game_matrix = $.extend(true, [], original_game_matrix);

	draw_map();

	timer_value = 0;
	clearInterval(timer_interval);
	timer_interval = setInterval(update_timer, 1000);

	moves_made = 0;
}

function update_timer() {
	timer_value += 1;

	min = Math.floor(timer_value / 60);
	sec = timer_value % 60;

	if (min < 10) {
		min = "0" + min;
	}

	if (sec < 10) {
		sec = "0" + sec;
	}

	$('#timer_value').text(min + " : " + sec);
}

function update_moves() {
	$('#no_of_moves').text(moves_made);
}

function draw_map() {
	var world_width = map_width + 2;
	var world_height = map_height + 2;

	if (mode == null || mode == '') {
		mode = MODE_GAME;
	}

	// Prepare world

	var html = "<table class='world'>";

	for(i = 0; i < world_height; i++) {
		html += "<tr>";

		for(j = 0; j < world_width; j++) {

			m = i - 1;
			n = j - 1;

			// Check if you are at the edge of the world
			if(i == 0 || i == (world_height - 1) || j == 0 || j == (world_width - 1)) {
				html += "<td class='wall'></td>";
			} else if(game_matrix[m][n] == WALL) {
				html += "<td class='wall'></td>";
			} else if(game_matrix[m][n] == GRASS) {
				html += "<td class='grass'></td>";
			} else if(game_matrix[m][n] == TARGET) {
				html += "<td class='target'></td>";
			} else if(game_matrix[m][n] == CRATE) {
				html += "<td class='crate'></td>";
			} else if(game_matrix[m][n] == HERO) {
				html += "<td class='hero' data-row='" + m + "' data-col='" + n + "'></td>";
			} else if(game_matrix[m][n] == HERO_TARGET) {
				html += "<td class='hero_target hero' data-row='" + m + "' data-col='" + n + "'></td>";
			} else if(game_matrix[m][n] == CRATE_TARGET) {
				html += "<td class='crate_target' data-row='" + m + "' data-col='" + n + "'></td>";
			}
		}

		html += "</tr>";
	}

	html += "</table>";

	if (mode == MODE_GAME) {
		$('#game_area').html(html);	
	} else if (mode == MODE_DESIGN) {
		$('#world_editor').html(html);	
	}
	
}

$(document).keydown(function(event) {
	key = event.which;

	if (mode == MODE_DESIGN) {
		return;
	}

	if (false == is_game_running) {
		return;
	}

	moves_made += 1;
	update_moves();

	if(key == LEFT_ARROW) {

		if(is_hero_on_left_edge()) {
			return;
		}

		heros_left = get_heros_left();

		if(heros_left == GRASS) {
			move_hero_to_grass(get_hero_x(), get_hero_y(), get_hero_x(), get_hero_y() - 1);
		} else if(heros_left == CRATE || heros_left == CRATE_TARGET) {
			heros_left_left = get_heros_left_left();

			if(heros_left_left == GRASS || heros_left_left == TARGET) {
				push_crate(get_hero_x(), get_hero_y() - 1, LEFT);
			}

		} else if(heros_left == TARGET) {
			move_hero_to_target(get_hero_x(), get_hero_y(), get_hero_x(), get_hero_y() - 1);
		}


	}

	if(key == RIGHT_ARROW) {

		if(is_hero_on_right_edge()) {
			return;
		}

		heros_right = get_heros_right();

		if(heros_right == GRASS) {
			move_hero_to_grass(get_hero_x(), get_hero_y(), get_hero_x(), get_hero_y() + 1)
		} else if(heros_right == CRATE || heros_right == CRATE_TARGET) {
			heros_right_right = get_heros_right_right();

			if(heros_right_right == GRASS || heros_right_right == TARGET) {
				push_crate(get_hero_x(), get_hero_y() + 1, RIGHT);
			}

		} else if(heros_right == TARGET) {
			move_hero_to_target(get_hero_x(), get_hero_y(), get_hero_x(), get_hero_y() + 1);
		}


	}

	if(key == UP_ARROW) {

		if(is_hero_on_top_edge()) {
			return;
		}

		heros_top = get_heros_top();

		if(heros_top == GRASS) {
			move_hero_to_grass(get_hero_x(), get_hero_y(), get_hero_x() - 1, get_hero_y())
		} else if(heros_top == CRATE || heros_top == CRATE_TARGET) {
			heros_top_top = get_heros_top_top();

			if(heros_top_top == GRASS || heros_top_top == TARGET) {
				push_crate(get_hero_x() - 1, get_hero_y(), UP);
			}

		} else if(heros_top == TARGET) {
			move_hero_to_target(get_hero_x(), get_hero_y(), get_hero_x() - 1, get_hero_y());
		}


	}

	if(key == DOWN_ARROW) {

		if(is_hero_on_bottom_edge()) {
			return;
		}

		heros_bottom = get_heros_bottom();

		if(heros_bottom == GRASS) {
			move_hero_to_grass(get_hero_x(), get_hero_y(), get_hero_x() + 1, get_hero_y())
		} else if(heros_bottom == CRATE || heros_bottom == CRATE_TARGET) {
			heros_bottom_bottom = get_heros_bottom_bottom();

			if(heros_bottom_bottom == GRASS || heros_bottom_bottom == TARGET) {
				push_crate(get_hero_x() + 1, get_hero_y(), DOWN);
			}

		} else if(heros_bottom == TARGET) {
			move_hero_to_target(get_hero_x(), get_hero_y(), get_hero_x() + 1, get_hero_y());
		}


	}

	draw_map();

	if(check_if_game_over()) {
		alert("You win!");
		is_game_running = false;
		clearInterval(timer_interval);
	}
});

function is_hero_on_grass() {
	hero_x = get_hero_x();
	hero_y = get_hero_y();

	if(game_matrix[hero_x][hero_y] == HERO_TARGET) {
		return false;
	} else {
		return true;
	}
}

function is_crate_on_target(x, y) {
	if(game_matrix[x][y] == CRATE_TARGET) {
		return true;
	} else {
		return false;
	}
}

function move_hero_to_grass(old_x, old_y, new_x, new_y) {
	if(is_hero_on_grass()) {
		game_matrix[old_x][old_y] = GRASS;
	} else {
		game_matrix[old_x][old_y] = TARGET;
	}

	if(game_matrix[new_x][new_y] == TARGET) {
		game_matrix[new_x][new_y] = HERO_TARGET;
	} else {
		game_matrix[new_x][new_y] = HERO;
	}


	set_hero_pos(new_x, new_y);

}

function move_hero_to_target(old_x, old_y, new_x, new_y) {
	game_matrix[new_x][new_y] = HERO_TARGET;
	

	if (is_hero_on_grass()) {
		game_matrix[old_x][old_y] = GRASS;	
	} else {
		game_matrix[old_x][old_y] = TARGET;
	}

	set_hero_pos(new_x, new_y);
}

function push_crate(crate_x, crate_y, direction) {

	if(is_crate_on_target(crate_x, crate_y)) {
		game_matrix[crate_x][crate_y] = TARGET;
	}

	if(direction == LEFT) {
		if(game_matrix[crate_x][crate_y - 1] == TARGET) {
			game_matrix[crate_x][crate_y - 1] = CRATE_TARGET;
		} else {
			game_matrix[crate_x][crate_y - 1] = CRATE;
		}

		move_hero_to_grass(crate_x, crate_y + 1, crate_x, crate_y);
	} else if(direction == RIGHT) {
		if(game_matrix[crate_x][crate_y + 1] == TARGET) {
			game_matrix[crate_x][crate_y + 1] = CRATE_TARGET;
		} else {
			game_matrix[crate_x][crate_y + 1] = CRATE;
		}

		move_hero_to_grass(crate_x, crate_y - 1, crate_x, crate_y);
	} else if(direction == UP) {
		if(game_matrix[crate_x - 1][crate_y] == TARGET) {
			game_matrix[crate_x - 1][crate_y] = CRATE_TARGET;
		} else {
			game_matrix[crate_x - 1][crate_y] = CRATE
		}
		move_hero_to_grass(crate_x + 1, crate_y, crate_x, crate_y);
	} else if(direction == DOWN) {
		if(game_matrix[crate_x + 1][crate_y] == TARGET) {
			game_matrix[crate_x + 1][crate_y] = CRATE_TARGET;
		} else {
			game_matrix[crate_x + 1][crate_y] = CRATE;
		}

		move_hero_to_grass(crate_x - 1, crate_y, crate_x, crate_y);
	}
}

function is_hero_on_left_edge() {
	if(get_hero_y() == 0) {
		return true;
	} else {
		return false;
	}
}

function is_hero_on_right_edge() {
	if(get_hero_y() == map_width - 1) {
		return true;
	} else {
		return false;
	}
}

function is_hero_on_top_edge() {
	if(get_hero_x() == 0) {
		return true;
	} else {
		return false;
	}
}

function is_hero_on_bottom_edge() {
	if(get_hero_x() == map_height - 1) {
		return true;
	} else {
		return false;
	}
}

function get_hero_x() {
	return $('.hero').data('row');
}

function get_hero_y() {
	return $('.hero').data('col');
}

function set_hero_x(value) {
	$('.hero').data('row', value);
}

function set_hero_y(value) {
	$('.hero').data('col', value);
}

function set_hero_pos(x, y) {
	set_hero_x(x);
	set_hero_y(y);
}


function get_heros_left() {
	if(is_hero_on_left_edge()) {
		return WALL;
	}

	hero_x = get_hero_x();
	hero_y = get_hero_y();

	return(get_item_at_cell(hero_x, hero_y - 1));

}

function get_heros_left_left() {

	hero_x = get_hero_x();
	hero_y = get_hero_y();

	if(hero_y < 2) {
		return WALL;
	}

	return(get_item_at_cell(hero_x, hero_y - 2));

}

function get_heros_right() {
	if(is_hero_on_right_edge()) {
		return WALL;
	}

	hero_x = get_hero_x();
	hero_y = get_hero_y();

	return(get_item_at_cell(hero_x, hero_y + 1));

}

function get_heros_right_right() {

	hero_x = get_hero_x();
	hero_y = get_hero_y();

	if(hero_y > map_width - 2) {
		return WALL;
	}

	return(get_item_at_cell(hero_x, hero_y + 2));

}

function get_heros_top() {
	if(is_hero_on_top_edge()) {
		return WALL;
	}

	hero_x = get_hero_x();
	hero_y = get_hero_y();

	return(get_item_at_cell(hero_x - 1, hero_y));

}

function get_heros_top_top() {

	hero_x = get_hero_x();
	hero_y = get_hero_y();

	if(hero_x < 2) {
		return WALL;
	}

	return(get_item_at_cell(hero_x - 2, hero_y));

}

function get_heros_bottom() {
	if(is_hero_on_bottom_edge()) {
		return WALL;
	}

	hero_x = get_hero_x();
	hero_y = get_hero_y();

	return(get_item_at_cell(hero_x + 1, hero_y));

}

function get_heros_bottom_bottom() {

	hero_x = get_hero_x();
	hero_y = get_hero_y();

	if(hero_x > map_height - 2) {
		return WALL;
	}

	return(get_item_at_cell(hero_x + 2, hero_y));

}

function get_item_at_cell(x, y) {
	switch(game_matrix[x][y]) {
	case WALL:
		return WALL;
		break;

	case GRASS:
		return GRASS;
		break;

	case CRATE:
		return CRATE;
		break;

	case TARGET:
		return TARGET;
		break;

	case HERO:
		return HERO;
		break;

	case HERO_TARGET:
		return HERO_TARGET;
		break;

	case CRATE_TARGET:
		return CRATE_TARGET;
		break;

	default:
		return WALL;
	}

}

function check_if_game_over() {
	for(i = 0; i < map_height; i++) {
		for(j = 0; j < map_width; j++) {
			if(game_matrix[i][j] == TARGET || game_matrix[i][j] == HERO_TARGET) {
				return false;
			}
		}
	}

	return true;
}

// World Editor
$('#world_editor').on('click', 'td', function() {
	$(this).toggleClass('active_cell');
});

$('#create_world .btn_item').on('click', function() {
	$('#world_editor td.active_cell').removeClass('wall');
	$('#world_editor td.active_cell').removeClass('grass');
	$('#world_editor td.active_cell').removeClass('target');
	$('#world_editor td.active_cell').removeClass('crate');
	$('#world_editor td.active_cell').removeClass('hero');

	$('#world_editor td.active_cell').addClass($(this).data('control'));
	$('#world_editor td').removeClass('active_cell');
});

$('#btn_restart').on('click', function() {
	new_game();
});

$('#btn_create_world').on('click', function() {
	$('#section_game').hide();
	$('#section_design').show();

	// Prepare blank world
	game_matrix = [];
	for (i = 0; i < map_height; i++) {
		cur_row = [];
		for (j = 0; j < map_width; j++) {
			cur_row.push(GRASS);
		}
		game_matrix.push(cur_row);
	}

	mode = MODE_DESIGN;
	draw_map();
});

$('#btn_home').on('click', function() {
	$('#section_game').show();
	$('#section_design').hide();
});

$('#btn_test').on('click', function() {
	if(!validate_design()) {
		return;
	}

	$('#generated_matrix').html("<h4>Generated Matrix</h4>" + JSON.stringify(test_game_matrix));
	return;

	game_matrix = $.extend(true, [], test_game_matrix);

	$('#section_game').show();
	$('#section_design').hide();

	new_game();
});

function validate_design() {
	var hero_count = 0;
	var target_count = 0;
	var crate_count = 0;
	var wall_count = 0;
	var grass_count = 0;

	var valid = true;

	test_game_matrix = [];

	$('#world_editor .world tr').each(function(tkey, trow) {
		var cur_row = [];

		if (tkey == 0 || tkey == map_height + 1) {
			return true;
		}

		$(trow).find('td').each(function(key, cell) {
			if (key == 0 || key == map_width + 1) {
				return true;
			}

			if ($(this).hasClass('wall')) {
				wall_count++;
				cur_row.push(WALL);
			} else if ($(this).hasClass('grass')) {
				grass_count++;
				cur_row.push(GRASS);
			} else if ($(this).hasClass('crate')) {
				crate_count++;
				cur_row.push(CRATE);
			} else if ($(this).hasClass('hero')) {
				hero_count++;
				cur_row.push(HERO);
			} else if ($(this).hasClass('target')) {
				target_count++;
				cur_row.push(TARGET);
			}
				
			if (hero_count > 1) {
				valid = false;
				alert("Cannot have two playable characters");
				return false;
			}

		});

		if (!valid) {
			return false;
		} else {
			test_game_matrix.push(cur_row);
		}

	});

	if (target_count != crate_count && valid) {
		valid = false;
		alert("Number of crates and number of targets should match");
	} else if (target_count == 0) {
		valid = false;
		alert("This game has no objectives! Please add at least one target and one crate");
	} else if (hero_count == 0) {
		valid = false;
		alert("Must have at least one playable character");
		return false;
	}

	if (!valid) {
		return false;
	} else {
		return true;
	}
}

$('#btn_help').on('click', function() {
	$('.modal').modal('show');
});

$(document).ready(function() {
	original_game_matrix = $.extend(true, [], all_levels[0]);
	populate_level_dd();
	new_game();
});

function populate_level_dd() {
	total_level_count = all_levels.length;

	for (i = 0; i < total_level_count; i++) {
		$('#dd_levels').append("<option value='" + i + "'>" + (i + 1) + "</option>");
	}
}

$('#btn_about').on('click', function() {
	alert("Crates - By Nikhil Baliga... Game is still under development. Send your mails to baliganikhil [at] gmail [dot] com");
});

$('#dd_levels').on('click', function() {
	original_game_matrix = $.extend(true, [], all_levels[$(this).val()]);
	new_game();
});