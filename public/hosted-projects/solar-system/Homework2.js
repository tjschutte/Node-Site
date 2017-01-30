/*
Work done by:
Tom Schutte
tjschutte@wisc.edu
NETID: tjschutte
CSID: schutte
Referances used:
http://www.w3schools.com/tags/ref_canvas.asp
*/

// On load of the page, execute the draw fuction
document.addEventListener( "DOMContentLoaded", function setup() {
	normalPlanets();
	funPlanets();
	trippyPlanets();
});

function normalPlanets() {
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');

	/* These numbers are ~accurate, I fudged them a little to make it more
	 	 interesting sooner.
	*/
	var earthTheta = 0;
	var earthOrbit = 110;
	var earthSpeed = 0.25;
	var	earthSize = 12;

	var mercuryTheta = 0;
	var mercuryOrbit = 0.387 * earthOrbit;
	var mercurySpeed = 8.8 * earthSpeed;
	var	mercurySize = 0.383 * earthSize;

	var venusTheta = 0;
	var venusOrbit = 0.723 * earthOrbit;
	var venusSpeed = earthSpeed * -10;
	var	venusSize = 0.949 * earthSize;

	var moonTheta = 0;
	var moonOrbit = 18;
	var moonSpeed = 27.4 * earthSpeed;
	var	moonSize = 0.2724 * earthSize;

	var marsTheta = 0;
	var marsOrbit = 1.52 * earthOrbit;
	var marsSpeed = 1.23 * earthSpeed;
	var	marsSize = 0.532 * earthSize;

	// Shift our origin to be in the center, more like cartesian coordinate system
	context.translate(canvas.width / 2, canvas.height / 2);

	function drawBackground() {

		// clear background
		context.beginPath();
		context.fillStyle = 'black';
		context.rect(-(canvas.width / 2), -(canvas.height / 2), canvas.width, canvas.height);
		context.fill();
		context.closePath();

		// Draw the sun
		context.fillStyle = 'yellow';
		context.beginPath()
		context.arc(0, 0, 25, 0, 2*Math.PI);
		context.fill();
		context.closePath();

	}

	function draw(){
		//redraw the background
		drawBackground();
		// Draw Mercury
		drawMercury();
		// Draw venus
		drawVenus();
		// Draw Earth
		drawEarth();
		// Draw Mars
		drawMars();

		window.requestAnimationFrame(draw);
	}
	drawBackground();
	window.requestAnimationFrame(draw);

	function drawMercury(){
		// Draw the orbit for mercury
		context.beginPath();
		context.strokeStyle = 'white';
		context.arc(0, 0, mercuryOrbit, 0, 2*Math.PI);
		context.stroke();
		context.closePath();

		context.save();
		context.rotate(mercuryTheta*Math.PI/180);
		context.translate(mercuryOrbit, 0);
		context.fillStyle = 'grey';
		context.beginPath();
		context.arc(0, 0, mercurySize, 0, 2*Math.PI);
		context.closePath();
		context.fill();
		context.restore();

		mercuryTheta += mercurySpeed;
		if (mercuryTheta > 360){
			mercuryTheta = 0;
		}
	};

	function drawVenus(){
		// Draw the orbit for mercury
		context.beginPath();
		context.strokeStyle = 'white';
		context.arc(0, 0, venusOrbit, 0, 2*Math.PI);
		context.stroke();
		context.closePath();

		context.save();
		context.rotate(venusTheta*Math.PI/180);
		context.translate(venusOrbit, 0);
		context.fillStyle = 'orange';
		context.beginPath();
		context.arc(0, 0, venusSize, 0, 2*Math.PI);
		context.closePath();
		context.fill();
		context.restore();

		venusTheta += venusSpeed;
		if (venusTheta > 360){
			venusTheta = 0;
		}
	};

		function drawEarth(){
			// Draw the orbit for mercury
			context.beginPath();
			context.strokeStyle = 'white';
			context.arc(0, 0, earthOrbit, 0, 2*Math.PI);
			context.stroke();
			context.closePath();

			context.save();
			context.rotate(earthTheta*Math.PI/180);
			context.translate(earthOrbit, 0);
			context.fillStyle = 'blue';
			context.beginPath();
			context.arc(0, 0, earthSize, 0, 2*Math.PI);
			context.closePath();
			context.fill();
			drawMoon();
			context.restore();

			earthTheta += earthSpeed;
			if (earthTheta > 360){
				earthTheta = 0;
			}
		};

		function drawMoon() {
			// Draw the orbit for mercury
			context.beginPath();
			context.strokeStyle = 'white';
			context.arc(0, 0, moonOrbit, 0, 2*Math.PI);
			context.stroke();
			context.closePath();

			context.save();
			context.rotate(moonTheta*Math.PI/180);
			context.translate(moonOrbit, 0);
			context.fillStyle = 'white';
			context.beginPath();
			context.arc(0, 0, moonSize, 0, 2*Math.PI);
			context.closePath();
			context.fill();
			context.restore();

			moonTheta += moonSpeed;
			if (moonTheta > 360){
				moonTheta = 0;
			}
		};

		function drawMars(){
			// Draw the orbit for mercury
			context.beginPath();
			context.strokeStyle = 'white';
			context.arc(0, 0, marsOrbit, 0, 2*Math.PI);
			context.stroke();
			context.closePath();

			context.save();
			context.rotate(marsTheta*Math.PI/180);
			context.translate(marsOrbit, 0);
			context.fillStyle = 'red';
			context.beginPath();
			context.arc(0, 0, marsSize, 0, 2*Math.PI);
			context.closePath();
			context.fill();
			context.restore();

			marsTheta += marsSpeed;
			if (marsTheta > 360){
				marsTheta = 0;
			}
		};
};

function funPlanets() {
	var canvas = document.getElementById('myCanvasBonus');
	var context = canvas.getContext('2d');

	/* These numbers are ~accurate, I fudged them a little to make it more
	 	 interesting sooner.
	*/
	var earthTheta = 0;
	var earthOrbit = 110;
	var earthSpeed = 0.25;
	var	earthSize = 12;

	var mercuryTheta = 0;
	var mercuryOrbit = 0.387 * earthOrbit;
	var mercurySpeed = 8.8 * earthSpeed;
	var	mercurySize = 0.383 * earthSize;

	var venusTheta = 0;
	var venusOrbit = 0.723 * earthOrbit;
	var venusSpeed = earthSpeed * -10;
	var	venusSize = 0.949 * earthSize;

	var moonTheta = 0;
	var moonOrbit = 18;
	var moonSpeed = 27.4 * earthSpeed;
	var	moonSize = 0.2724 * earthSize;

	var marsTheta = 0;
	var marsOrbit = 1.52 * earthOrbit;
	var marsSpeed = 1.23 * earthSpeed;
	var	marsSize = 0.532 * earthSize;

	// Shift our origin to be in the center, more like cartesian coordinate system
	context.translate(canvas.width / 2, canvas.height / 2);

	function drawBackground() {

		// clear background
		context.beginPath();
		context.fillStyle = 'black';
		context.rect(-(canvas.width / 2), -(canvas.height / 2), canvas.width, canvas.height);
		context.fill();
		context.closePath();

		// Draw the sun
		context.fillStyle = 'yellow';
		context.beginPath()
		context.arc(0, 0, 25, 0, 2*Math.PI);
		context.fill();
		context.closePath();

	}

	function draw(){
		//redraw the background
		drawBackground();
		// Draw Mercury
		drawMercury();
		// Draw venus
		//drawVenus();
		// Draw Earth
		//drawEarth();
		// Draw Mars
		//drawMars();

		window.requestAnimationFrame(draw);
	}
	drawBackground();
	window.requestAnimationFrame(draw);

	function drawMercury(){
		// Draw the orbit for mercury
		context.beginPath();
		context.strokeStyle = 'white';
		context.arc(0, 0, mercuryOrbit, 0, 2*Math.PI);
		context.stroke();
		context.closePath();

		context.save();
		context.rotate(mercuryTheta*Math.PI/180);
		context.translate(mercuryOrbit, 0);
		context.fillStyle = 'grey';
		context.beginPath();
		context.arc(0, 0, mercurySize, 0, 2*Math.PI);
		context.closePath();
		context.fill();
    drawVenus();
		context.restore();

		mercuryTheta += mercurySpeed;
		if (mercuryTheta > 360){
			mercuryTheta = 0;
		}
	};

	function drawVenus(){
		// Draw the orbit for mercury
		context.beginPath();
		context.strokeStyle = 'white';
		context.arc(0, 0, venusOrbit, 0, 2*Math.PI);
		context.stroke();
		context.closePath();

		context.save();
		context.rotate(venusTheta*Math.PI/180);
		context.translate(venusOrbit, 0);
		context.fillStyle = 'orange';
		context.beginPath();
		context.arc(0, 0, venusSize, 0, 2*Math.PI);
		context.closePath();
		context.fill();
    drawEarth();
		context.restore();

		venusTheta += venusSpeed;
		if (venusTheta > 360){
			venusTheta = 0;
		}
	};

		function drawEarth(){
			// Draw the orbit for mercury
			context.beginPath();
			context.strokeStyle = 'white';
			context.arc(0, 0, earthOrbit, 0, 2*Math.PI);
			context.stroke();
			context.closePath();

			context.save();
			context.rotate(earthTheta*Math.PI/180);
			context.translate(earthOrbit, 0);
			context.fillStyle = 'blue';
			context.beginPath();
			context.arc(0, 0, earthSize, 0, 2*Math.PI);
			context.closePath();
			context.fill();
			drawMoon();
			context.restore();

			earthTheta += earthSpeed;
			if (earthTheta > 360){
				earthTheta = 0;
			}
		};

		function drawMoon() {
			// Draw the orbit for mercury
			context.beginPath();
			context.strokeStyle = 'white';
			context.arc(0, 0, moonOrbit, 0, 2*Math.PI);
			context.stroke();
			context.closePath();

			context.save();
			context.rotate(moonTheta*Math.PI/180);
			context.translate(moonOrbit, 0);
			context.fillStyle = 'white';
			context.beginPath();
			context.arc(0, 0, moonSize, 0, 2*Math.PI);
			context.closePath();
			context.fill();
      drawMars();
			context.restore();

			moonTheta += moonSpeed;
			if (moonTheta > 360){
				moonTheta = 0;
			}
		};

		function drawMars(){
			// Draw the orbit for mercury
			context.beginPath();
			context.strokeStyle = 'white';
			context.arc(0, 0, marsOrbit, 0, 2*Math.PI);
			context.stroke();
			context.closePath();

			context.save();
			context.rotate(marsTheta*Math.PI/180);
			context.translate(marsOrbit, 0);
			context.fillStyle = 'red';
			context.beginPath();
			context.arc(0, 0, marsSize, 0, 2*Math.PI);
			context.closePath();
			context.fill();
			context.restore();

			marsTheta += marsSpeed;
			if (marsTheta > 360){
				marsTheta = 0;
			}
		};
};

function trippyPlanets() {
	var canvas = document.getElementById('myCanvasTrippy');
	var context = canvas.getContext('2d');

	/* These numbers are ~accurate, I fudged them a little to make it more
	 	 interesting sooner.
	*/
	var earthTheta = 0;
	var earthOrbit = 110;
	var earthSpeed = 0.25;
	var	earthSize = 12;

	var mercuryTheta = 0;
	var mercuryOrbit = 0.387 * earthOrbit;
	var mercurySpeed = 8.8 * earthSpeed;
	var	mercurySize = 0.383 * earthSize;

	var venusTheta = 0;
	var venusOrbit = 0.723 * earthOrbit;
	var venusSpeed = earthSpeed * -10;
	var	venusSize = 0.949 * earthSize;

	var moonTheta = 0;
	var moonOrbit = 18;
	var moonSpeed = 7.4 * earthSpeed;
	var	moonSize = 0.2724 * earthSize;

	var marsTheta = 0;
	var marsOrbit = 1.52 * earthOrbit;
	var marsSpeed = 0.03 * earthSpeed;
	var	marsSize = 0.532 * earthSize;

	// Shift our origin to be in the center, more like cartesian coordinate system
	context.translate(canvas.width / 2, canvas.height / 2);

	function drawBackground() {

		// clear background
		context.beginPath();
		context.fillStyle = 'black';
		context.rect(-(canvas.width / 2), -(canvas.height / 2), canvas.width, canvas.height);
		context.fill();
		context.closePath();

		// Draw the sun
		context.fillStyle = 'yellow';
		context.beginPath()
		context.arc(0, 0, 25, 0, 2*Math.PI);
		context.fill();
		context.closePath();

	}

	function draw(){
		//redraw the background
		//drawBackground();
		// Draw Mercury
		drawMercury();
		// Draw venus
		//drawVenus();
		// Draw Earth
		//drawEarth();
		// Draw Mars
		//drawMars();

		window.requestAnimationFrame(draw);
	}
	drawBackground();
	window.requestAnimationFrame(draw);

	function drawMercury(){
		context.save();
		context.rotate(mercuryTheta*Math.PI/180);
		context.translate(mercuryOrbit, 0);
		context.fillStyle = 'grey';
		context.beginPath();
		context.arc(0, 0, mercurySize, 0, 2*Math.PI);
		context.closePath();
		context.fill();
    drawVenus();
		context.restore();

		mercuryTheta += mercurySpeed;
		if (mercuryTheta > 360){
			mercuryTheta = 0;
		}
	};

	function drawVenus(){
		context.save();
		context.rotate(venusTheta*Math.PI/180);
		context.translate(venusOrbit, 0);
		context.fillStyle = 'orange';
		context.beginPath();
		context.arc(0, 0, venusSize, 0, 2*Math.PI);
		context.closePath();
		context.fill();
    drawEarth();
		context.restore();

		venusTheta += venusSpeed;
		if (venusTheta > 360){
			venusTheta = 0;
		}
	};

		function drawEarth(){
			context.save();
			context.rotate(earthTheta*Math.PI/180);
			context.translate(earthOrbit, 0);
			context.fillStyle = 'blue';
			context.beginPath();
			context.arc(0, 0, earthSize, 0, 2*Math.PI);
			context.closePath();
			context.fill();
			drawMoon();
			context.restore();

			earthTheta += earthSpeed;
			if (earthTheta > 360){
				earthTheta = 0;
			}
		};

		function drawMoon() {
			context.save();
			context.rotate(moonTheta*Math.PI/180);
			context.translate(moonOrbit, 0);
			context.fillStyle = 'white';
			context.beginPath();
			context.arc(0, 0, moonSize, 0, 2*Math.PI);
			context.closePath();
			context.fill();
      drawMars();
			context.restore();

			moonTheta += moonSpeed;
			if (moonTheta > 360){
				moonTheta = 0;
			}
		};

		function drawMars(){
			context.save();
			context.rotate(marsTheta*Math.PI/180);
			context.translate(marsOrbit, 0);
			context.fillStyle = 'red';
			context.beginPath();
			context.arc(0, 0, marsSize, 0, 2*Math.PI);
			context.closePath();
			context.fill();
			context.restore();

			marsTheta += marsSpeed;
			if (marsTheta > 360){
				marsTheta = 0;
			}
		};
}
