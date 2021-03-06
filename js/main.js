let canvas, ctx;

window.onload = ( ()=> {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	// listeners
	document.getElementById('generate').onclick = generate;
	Array.from(document.getElementsByTagName('input')).forEach(x=>x.onchange = generate);
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
	let size = validate('size',5);
	const colorSettings = {
		whue: validate('whue',210),
		wbase: validate('wbase',80),
		wsat: validate('wsat',60),
		wmult: validate('wmult',4),
		thue: validate('thue',140),
		tbase: validate('tbase',80),
		tsat: validate('tsat',20),
		tmult: validate('tmult',2)
	};

	let grid = createCellularMap(width, height, percent, smoothing);
	drawGrid(grid, size, colorSettings);
}

function validate(name, defaultVal) {
	let elm = document.getElementById(name);
	let val = check(elm.value, elm.min, elm.max, defaultVal);
	elm.value = val;
	return val;
}
function check(num, min, max, defaultVal) {
	num = Math.max(Math.min(parseInt(num),max),min);
	return isNaN(num) ? defaultVal : num;
}

function drawGrid(grid, size, colorSettings) {
	const width = grid.length, height = grid[0].length;
	canvas.width = width*size;
	canvas.height = height*size;
	for(let x=0; x<width; x++) {
		for(let y=0; y<height; y++) {
			ctx.fillStyle = getColor(grid, x, y, colorSettings);
			ctx.fillRect(x*size, y*size, size, size);
		}
	}
}

function getColor(grid, x, y, s) {
	let count = surroundingCount(grid, x, y);
	// return grid[x][y] == 1 ? `hsl(210, 80%, ${60-count*4}%)` : `hsl(140, 80%, ${20+count*2}%)`;
	return grid[x][y] == 1 ? `hsl(${s.whue}, ${s.wsat}%, ${s.wbase-count*s.wmult}%)` : `hsl(${s.thue}, ${s.tsat}%, ${s.tbase+count*s.tmult}%)`;
}