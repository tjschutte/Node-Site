/*
    Work done by:
    Tom Schutte
    tjschutte@wisc.edu
    NETID: tjschutte
    CSID: schutte
    Referances used:
*/

// On load of the page, execute the init function
document.addEventListener( "DOMContentLoaded", function init() {
	setup();
});

// setup a block based helicopter
function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider = document.getElementById('slider');
    slider.value = 500;
    var rotation = document.getElementById('rotation');
    rotation.value = 45;

    var sound = document.getElementById('sound');
    sound.checked = false;

    var heli = new Audio('resources/helicopter.mp3');
    var background_sounds = new Audio('resources/background.mp3');

    var background_size = 500;

    var m4 = twgl.m4;
    // Position of the heli in its circular path
    var theta_y = 0;
    // How fast the heli moves
    var speed = 0.5;
    // Hoe fast the blades spin
    var blade_Speed = -0.15;
    // The offset for the Axis
    var theta_offset = 45;

    var temp_x = -100;

    // Distance from axes
    var initialX = 200;
    // Hover height
    var initialY = 20;
    // Variable for storing the current blade angle
    var blade_angle = 0;

    // Helicopter Body shape
    var heliBodyWidth = 55;
    var heliBodyHeight = 55;
    var heliBodyLength = 75;
    var heliColor = '#afafaf';

    // Main rotor
    var bladeWidth = 5;
    var bladeLength = 200;

    // Tail rotor
    var tailBladeLength = 50;
    var tailBladeWidth = 2;

    // Helicopter Tail shape
    var heliTailWidth = 10;
    var heliTailHeight = 10;
    var heliTailLength = 85;

    /**
     * Move to a 3d point relative to our view 'Tx'
     * @param x - the x coordinate
     * @param y - the y coordinate
     * @param z - the z coordinate
     * @param Tx - the 'view' from which we using as reference, a translation
     */
    function moveToTx(x, y, z, Tx) {
        var loc = [x,y,z];
        var locTx = m4.transformPoint(Tx, loc);
        context.moveTo(locTx[0]+(canvas.width/2),-locTx[1]+(canvas.height/2));
    }

    /**
     * Line to a point (x, Y, Z, Tx) where Tx is a position we are 'looking' in from
     * @param x - the x coordinate
     * @param y - the y coordinate
     * @param z - the z coordinate
     * @param Tx - the 'view' from which we using as reference
     */
    function lineToTx(x, y, z, Tx) {
        var loc = [x,y,z];
        var locTx = m4.transformPoint(Tx,loc);
        context.lineTo(locTx[0]+(canvas.width/2),-locTx[1]+(canvas.height/2));
    }

    /**
     * function to draw the axes relative to where we are looking from 'Tx'.
     * This is more just to give some visual reference point from which to view the helicopter
     * @param Tx - the 'view' from which we using as reference
     */
    function drawAxes(Tx) {
        // Draw X axis
        context.beginPath();
        moveToTx(0, 0, 0, Tx);
        lineToTx(200, 0, 0, Tx);
        context.strokeStyle = 'red';
        context.stroke();
        context.closePath();
        // Draw Y axis
        context.beginPath();
        moveToTx(0, 0, 0, Tx);
        lineToTx(0, 200, 0, Tx);
        context.strokeStyle = 'yellow';
        context.stroke();
        context.closePath();
        // Draw Z axis
        context.beginPath();
        moveToTx(0, 0, 0, Tx);
        lineToTx(0, 0, 200, Tx);
        context.strokeStyle = 'blue';
        context.stroke();
        context.closePath();
    }

    /**
     * Draw the ground, in this case some grass
     * @param Tx - the 'view' from which we using as reference
     */
    function drawGrass(Tx) {

        context.fillStyle = '#003b9b';
        context.beginPath();
        moveToTx(-background_size, 0, -background_size, Tx);
        lineToTx(background_size, 0, -background_size, Tx);
        lineToTx(background_size, background_size, -background_size, Tx);
        lineToTx(-background_size, background_size, -background_size, Tx);
        lineToTx(-background_size, 0, -background_size, Tx);
        context.closePath();
        context.fill();

        context.fillStyle = '#003b9b';
        context.beginPath();
        moveToTx(-background_size, 0, -background_size, Tx);
        lineToTx(-background_size, 0, background_size, Tx);
        lineToTx(-background_size, background_size, background_size, Tx);
        lineToTx(-background_size, background_size, -background_size, Tx);
        lineToTx(-background_size, 0, -background_size, Tx);
        context.closePath();
        context.fill();


        context.fillStyle = '#096000';
        context.beginPath();
        moveToTx(-background_size, 0, -background_size, Tx);
        lineToTx(-background_size, 0, background_size + 2000, Tx);
        lineToTx(background_size + 2000, 0, background_size + 2000, Tx);
        lineToTx(background_size + 2000, 0, -background_size, Tx);
        lineToTx(-background_size, 0, -background_size, Tx);
        context.closePath();
        context.fill();

        context.fillStyle = "black";
        context.beginPath();
        moveToTx(-background_size, 0, background_size - 150, Tx);
        lineToTx(-background_size, 0, background_size - 250, Tx);
        lineToTx(background_size + 2000, 0, background_size - 250, Tx);
        lineToTx(background_size + 2000, 0, background_size - 150, Tx);
        context.closePath();
        context.fill();

    }

    /**
     * Draw portion of the helicopter with respect to some view Tx
     * @param Tx - the 'view' from which we using as reference
     */
    function drawHeliFront(Tx) {
        /**
         * FRONT OF HELICOPTER
         */
        context.beginPath();
        context.fillStyle = heliColor;
        // Front bottom left corner is where we start
        moveToTx(initialX, initialY, -heliBodyLength / 2, Tx);
        // Draw bottom front edge, only chnage X
        lineToTx(initialX + heliBodyWidth, initialY, -heliBodyLength / 2, Tx);
        // Draw veritcle, only change Y
        lineToTx(initialX + heliBodyWidth, initialY + heliBodyHeight, -heliBodyLength / 2, Tx);
        // Draw top fron edge, only change X
        lineToTx(initialX, initialY + heliBodyHeight, -heliBodyLength / 2, Tx);
        // Back to original point
        lineToTx(initialX, initialY, -heliBodyLength / 2, Tx);
        context.fill();
        context.stroke();
        context.closePath();
    }

    /**
     * Draw portion of the helicopter with respect to some view Tx
     * @param Tx - the 'view' from which we using as reference
     */
    function drawHeliBack(Tx){
        /**
         * BACK OF HELICOPTER
         */
        context.beginPath();
        context.fillStyle = heliColor;
        // Front bottom left corner is where we start
        moveToTx(initialX, initialY, heliBodyLength / 2, Tx);
        // Draw bottom front edge, only chnage X
        lineToTx(initialX + heliBodyWidth, initialY, heliBodyLength / 2, Tx);
        // Draw veritcle, only change Y
        lineToTx(initialX + heliBodyWidth, initialY + heliBodyHeight, heliBodyLength / 2, Tx);
        // Draw top fron edge, only change X
        lineToTx(initialX, initialY + heliBodyHeight, heliBodyLength / 2, Tx);
        // Back to original point
        lineToTx(initialX, initialY, heliBodyLength / 2, Tx);
        context.fill();
        context.stroke();
        context.closePath();
    }

    /**
     * Draw portion of the helicopter with respect to some view Tx
     * @param Tx - the 'view' from which we using as reference
     */
    function drawHeliLeft(Tx) {
        /**
         * LEFT SIDE OF HELICOPTER
         */
        context.beginPath();
        context.fillStyle = heliColor;
        // Front bottom left corner is where we start
        moveToTx(initialX, initialY, -heliBodyLength / 2, Tx);
        // Draw bottom edge, only change Z
        lineToTx(initialX, initialY, heliBodyLength / 2, Tx);
        // Draw veritcle, only change Y
        lineToTx(initialX, initialY + heliBodyHeight, heliBodyLength / 2, Tx);
        // Draw top fron edge, only change X
        lineToTx(initialX, initialY + heliBodyHeight, -heliBodyLength / 2, Tx);
        // Back to original point
        lineToTx(initialX, initialY, -heliBodyLength / 2, Tx);
        context.fill();
        context.stroke();
        context.closePath();
    }

    /**
     * Draw portion of the helicopter with respect to some view Tx
     * @param Tx - the 'view' from which we using as reference
     */
    function drawHeliRight(Tx) {
        /**
         * RIGHT SIDE OF HELICOPTER
         */
        context.beginPath();
        context.fillStyle = heliColor;
        // Front bottom left corner is where we start
        moveToTx(initialX + heliBodyWidth, initialY, -heliBodyLength / 2, Tx);
        // Draw bottom edge, only change Z
        lineToTx(initialX + heliBodyWidth, initialY, heliBodyLength / 2, Tx);
        // Draw veritcle, only change Y
        lineToTx(initialX + heliBodyWidth, initialY + heliBodyHeight, heliBodyLength / 2, Tx);
        // Draw top fron edge, only change X
        lineToTx(initialX + heliBodyWidth, initialY + heliBodyHeight, -heliBodyLength / 2, Tx);
        // Back to original point
        lineToTx(initialX + heliBodyWidth, initialY, -heliBodyLength / 2, Tx);
        context.fill();
        context.stroke();
        context.closePath();
    }

    /**
     * Draw portion of the helicopter with respect to some view Tx
     * @param Tx - the 'view' from which we using as reference
     */
    function drawHeliTop(Tx) {
        /**
         * TOPSIDE OF HELICOPTER
         */
        context.beginPath();
        context.fillStyle = heliColor;
        // Front bottom left corner is where we start
        moveToTx(initialX, initialY + heliBodyHeight, -heliBodyLength / 2, Tx);
        // Draw bottom edge, only change Z
        lineToTx(initialX, initialY + heliBodyHeight, heliBodyLength / 2, Tx);
        // Draw veritcle, only change Y
        lineToTx(initialX + heliBodyWidth, initialY + heliBodyHeight, heliBodyLength / 2, Tx);
        // Draw top fron edge, only change X
        lineToTx(initialX + heliBodyWidth, initialY + heliBodyHeight, -heliBodyLength / 2, Tx);
        // Back to original point
        lineToTx(initialX, initialY + heliBodyHeight, -heliBodyLength / 2, Tx);
        context.fill();
        context.stroke();
        context.closePath();
    }

    /**
     * Draw portion of the helicopter with respect to some view Tx
     * @param Tx - the 'view' from which we using as reference
     */
    function drawHeliBottom(Tx) {
        /**
         * LEGS OF HELICOPTER
         */
        context.beginPath();
        // Front left leg
        moveToTx(initialX + 5, initialY, -heliBodyLength/2 + (heliBodyLength / 8), Tx);
        lineToTx(initialX + 5, initialY - 20, -heliBodyLength/2 + (heliBodyLength / 8), Tx);
        // back left leg
        moveToTx(initialX + 5, initialY, heliBodyLength/2 - (heliBodyLength / 8), Tx);
        lineToTx(initialX + 5, initialY - 20, heliBodyLength/2 - (heliBodyLength / 8), Tx);
        // left runner bar
        moveToTx(initialX + 5, initialY - 20, -heliBodyLength/2, Tx);
        lineToTx(initialX + 5, initialY - 20, heliBodyLength/2, Tx);
        // front right leg
        moveToTx(initialX + heliBodyWidth - 5, initialY, -heliBodyLength/2 + (heliBodyLength / 8), Tx);
        lineToTx(initialX + heliBodyWidth - 5, initialY - 20, -heliBodyLength/2 + (heliBodyLength / 8), Tx);
        // back right leg
        moveToTx(initialX + heliBodyWidth - 5, initialY, heliBodyLength/2 - (heliBodyLength / 8), Tx);
        lineToTx(initialX + heliBodyWidth - 5, initialY - 20, heliBodyLength/2 - (heliBodyLength / 8), Tx);
        // right runner bar
        moveToTx(initialX + heliBodyWidth - 5, initialY - 20, -heliBodyLength/2, Tx);
        lineToTx(initialX + heliBodyWidth - 5, initialY - 20, heliBodyLength/2, Tx);
        context.stroke();
        context.closePath();
        /**
         * BOTTOM OF HELICOPTER
         */
        context.beginPath();
        context.fillStyle = heliColor;
        // Front bottom left corner is where we start
        moveToTx(initialX, initialY, -heliBodyLength / 2, Tx);
        // Draw bottom edge, only change Z
        lineToTx(initialX, initialY, heliBodyLength / 2, Tx);
        // Draw veritcle, only change Y
        lineToTx(initialX + heliBodyWidth, initialY, heliBodyLength / 2, Tx);
        // Draw top fron edge, only change X
        lineToTx(initialX + heliBodyWidth, initialY, -heliBodyLength / 2, Tx);
        // Back to original point
        lineToTx(initialX, initialY, -heliBodyLength / 2, Tx);
        context.fill();
        context.stroke();
        context.closePath();
    }

    /**
     * Draw portion of the helicopter with respect to some view Tx
     * @param Tx - the 'view' from which we using as reference
     */
    function drawTailTop(Tx) {
        /**
         * TOPSIDE OF HELICOPTER TAIL
         */
        context.beginPath();
        context.fillStyle = heliColor;
        // Front bottom left corner is where we start
        moveToTx(initialX + (heliBodyWidth / 2) - (heliTailWidth/2), initialY + heliBodyHeight, heliBodyLength / 2, Tx);
        // Draw bottom edge, only change Z
        lineToTx(initialX + (heliBodyWidth / 2) - (heliTailWidth/2), initialY + heliBodyHeight, (heliBodyLength / 2) + heliTailLength, Tx);
        // Draw veritcle, only change Y
        lineToTx(initialX + (heliBodyWidth / 2) + (heliTailWidth/2), initialY + heliBodyHeight, (heliBodyLength / 2) + heliTailLength, Tx);
        // Draw top fron edge, only change X
        lineToTx(initialX + (heliBodyWidth / 2) + (heliTailWidth/2), initialY + heliBodyHeight, heliBodyLength / 2, Tx);
        // Back to original point
        lineToTx(initialX + (heliBodyWidth / 2) - (heliTailWidth/2), initialY + heliBodyHeight, heliBodyLength / 2, Tx);
        context.fill();
        context.stroke();
        context.closePath();
    }

    /**
     * Draw portion of the helicopter with respect to some view Tx
     * @param Tx - the 'view' from which we using as reference
     */
    function drawTailBottom(Tx) {
        /**
         * BOTTOM OF HELICOPTER TAIL
         */
        context.beginPath();
        context.fillStyle = heliColor;
        // Front bottom left corner is where we start
        moveToTx(initialX + (heliBodyWidth / 2) - (heliTailWidth/2), initialY + heliBodyHeight - heliTailHeight, heliBodyLength / 2, Tx);
        // Draw bottom edge, only change Z
        lineToTx(initialX + (heliBodyWidth / 2) - (heliTailWidth/2), initialY + heliBodyHeight - heliTailHeight, (heliBodyLength / 2) + heliTailLength, Tx);
        // Draw veritcle, only change Y
        lineToTx(initialX + (heliBodyWidth / 2) + (heliTailWidth/2), initialY + heliBodyHeight - heliTailHeight, (heliBodyLength / 2) + heliTailLength, Tx);
        // Draw top fron edge, only change X
        lineToTx(initialX + (heliBodyWidth / 2) + (heliTailWidth/2), initialY + heliBodyHeight - heliTailHeight, heliBodyLength / 2, Tx);
        // Back to original point
        lineToTx(initialX + (heliBodyWidth / 2) - (heliTailWidth/2), initialY + heliBodyHeight - heliTailHeight, heliBodyLength / 2, Tx);
        context.fill();
        context.stroke();
        context.closePath();
    }

    /**
     * Draw portion of the helicopter with respect to some view Tx
     * @param Tx - the 'view' from which we using as reference
     */
    function drawTailLeft(Tx) {
        /**
         * LEFTSIDE OF HELICOPTER TAIL
         */
        context.beginPath();
        context.fillStyle = heliColor;

        moveToTx(initialX + (heliBodyWidth / 2) - (heliTailWidth/2), initialY + heliBodyHeight - heliTailHeight, heliBodyLength / 2, Tx);

        lineToTx(initialX + (heliBodyWidth / 2) - (heliTailWidth/2), initialY + heliBodyHeight - heliTailHeight, (heliBodyLength / 2) + heliTailLength, Tx);

        lineToTx(initialX + (heliBodyWidth / 2) - (heliTailWidth/2), initialY + heliBodyHeight, (heliBodyLength / 2) + heliTailLength, Tx);

        lineToTx(initialX + (heliBodyWidth / 2) - (heliTailWidth/2), initialY + heliBodyHeight, heliBodyLength / 2, Tx);

        lineToTx(initialX + (heliBodyWidth / 2) - (heliTailWidth/2), initialY + heliBodyHeight - heliTailHeight, heliBodyLength / 2, Tx);
        context.fill();
        context.stroke();
        context.closePath();
    }

    /**
     * Draw portion of the helicopter with respect to some view Tx
     * @param Tx - the 'view' from which we using as reference
     */
    function drawTailRight(Tx) {
        /**
         * LEFTSIDE OF HELICOPTER TAIL
         */
        context.beginPath();
        context.fillStyle = heliColor;

        moveToTx(initialX + (heliBodyWidth / 2) + (heliTailWidth/2), initialY + heliBodyHeight - heliTailHeight, heliBodyLength / 2, Tx);

        lineToTx(initialX + (heliBodyWidth / 2) + (heliTailWidth/2), initialY + heliBodyHeight - heliTailHeight, (heliBodyLength / 2) + heliTailLength, Tx);

        lineToTx(initialX + (heliBodyWidth / 2) + (heliTailWidth/2), initialY + heliBodyHeight, (heliBodyLength / 2) + heliTailLength, Tx);

        lineToTx(initialX + (heliBodyWidth / 2) + (heliTailWidth/2), initialY + heliBodyHeight, heliBodyLength / 2, Tx);

        lineToTx(initialX + (heliBodyWidth / 2) + (heliTailWidth/2), initialY + heliBodyHeight - heliTailHeight, heliBodyLength / 2, Tx);
        context.fill();
        context.stroke();
        context.closePath();
    }

    /**
     * Draw portion of the helicopter with respect to some view Tx
     * @param Tx - the 'view' from which we using as reference
     */
    function drawTailBack(Tx) {
        /**
         * LEFTSIDE OF HELICOPTER TAIL
         */
        context.beginPath();
        context.fillStyle = heliColor;

        moveToTx(initialX + (heliBodyWidth / 2) - heliTailWidth /2, initialY + heliBodyHeight - heliTailHeight, heliBodyLength / 2 + heliTailLength, Tx);

        lineToTx(initialX + (heliBodyWidth / 2) - heliTailWidth /2, initialY + heliBodyHeight, heliBodyLength / 2 + heliTailLength, Tx);

        lineToTx(initialX + (heliBodyWidth / 2) + heliTailWidth /2, initialY + heliBodyHeight, heliBodyLength / 2 + heliTailLength, Tx);

        lineToTx(initialX + (heliBodyWidth / 2) + heliTailWidth /2, initialY + heliBodyHeight - heliTailHeight, heliBodyLength / 2 + heliTailLength, Tx);

        lineToTx(initialX + (heliBodyWidth / 2) - heliTailWidth /2, initialY + heliBodyHeight - heliTailHeight, heliBodyLength / 2 + heliTailLength, Tx);
        context.fill();
        context.stroke();
        context.closePath();
    }

    /**
     * Draws the helicopter main rotor with respect to view Tx, and a global
     * blade rotation amount
     * @param Tx - the 'view' from which we using as reference
     */
    function drawHeliRotor(Tx){
        context.fillStyle = 'black';
        var blade_t = m4.translate(Tx, [initialX + (heliBodyWidth / 2), 0, 0]);
        var blade = m4.rotateY(blade_t, blade_angle);

        /**
         * Helicopter Blade
         */
        context.beginPath();
        // move to the middle of the top
        moveToTx(-(bladeLength/2), initialY + heliBodyHeight, -(bladeWidth / 2), blade);
        // Draw bottom edge, only change Z
        lineToTx((bladeLength/2), initialY + heliBodyHeight, -(bladeWidth / 2), blade);
        // Draw verticle, only change Y
        lineToTx((bladeLength / 2), initialY + heliBodyHeight, bladeWidth / 2, blade);
        // Draw top fron edge, only change X
        lineToTx(-(bladeLength / 2), initialY + heliBodyHeight, bladeWidth / 2, blade);
        // Back to original point
        lineToTx(-(bladeLength/2), initialY + heliBodyHeight, -(bladeWidth / 2), blade);
        context.fill();
        context.stroke();
        context.closePath();
    }

    /**
     * Draws the helicopter tail rotor with respect to view Tx, and a global
     * blade rotation amount
     * @param Tx - the 'view' from which we using as reference
     */
    function drawHeliTailRotor(Tx){

        context.fillStyle = 'black';
        // mvoe to tip of tail
        var blade_t = m4.translate(Tx, [initialX + (heliBodyWidth / 2 + heliTailWidth / 2), initialY + heliBodyHeight - (heliTailHeight / 2), (heliBodyLength / 2 + heliTailLength) - 5]);

        var blade = m4.rotateX(blade_t, blade_angle);

        /**
         * Helicopter Blade
         */
        context.beginPath();
        moveToTx(0, tailBladeLength / 2, -(tailBladeWidth / 2), blade);
        lineToTx(0, -(tailBladeLength / 2), -(tailBladeWidth / 2), blade);
        lineToTx(0, -(tailBladeLength / 2), (tailBladeWidth / 2), blade);
        lineToTx(0, tailBladeLength / 2, (tailBladeWidth / 2), blade);
        context.fill();
        context.stroke();
        context.closePath();
    }

    /**
     *
     * @param x - coordinate
     * @param y - y coordinate
     * @param z - z coordinate
     * @param dx - x length
     * @param dy - y length
     * @param dz - z length
     * @param color - color of the cube
     * @param Tx - the 'view' from which we using as reference
     */
    function drawCube(x, y, z, dx, dy, dz, color, Tx) {

        context.fillStyle = color;
        // Bottom of the cube
        context.beginPath();
        moveToTx(x, y, z, Tx);
        lineToTx(x + dx, y, z, Tx);
        lineToTx(x + dx, y, z + dz, Tx);
        lineToTx(x, y, z + dz, Tx);
        lineToTx(x, y, z, Tx);
        context.closePath();
        //context.stroke();
        context.fill();

        // Top of the cube
        context.beginPath();
        moveToTx(x, y + dy, z, Tx);
        lineToTx(x + dx, y + dy, z, Tx);
        lineToTx(x + dx, y + dy, z + dz, Tx);
        lineToTx(x, y + dy, z + dz, Tx);
        lineToTx(x, y + dy, z, Tx);
        context.closePath();
        context.stroke();
        context.fill();

        // Front Left of the cube
        context.beginPath();
        moveToTx(x, y, z + dz, Tx);
        lineToTx(x + dx, y, z + dz, Tx);
        lineToTx(x + dx, y + dy, z + dz, Tx);
        lineToTx(x, y + dy, z + dz, Tx);
        lineToTx(x, y, z + dz, Tx);
        context.closePath();
        //context.stroke();
        context.fill();

        // back right of the cube
        context.beginPath();
        moveToTx(x, y, z, Tx);
        lineToTx(x + dx, y, z, Tx);
        lineToTx(x + dx, y + dy, z, Tx);
        lineToTx(x, y + dy, z, Tx);
        lineToTx(x, y, z, Tx);
        context.closePath();
        //context.stroke();
        context.fill();

        // Front Right of the cube
        context.beginPath();
        moveToTx(x + dx, y, z, Tx);
        lineToTx(x + dx, y, z + dz, Tx);
        lineToTx(x + dx, y + dy, z + dz, Tx);
        lineToTx(x + dx, y + dy, z, Tx);
        lineToTx(x + dx, y, z, Tx);
        context.closePath();
        //context.stroke();
        context.fill();

        // back left  of the cube
        context.beginPath();
        moveToTx(x + dx, y, z, Tx);
        lineToTx(x + dx, y, z + dz, Tx);
        lineToTx(x + dx, y + dy, z + dz, Tx);
        lineToTx(x + dx, y + dy, z, Tx);
        lineToTx(x + dx, y, z, Tx);
        context.closePath();
        //context.stroke();
        context.fill();

    }

    /**
     *
     * @param x - x coordinate
     * @param y - y coordinate
     * @param z - z coordinate
     * @param dx - the x length
     * @param dy - the y length
     * @param dz - the x length
     * @param color - the color of the pyramid
     * @param Tx - the 'view' from which we using as reference
     */
    function drawPyramid(x, y, z, dx, dy, dz, color, Tx) {

        context.fillStyle = color;
        // Base
        context.beginPath();
        moveToTx(x, y, z, Tx);
        lineToTx(x + dx, y, z, Tx);
        lineToTx(x + dx, y, z + dz, Tx);
        lineToTx(x, y, z + dz, Tx);
        lineToTx(x, y, z, Tx);
        context.closePath();
        context.stroke();
        context.fill();

        // back left of the
        context.beginPath();
        moveToTx(x, y, z + dz, Tx);
        lineToTx(x + dx/2, y + dy, z + dz/2, Tx);
        lineToTx(x, y, z, Tx);
        context.closePath();
        context.stroke();
        context.fill();

        // back right of the
        context.beginPath();
        moveToTx(x, y, z, Tx);
        lineToTx(x + dx/2, y + dy, z + dz/2, Tx);
        lineToTx(x + dx, y, z, Tx);
        context.closePath();
        context.stroke();
        context.fill();

        // Front left of the
        context.beginPath();
        moveToTx(x, y, z + dz, Tx);
        lineToTx(x + dx/2, y + dy, z + dz/2, Tx);
        lineToTx(x + dx, y, z + dz, Tx);
        context.closePath();
        context.stroke();
        context.fill();

        // Front right of the
        context.beginPath();
        moveToTx(x + dx, y, z + dz, Tx);
        lineToTx(x + dx/2, y + dy, z + dz/2, Tx);
        lineToTx(x + dx, y, z, Tx);
        context.closePath();
        context.stroke();
        context.fill();

    }

    /**
     * Draws the scenery for the image, some trees and houses
     * @param Tx - the 'view' from which we using as reference
     */
    function drawScenary(Tx) {
        var tree_t = m4.translate(Tx, [-200, 0, -100]);
        var tree_r = m4.rotateY(tree_t, 30);
        drawCube(-210, 0, -110, 20, 20, 20, "#603a00", tree_r);
        drawCube(-240, 20, -140, 80, 10, 80, "green", tree_r);
        drawCube(-230, 30, -130, 60, 15, 60, "green", tree_r);
        drawCube(-225, 45, -125, 50, 20, 50, "green", tree_r);


        tree_t = m4.translate(Tx, [-150, 0, -210]);
        tree_r = m4.rotateY(tree_t, -30);
        drawCube(-160, 0, -220, 20, 20, 20, "#603a00", tree_r);
        drawCube(-190, 20, -250, 80, 10, 80, "green", tree_r);
        drawCube(-180, 30, -240, 60, 15, 60, "green", tree_r);
        drawCube(-175, 45, -235, 50, 20, 50, "green", tree_r);

        tree_t = m4.translate(Tx, [-100, 0, -100]);
        tree_r = m4.rotateY(tree_t, 10);
        drawCube(-110, 0, -110, 20, 20, 20, "#603a00", tree_r);
        drawCube(-140, 20, -140, 80, 10, 80, "green", tree_r);
        drawCube(-130, 30, -130, 60, 15, 60, "green", tree_r);
        drawCube(-125, 45, -125, 50, 20, 50, "green", tree_r);

        tree_t = m4.translate(Tx, [180, 0, -200]);
        tree_r = m4.rotateY(tree_t, -35);
        drawCube(190, 0, -210, 20, 20, 20, "#603a00", tree_r);
        drawCube(140, 20, -240, 80, 10, 80, "green", tree_r);
        drawCube(150, 30, -230, 60, 15, 60, "green", tree_r);
        drawCube(155, 45, -225, 50, 20, 50, "green", tree_r);

        drawCube(-100, 0, 100, 20, 20, 20, "#603a00", Tx);
        drawCube(-140, 20, 60, 80, 10, 80, "green", Tx);
        drawCube(-130, 30, 70, 60, 15, 60, "green", Tx);
        drawCube(-125, 45, 75, 50, 20, 50, "green", Tx);

        // Simple little house
        drawCube(100, 0, -50, 50, 50, 50, "#a08500", Tx);
        drawPyramid(95, 50, -55, 60, 15, 60, "#3f3f3f", Tx);

        // Draw a moving car
        drawCube(temp_x, 0 , background_size - 200, 70 , 10 , 40, "silver", Tx);
        drawCube(temp_x + 20, 10 , background_size - 200, 30 , 15 , 40, "silver", Tx);
        temp_x += 5.5;
        if (temp_x > background_size + 2000) {
            temp_x = -background_size;
        }

        tree_t = m4.translate(Tx, [90, 0, 290]);
        tree_r = m4.rotateY(tree_t, 7);
        drawCube(90, 0, 290, 20, 20, 20, "#603a00", tree_r);
        drawCube(60, 20, 260, 80, 10, 80, "green", tree_r);
        drawCube(70, 30, 270, 60, 15, 60, "green", tree_r);
        drawCube(75, 45, 275, 50, 20, 50, "green", tree_r);

    }

    /**
     * Draw a cube with respect to the view 'Tx' This will form the body of
     * the helicopter
     * @param Tx - the 'view' from which we using as reference
     * @param angle = angle around that the heli has gone
     */
    function drawHeli(Tx, angle) {
        // Body color
        context.fillStyle = 'red';
        context.strokeWidth = 2;
        context.strokeStyle = 'black';
        // always draw the bottom first
        drawHeliBottom(Tx);

        if ( (angle > 0 - theta_offset && angle < 90 - theta_offset) || angle > 360 - theta_offset) {
            drawHeliFront(Tx);
            drawHeliLeft(Tx);
            drawTailLeft(Tx);
            drawHeliBack(Tx);
            drawTailBottom(Tx);
            drawHeliRight(Tx);
            drawTailRight(Tx);
            drawTailTop(Tx);
            drawTailBack(Tx);
            drawHeliTailRotor(Tx);
        } else if (angle >= 90 - theta_offset && angle < 180 - theta_offset) {
            drawHeliFront(Tx);
            drawHeliRight(Tx);
            drawTailRight(Tx);
            drawHeliTailRotor(Tx);
            drawHeliLeft(Tx);
            drawHeliBack(Tx);
            drawTailBottom(Tx);
            drawTailLeft(Tx);
            drawTailTop(Tx);
            drawTailBack(Tx);
        } else if (angle >= 180 - theta_offset && angle < 270 - theta_offset) {
            drawHeliBack(Tx);
            drawTailBack(Tx);
            drawTailBottom(Tx);
            drawTailRight(Tx);
            drawHeliRight(Tx);
            drawHeliTailRotor(Tx);
            drawTailLeft(Tx);
            drawHeliLeft(Tx);
            drawHeliFront(Tx);
            drawTailTop(Tx);
        } else {
            drawHeliBack(Tx);
            drawTailBack(Tx);
            drawTailBottom(Tx);
            drawHeliLeft(Tx);
            drawTailLeft(Tx);
            drawTailRight(Tx);
            drawHeliRight(Tx);
            drawTailTop(Tx);
            drawHeliTailRotor(Tx);
            drawHeliFront(Tx);
        }

        // always draw the top last
        drawHeliTop(Tx);

        drawHeliRotor(Tx);

    }

    /**
     * Primary drawing fuction, this is what we call to update the canvas with
     * the current fram of animation
     */
    function draw() {
        // hack to clear the canvas fast
        canvas.width = canvas.width;
        // Angle to view the axis at
        var angle1 = rotation.value * (Math.PI / 180);
        // Rotation of the helicopter
        var angle2 = theta_y * (Math.PI / 180);
        // Axis to rotate the helicopter about
        var axis = [0,1,0];
        // rotate the model
        var Tmodel = m4.axisRotation(axis, angle2);
        // Where we are looking from, our 'eye'
        var eye = [slider.value * Math.cos(angle1), 300, slider.value * Math.sin(angle1)];
        // where we are looking (The origin)
        var target = [0,0,0];
        // Defining the y axis as up
        var up = [0,1,0];
        // Creating our camera through which we will look
        var Tcamera = m4.inverse(m4.lookAt(eye,target,up));
        // Set up the view of the Model
        var Tmodelview = m4.multiply(Tmodel,Tcamera);
        // NOTE The Axis are always ontop of the scenery intentionally
        // Draw the ground
        drawGrass(Tcamera);
        // Make it more interesting
        drawScenary(Tcamera);

        // Decide who is in front, the helicopter or the axis
        if (theta_y > 90 && theta_y < 180) {
            // Draw Helicopter
            drawHeli(Tmodelview, theta_y);
            // Draw the X, Y, Z Axis to show a referance for each
            //drawAxes(Tcamera);
        } else {
            // Draw the X, Y, Z Axis to show a referance for each
            //drawAxes(Tcamera);
            // Draw Helicopter
            drawHeli(Tmodelview, theta_y);
        }
        if (theta_y == 0){
            initialY = 25;
        } else if (theta_y <= 180) {
            initialY += 0.3;
        } else {
            initialY -= 0.3;
        }
        // Speed of rotation about the y axis (really the angle)
        theta_y += speed;
        // Speed of the blade
        blade_angle += blade_Speed;
        if (theta_y > 360) {
            theta_y = 0;
        }

        if (sound.checked) {
            heli.play();
            background_sounds.play();
        } else {
            heli.pause();
            background_sounds.pause();
        }

        //Request the next frame when done drawing the current one
        window.requestAnimationFrame(draw);
    }

    // Kick off the party
    draw();
}