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
});

function normalPlanets() {
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');

	/* These numbers are ~accurate, I fudged them a little to make it more
	 	 interesting sooner.
	*/
	var earthTheta = 0;
	var earthOrbit = 100;
	var earthSpeed = 1;
	var	earthSize = 10;

	var mercuryTheta = 0;
	var mercuryOrbit = 0.387 * earthOrbit;
	var mercurySpeed = earthSpeed / 0.241;
	var	mercurySize = 0.383 * earthSize;

	var venusTheta = 0;
	var venusOrbit = 0.723 * earthOrbit;
	var venusSpeed = -earthSpeed / 0.615;
	var	venusSize = 0.949 * earthSize;

	var moonTheta = 0;
	var moonOrbit = 0.2 * earthOrbit;
	var moonSpeed = earthSpeed / 0.0748;
	var	moonSize = 0.2724 * earthSize;

	var marsTheta = 0;
	var marsOrbit = 1.52 * earthOrbit;
	var marsSpeed = earthSpeed / 1.88;
	var	marsSize = 0.532 * earthSize;

	var jupiterTheta = 0;
	var jupiterOrbit = 5.20 * earthOrbit / 2;
	var jupiterSpeed = earthSpeed / 11.9;
	var	jupiterSize = 11.21 * earthSize * .8;

	var saturnTheta = 0;
	var saturnOrbit = 9.58 * earthOrbit  / 2;
	var saturnSpeed = earthSpeed / 29.4;
	var	saturnSize = 9.45 * earthSize;

	var uranusTheta = 0;
	var uranusOrbit = 19.20 * earthOrbit  / 3;
	var uranusSpeed = earthSpeed / 83.7;
	var	uranusSize = 4.01 * earthSize;

	var neptuneTheta = 0;
	var neptuneOrbit = 30.05 * earthOrbit  / 4;
	var neptuneSpeed = earthSpeed / 163.7;
	var	neptuneSize = 3.88 *  earthSize;

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
		context.arc(0, 0, 5, 0, 2*Math.PI);
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

		drawJupiter();

		drawSaturn();

		drawUranus();

		drawNeptune();

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

	function drawJupiter(){
			// Draw the orbit for mercury
			context.beginPath();
			context.strokeStyle = 'white';
			context.arc(0, 0, jupiterOrbit, 0, 2*Math.PI);
			context.stroke();
			context.closePath();

			context.save();
			context.rotate(jupiterTheta*Math.PI/180);
			context.translate(jupiterOrbit, 0);
			context.fillStyle = 'brown';
			context.beginPath();
			context.arc(0, 0, jupiterSize, 0, 2*Math.PI);
			context.closePath();
			context.fill();
			context.restore();

			jupiterTheta += jupiterSpeed;
			if (jupiterTheta > 360){
				jupiterTheta = 0;
			}
		};

	function drawSaturn(){
			// Draw the orbit for mercury
			context.beginPath();
			context.strokeStyle = 'white';
			context.arc(0, 0, saturnOrbit, 0, 2*Math.PI);
			context.stroke();
			context.closePath();

			context.save();
			context.rotate(saturnTheta*Math.PI/180);
			context.translate(saturnOrbit, 0);
			context.fillStyle = 'light-brown';
			context.beginPath();
			context.arc(0, 0, saturnSize, 0, 2*Math.PI);
			context.closePath();
			context.fill();
			context.restore();

			saturnTheta += saturnSpeed;
			if (saturnTheta > 360){
				saturnTheta = 0;
			}
		};

	function drawUranus(){
			// Draw the orbit for mercury
			context.beginPath();
			context.strokeStyle = 'white';
			context.arc(0, 0, uranusOrbit, 0, 2*Math.PI);
			context.stroke();
			context.closePath();

			context.save();
			context.rotate(uranusTheta*Math.PI/180);
			context.translate(uranusOrbit, 0);
			context.fillStyle = 'light-blue';
			context.beginPath();
			context.arc(0, 0, uranusSize, 0, 2*Math.PI);
			context.closePath();
			context.fill();
			context.restore();

			uranusTheta += uranusSpeed;
			if (uranusTheta > 360){
				uranusTheta = 0;
			}
		};

	function drawNeptune(){
			// Draw the orbit for mercury
			context.beginPath();
			context.strokeStyle = 'white';
			context.arc(0, 0, neptuneOrbit, 0, 2*Math.PI);
			context.stroke();
			context.closePath();

			context.save();
			context.rotate(neptuneTheta*Math.PI/180);
			context.translate(neptuneOrbit, 0);
			context.fillStyle = 'blue';
			context.beginPath();
			context.arc(0, 0, neptuneSize, 0, 2*Math.PI);
			context.closePath();
			context.fill();
			context.restore();

			neptuneTheta += neptuneSpeed;
			if (neptuneTheta > 360){
				neptuneTheta = 0;
			}
		};

};
