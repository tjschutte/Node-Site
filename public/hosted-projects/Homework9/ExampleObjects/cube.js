/**
 * Created by gleicher on 10/9/15.
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
var Cube = undefined;
var SpinningCube = undefined;

// this is a function that runs at loading time (note the parenthesis at the end)
(function () {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    /**
     * Constructor for a Cube object
     * @param name of the cube, used for debugging
     * @param position of format [x, y, z]
     * @param size integer
     * @param color of format [r, g, b]
     */
    Cube = function Cube(name, position, size, color) {
        this.name = name;
        this.position = position || [0, 0, 0];
        this.size = size || [1.0, 1.0, 1.0];
        this.color = color || [.7, .8, .9];
    };

    Cube.prototype.init = function (drawingState) {
        var gl = drawingState.gl;
        // create the shaders once - for all cubes
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["cube-vs", "cube-fs"]);
        }
        if (!buffers) {
            var arrays = {
                vpos: {
                    numComponents: 3, data: [
                        -.5, -.5, -.5, .5, -.5, -.5, .5, .5, -.5, -.5, -.5, -.5, .5, .5, -.5, -.5, .5, -.5,    // z = 0
                        -.5, -.5, .5, .5, -.5, .5, .5, .5, .5, -.5, -.5, .5, .5, .5, .5, -.5, .5, .5,    // z = 1
                        -.5, -.5, -.5, .5, -.5, -.5, .5, -.5, .5, -.5, -.5, -.5, .5, -.5, .5, -.5, -.5, .5,    // y = 0
                        -.5, .5, -.5, .5, .5, -.5, .5, .5, .5, -.5, .5, -.5, .5, .5, .5, -.5, .5, .5,    // y = 1
                        -.5, -.5, -.5, -.5, .5, -.5, -.5, .5, .5, -.5, -.5, -.5, -.5, .5, .5, -.5, -.5, .5,    // x = 0
                        .5, -.5, -.5, .5, .5, -.5, .5, .5, .5, .5, -.5, -.5, .5, .5, .5, .5, -.5, .5     // x = 1
                    ]
                },
                vnormal: {
                    numComponents: 3, data: [
                        0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
                        0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                        0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
                        0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
                        -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
                        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0
                    ]
                }
            };
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl, arrays);
        }

    };
    Cube.prototype.draw = function (drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size[0], this.size[1], this.size[2]]);
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

    Cube.prototype.center = function (drawingState) {
        return this.position;
    };


    /**
     * Constructor for spinning cubes
     * @param name of the object
     * @param position of format [x, y, z]
     * @param size of cube
     * @param color of the cube of format [r, g, b]
     * @param axis about which to spin, "X", "Y", or "Z"
     */
    SpinningCube = function SpinningCube(name, position, size, color, axis, speed) {
        Cube.apply(this, arguments);
        this.axis = axis;
        this.speed = speed || 1;
    };

    SpinningCube.prototype = Object.create(Cube.prototype);

    SpinningCube.prototype.draw = function (drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([1, 1, 1]);
        var theta = this.speed * Number(drawingState.realtime) / 200.0;
        twgl.m4.axisRotate(modelM, this.axis, theta, modelM);

        modelM = twgl.m4.multiply(twgl.m4.scaling([this.size[0], this.size[1], this.size[2]]), modelM);
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

    SpinningCube.prototype.center = function (drawingState) {
        return this.position;
    };
})();
