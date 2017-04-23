/**
 * Created by Tom on 3/28/2017.
 */

// p5.js require these to be present. I'm not actually using the lib to render anything, I just want their noise function
// and their map function
function setup() { /* nothing here */
}
function draw() { /* nothing here */
}

//                       name            position   [scale x, y, z]  color [r, g, b]
//grobjects.push(new Cube("Windmill1Tower", [5, 2, -10], [4, 12, 4],     [1,0.9,0]));
//  TexBox(name, position, size, color, height, rCenter, angle, imagesrc) {
//grobjects.push(new TexBox("Windmill1Tower", [5, 2, -10], [4, 12, 4], [1,1,1], null, null, null, windmilltexture));
grobjects.push(new BumpCube("bumpmap windmill", [5, 2, -10], [4, 12, 4], [1,1,1], null, null, 0, [0,1,0], brick, brickNormal));
grobjects.push(new Cube("Windmill1Axix",  [4, 7, -10], [4, 1, 1],      [0.1,0.1,0.1]));

//                       name                    position   [scale x, y, z]   color [r, g, b], axis of rotation [x, y, z]   speed
grobjects.push(new SpinningCube("Windmill1blade1",[2, 7, -10], [0.5, 15, 1],       [1,1,1],         [1,0,0],                 0.25));
grobjects.push(new SpinningCube("Windmill1blade2",[2, 7, -10], [0.5, 1, 15],       [1,1,1],         [1,0,0],                 0.25));

//                       name            position   [scale x, y, z]  color [r, g, b]
grobjects.push(new TexBox("Windmill2Tower", [-5, 2, 10], [4, 12, 4],     [1,1,1], null, null, null, windmilltexture));
grobjects.push(new Cube("Windmill2Axix",  [-6, 7, 10], [4, 1, 1],      [0.1,0.1,0.1]));

//                       name                    position   [scale x, y, z]   color [r, g, b], axis of rotation [x, y, z]   speed
grobjects.push(new SpinningCube("Windmill2blade1",[-8, 7, 10], [0.5, 15, 1],       [1,1,1],         [1,0,0],                 0.24));
grobjects.push(new SpinningCube("Windmill2blade2",[-8, 7, 10], [0.5, 1, 15],       [1,1,1],         [1,0,0],                 0.24));

//                       name            position   [scale x, y, z]  color [r, g, b]
grobjects.push(new TexBox("Windmill3Tower", [8, 2, -25], [4, 12, 4],     [1,1,1], null, null, null, windmilltexture));
grobjects.push(new Cube("Windmill3Axix",  [7, 7, -25], [4, 1, 1],      [0.1,0.1,0.1]));

//                       name                    position   [scale x, y, z]   color [r, g, b], axis of rotation [x, y, z]   speed
grobjects.push(new SpinningCube("Windmill3blade1",[5, 7, -25], [0.5, 15, 1],       [1,1,1],         [1,0,0],                 0.26));
grobjects.push(new SpinningCube("Windmill3blade2",[5, 7, -25], [0.5, 1, 15],       [1,1,1],         [1,0,0],                 0.26));

grobjects.push(new SkyBox("skybox", [0, 25, 0], [80, 80, 80], [1,1,1], null, null, null, skyimg));

grobjects.push(new SpinningMetalCube("metal", [-8, 0, 0], [3, 3, 3], [0.2, 0.2, 0.2], [1,1,0], 0.1));

grobjects.push(new MetalCube("metal", [-10, 0, -2], [3, 3, 3], [0.2, 0.2, 0.2]));

// Cloud(name, position, size, color, motiondirection, speed)
var numclouds = parseInt(Math.random() * 300);
for (var i = numclouds; i > 0; i--) {
    grobjects.push(new Cloud("cloud" + i, [(numclouds / 2) - Math.random() * i, 8 + Math.random() * 2, (numclouds / 2) - Math.random() * i], [1, 1, 1], [1, 1, 1], [1, 0, 0], 0.05 * Math.random() + 0.05));
}

var numtrees = parseInt(Math.random() * 50) + 10;
for (var i = numtrees; i > 0; i--) {
    grobjects.push(new Tree("tree" + i, [100 * Math.random() - 50, -0.5, 100 * Math.random() - 50], [1.5, 1.3, 1.5]));
}

for (var i = numtrees; i > 0; i--) {
    grobjects.push(new TexBox("bush" + i, [100 * Math.random() - 50, -0.5, 100 * Math.random() - 50], [2, 2, 2], [1,1,1], null, null, null, bushtexture));
    grobjects.push(new Pinetree("pinetree" + i, [100 * Math.random() - 50, -0.5, 100 * Math.random() - 50], [1.0, 1.0, 1.0]));
}

grobjects.push(new BumpCube("bumpmap texturing example2", [-4, 0, 0], [2, 2, 2], [0.0,0.0,0], null, null, 0, [0,1,0], placeholdertexture, normalRandBumps));
grobjects.push(new BumpCube("bumpmap texturing example", [4, 0, 0], [2, 2, 2], [0,0,0], null, null, 0, [0,1,0], brick, brickNormal));
//grobjects.push(new BumpCube("tex2", [-2, 0, 0], [2, 2, 2], [1,1,1], null, null, 0, [0,1,0], null, stardecal));
//grobjects.push(new BumpCube("tex1", [2, 0, 0], [2, 2, 2], [1,1,1], null, null, 0, [0,1,0], brick, null));
//grobjects.push(new BumpCube("DecalTexturing", [0, 0, 0], [2, 2, 2], [1,1,1], null, null, 0, [0,1,0], brick, stardecal));
grobjects.push(new DecalCube("DecalTexturing1", [0, 0, 0], [2, 2, 2], [1,1,1], null, null, 0, [0,1,0], brick, bushtexture, stardecal));
grobjects.push(new DecalCube("DecalTexturing2", [2, 0, 0], [2, 2, 2], [1,1,1], null, null, 0, [0,1,0], skytexture, brick, stardecal));
grobjects.push(new DecalCube("DecalTexturing3", [-2, 0, 0], [2, 2, 2], [1,1,1], null, null, 0, [0,1,0], brick, bushtexture, swirldecal));
grobjects.push(new DecalCube("DecalTexturing4", [0, 0, 5], [2, 2, 2], [1,1,1], null, null, 0, [0,1,0], brick, skytexture, stardecal));
