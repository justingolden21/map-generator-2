let canvas, ctx;

window.onload = ( ()=> {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	// listeners
	u('#generate').on('click',generate);
	u('input').on('change',generate);
	generate();
});

document.onkeyup = function(evt) {
	if(evt.keyCode==13 && document.activeElement.id!='generate') { // enter
		generate();
	} 
};

function generate() {
	let width = validate('width',50);
	let height = validate('height',50);
	let percent = validate('percent',50);
	let smoothing = validate('smoothing',10);

	let grid = createCellularMap(width, height, percent, smoothing);
	drawGrid(grid);
}

function validate(name, defaultVal) {
	let elm = u('#'+name).first();
	let val = check(elm.value, elm.min, elm.max, defaultVal);
	elm.value = val;
	return val;
}
function check(num, min, max, defaultVal) {
	num = Math.max(Math.min(parseInt(num),max),min);
	return isNaN(num) ? defaultVal : num;
}

function drawGrid(grid) {
	const width = grid.length, height = grid[0].length;
	const size = 5;
	canvas.width = width*size;
	canvas.height = height*size;
	for(let x=0; x<width; x++) {
		for(let y=0; y<height; y++) {
			ctx.fillStyle = getColor(grid, x, y);
			ctx.fillRect(x*size, y*size, size, size);
		}
	}
}

function getColor(grid, x, y) {
	return grid[x][y] == 0 ? '#34991f' : '#2948cc';
}