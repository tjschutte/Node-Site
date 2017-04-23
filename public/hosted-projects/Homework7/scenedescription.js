/**
 * Created by Tom on 3/28/2017.
 */

// pushing cube objects

// p5.js require these to be present. I'm not actually using the lib to render anything, I just want their noise function
// and their map function
function setup() { /* nothing here */
}
function draw() { /* nothing here */
}

//                       name            position   [scale x, y, z]  color [r, g, b]
grobjects.push(new Cube("Windmill1Tower", [5, 2, -10], [4, 12, 4],     [1,0.9,0]));
grobjects.push(new Cube("Windmill1Axix",  [4, 7, -10], [4, 1, 1],      [0.1,0.1,0.1]));
//                       name                    position   [scale x, y, z]   color [r, g, b], axis of rotation [x, y, z]   speed
grobjects.push(new SpinningCube("Windmill1blade1",[2, 7, -10], [0.5, 15, 1],       [1,1,1],         [1,0,0],                 0.25));
grobjects.push(new SpinningCube("Windmill1blade2",[2, 7, -10], [0.5, 1, 15],       [1,1,1],         [1,0,0],                 0.25));

//                       name            position   [scale x, y, z]  color [r, g, b]
grobjects.push(new Cube("Windmill2Tower", [-5, 2, 10], [4, 12, 4],     [1,0.9,0]));
grobjects.push(new Cube("Windmill2Axix",  [-6, 7, 10], [4, 1, 1],      [0.1,0.1,0.1]));
//                       name                    position   [scale x, y, z]   color [r, g, b], axis of rotation [x, y, z]   speed
grobjects.push(new SpinningCube("Windmill2blade1",[-8, 7, 10], [0.5, 15, 1],       [1,1,1],         [1,0,0],                 0.24));
grobjects.push(new SpinningCube("Windmill2blade2",[-8, 7, 10], [0.5, 1, 15],       [1,1,1],         [1,0,0],                 0.24));

//                       name            position   [scale x, y, z]  color [r, g, b]
grobjects.push(new Cube("Windmill3Tower", [8, 2, -25], [4, 12, 4],     [1,0.9,0]));
grobjects.push(new Cube("Windmill3Axix",  [7, 7, -25], [4, 1, 1],      [0.1,0.1,0.1]));
//                       name                    position   [scale x, y, z]   color [r, g, b], axis of rotation [x, y, z]   speed
grobjects.push(new SpinningCube("Windmill3blade1",[5, 7, -25], [0.5, 15, 1],       [1,1,1],         [1,0,0],                 0.26));
grobjects.push(new SpinningCube("Windmill3blade2",[5, 7, -25], [0.5, 1, 15],       [1,1,1],         [1,0,0],                 0.26));

grobjects.push(new Cube("skybox", [0, 0, 0], [100, 100, 100], [0.3, 0.4, 1]));

grobjects.push(new SpinningMetalCube("metal", [0, 0, 0], [3, 3, 3], [0.2, 0.2, 0.2], [1,1,0], 0.1));

grobjects.push(new MetalCube("metal", [-2, 0, -2], [3, 3, 3], [0.2, 0.2, 0.2]));

// Cloud(name, position, size, color, motiondirection, speed)
var numclouds = parseInt(Math.random() * 300);
for (var i = numclouds; i > 0; i--) {
    grobjects.push(new Cloud("cloud" + i, [(numclouds / 2) - Math.random() * i, 8 + Math.random() * 2, (numclouds / 2) - Math.random() * i], [1, 1, 1], [1, 1, 1], [1, 0, 0], 0.05 * Math.random() + 0.05));
}

var numtrees = parseInt(Math.random() * 50) + 10;
for (var i = numtrees; i > 0; i--) {

    grobjects.push(new Tree("tree" + i, [100 * Math.random() - 50, -0.1, 100 * Math.random() - 50], [1.5, 1.3, 1.5]));
}

for (var i = numtrees; i > 0; i--) {
    grobjects.push(new Cube("bush" + i, [100 * Math.random() - 50, -2, 100 * Math.random() - 50], [2, 2, 2], [0.1, 0.7,0.1]));
    grobjects.push(new Pinetree("pinetree" + i, [100 * Math.random() - 50, 0, 100 * Math.random() - 50], [1.0, 1.0, 1.0]));
}

