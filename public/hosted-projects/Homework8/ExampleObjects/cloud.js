/**
 * Created by Tom on 3/31/2017.
 */

/*
 a second example object for graphics town
 check out "simplest" first

 the cube is more complicated since it is designed to allow making many cubes

 we make a constructor function that will make instances of cubes - each one gets
 added to the grobjects list

 we need to be a little bit careful to distinguish between different kinds of initialization
 1) there are the things that can be initialized when the function is first defined
 (load time)
 2) there are things that are defined to be shared by all cubes - these need to be defined
 by the first init (assuming that we require opengl to be ready)
 3) there are things that are to be defined for each cube instance
 */
var grobjects = grobjects || [];

// allow the two constructors to be "leaked" out
var Cloud = undefined;

// this is a function that runs at loading time (note the parenthesis at the end)
(function () {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    function cubeCords(center, width, height, length) {
        var m4 = twgl.m4;
        var keyx = center[0] - width / 2;
        var keyy = center[1] - height / 2;
        var keyz = center[2] - length / 2;

        var temp = [];

        var rotationMat = m4.axisRotation([0, 1, 0], 0);
        var points = m4.transformPoint(rotationMat, [keyx, keyy, keyz]);
        // Top
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx + width, keyy, keyz + length]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy, keyz + length]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx + width, keyy, keyz + length]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx + width, keyy, keyz]);
        temp.push(points[0], points[1], points[2]);

        // bottom
        points = m4.transformPoint(rotationMat, [keyx, keyy + height, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx + width, keyy + height, keyz + length]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy + height, keyz + length]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy + height, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx + width, keyy + height, keyz + length]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx + width, keyy + height, keyz]);
        temp.push(points[0], points[1], points[2]);

        // side
        points = m4.transformPoint(rotationMat, [keyx, keyy, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy + height, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy + height, keyz + length]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy, keyz + length]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy + height, keyz + length]);
        temp.push(points[0], points[1], points[2]);

        // side
        points = m4.transformPoint(rotationMat, [keyx + width, keyy, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx + width, keyy + height, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx + width, keyy + height, keyz + length]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx + width, keyy, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx + width, keyy, keyz + length]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx + width, keyy + height, keyz + length]);
        temp.push(points[0], points[1], points[2]);

        // front
        points = m4.transformPoint(rotationMat, [keyx + width, keyy, keyz + length]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx + width, keyy + height, keyz + length]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy + height, keyz + length]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx + width, keyy, keyz + length]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy, keyz + length]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy + height, keyz + length]);
        temp.push(points[0], points[1], points[2]);

        // back
        points = m4.transformPoint(rotationMat, [keyx + width, keyy, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx + width, keyy + height, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy + height, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx + width, keyy, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy + height, keyz]);
        temp.push(points[0], points[1], points[2]);

        var normals = [
            0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,
            0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,
            -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
            0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
            0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1

        ];

        return [temp, normals];

    }

    /**
     * Constructor for a Cube object
     * @param name of the cube, used for debugging
     * @param position of format [x, y, z]
     * @param size integer
     * @param color of format [r, g, b]
     */
    Cloud = function Cloud(name, position, size, color, motiondirection, speed) {
        this.name = name;
        this.position = position || [0, 0, 0];
        this.size = size || [1.0, 1.0, 1.0];
        this.color = color || [.8, .8, .8];
        this.motiondirection = motiondirection;
        this.speed = speed;
        this.time;
    };

    Cloud.prototype.init = function (drawingState) {
        var gl = drawingState.gl;
        // borrowing those shaders for a second...
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["cube-vs", "cube-fs"]);
        }
        if (!buffers) {
            var arrays = {
                vpos: {
                    numComponents: 3, data: []
                },
                vnormal: {
                    numComponents: 3, data: []
                }
            };
            var numcubes = parseInt(Math.random() * 10);
            for (var i = 0; i < numcubes; i++ ){
                var cords = cubeCords([this.position[0] + Math.random() * 1.5, this.position[1] + Math.random(), this.position[2] + Math.random()],
                    this.size[0] + Math.random(), this.size[1] + Math.random(), this.size[2] + Math.random());
                for (var t = 0; t < cords[0].length; t++){
                    arrays.vpos.data.push(cords[0][t])
                    arrays.vnormal.data.push(cords[1][t])
                }

            }


            buffers = twgl.createBufferInfoFromArrays(drawingState.gl, arrays);
        }

    };
    Cloud.prototype.draw = function (drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size[0], this.size[1], this.size[2]]);
        if (this.time != drawingState.realtime) {
            this.position[0] += this.motiondirection[0] * this.speed;
            this.position[1] += this.motiondirection[1] * this.speed;
            this.position[2] += this.motiondirection[2] * this.speed;
            this.time = drawingState.realtime;
        }

        if (this.position[0] > 100) {
            this.position[0] = -60
        } else if (this.position[0] < -60) {
            this.position[0] = 100
        }
        if (this.position[1] > 100) {
            this.position[1] = -60
        } else if (this.position[1] < -60) {
            this.position[1] = 100
        }
        if (this.position[2] > 100) {
            this.position[2] = -60
        } else if (this.position[2] < -60) {
            this.position[2] = 100
        }

        twgl.m4.setTranslation(modelM, this.position, modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl, shaderProgram, buffers);
        twgl.setUniforms(shaderProgram, {
            view: drawingState.view, proj: drawingState.proj, lightdir: drawingState.sunDirection,
            cubecolor: this.color, model: modelM
        });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };

    Cloud.prototype.center = function (drawingState) {
        return this.position;
    };

})();
