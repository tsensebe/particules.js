function particules(x, y, canvas) {
	var interval;
	var COLORS = ['#ED2B49', '#FF5633', '#F79D1F', '#C2CC2F', '#A1D6AA']; // particules colors
	var FPS = 60;
	   
	//  ______             _            
	// |  ____|           (_)           
	// | |__   _ __   __ _ _ _ __   ___ 
	// |  __| | '_ \ / _` | | '_ \ / _ \
	// | |____| | | | (_| | | | | |  __/
	// |______|_| |_|\__, |_|_| |_|\___|
	//                __/ |             
	//               |___/              
	var center = {'x':x, 'y':y};
	var particules = [];
	var rotation = Math.PI/4; // pixel/second
	var speed = -10; // pixel/second
	var radius = 100; // particules area (start from center)
	var growRate = 10; // particules/second
	var growTick = 0;
	
	function pFactory(distance, angle, color) {
		return {"distance":distance,"angle": angle, "color": color};
	};

	function pRandomFactory() {
		var distance = (speed > 0 ? 0 : radius);
		return pFactory(distance, Math.random()*2*Math.PI, COLORS[Math.floor((Math.random() * COLORS.length) + 1)]);
	};

	function moveParticule(particule) {
		particule.distance += speed/FPS;
		particule.angle += rotation/FPS;
	};

	function move() {
		for(var i=0; i< particules.length; i++) {
			moveParticule(particules[i]);
			if(particules[i].distance < 0 || particules[i].distance > radius) 
				particules.splice(i, 1);
		}		
	}
	
	function grow() {
		growTick += growRate/FPS;
		while(growTick >= 1) {
			particules.push(pRandomFactory());
			growTick = Math.max(growTick - 1, 0);
		}			
	};
	
	function tick() {
		grow();
		move();	
	};

	//  _____                          
	// / ____|                         
	// | |     __ _ _ ____   ____ _ ___ 
	// | |    / _` | '_ \ \ / / _` / __|
	// | |___| (_| | | | \ V / (_| \__ \
	//  \_____\__,_|_| |_|\_/ \__,_|___/
	var ctx = document.getElementById(canvas).getContext("2d");
	var pSize = 3; // particule size
	
	function drawParticule(p) {
		ctx.fillStyle=p.color;
		ctx.fillRect(center.x + Math.cos(p.angle)*p.distance,center.y + Math.sin(p.angle)*p.distance,pSize,pSize);
	};
	
	function drawCenter() {
		ctx.fillStyle='black';
		ctx.fillRect(center.x,center.y,pSize,pSize);
	};
	
	function clear() {
		ctx.fillStyle='white';
		ctx.fillRect(center.x - radius,center.y - radius, 2*(radius+pSize), 2*(radius+pSize));
	}

	function draw() {
		clear();
		for(var i=0; i< particules.length; i++)	drawParticule(particules[i]);
		drawCenter();
	};
		
	//           _____ _____ 
	//     /\   |  __ \_   _|
	//    /  \  | |__) || |  
	//   / /\ \ |  ___/ | |  
	//  / ____ \| |    _| |_ 
	// /_/    \_\_|   |_____|              
	var API = {};
	API.start = function() {interval = setInterval(function() {draw();	tick();}, 1000/FPS);};
	API.stop = function() {clearInterval(interval);};
	API.pixelSize = function(p) {pixelSize = 3;};
	API.radius = function(r) {radius = r;};
	API.speed = function(a) {speed = a;};
	API.rotation = function(r) {rotation = r;};
	API.growRate = function(g) {growRate = g;};
	return API;
}







