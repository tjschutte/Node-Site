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
var TexBox = undefined;

(function() {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;

    // constructor for TexBoxs
    TexBox = function TexBox(name, position, size, color, height, rCenter, angle, imagesrc) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || [1.0, 1.0, 1.0];
        this.height = height || 1.0;
        this.angle = angle || 0;
        this.rCenter = rCenter || [0,0,0];
        this.color = color || [.7,.8,.9];
        this.buffers = undefined;
        this.image = new Image();
        this.image.crossOrigin = 'anonymous';
        this.image.src = imagesrc;

        this.texture = undefined;
    };
    TexBox.prototype.init = function(drawingState) {
        var gl=drawingState.gl;
        // create the shaders once - for all cubes
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["ground-vs", "ground-fs"]);
        }

        //create data for bottom of TexBox
        var posData = [];
        var normData = [];
        var colorData = [];
        var textureData = [];

        //create data for cylinder of TexBox
        posData = posData.concat(buildCube(-.5, .5, -.5, .5, -.5, .5));
        normData = normData.concat(cubeNormal());
        textureData = textureData.concat(cubeTexture());

        while(colorData.length < posData.length) {
            colorData.push(this.color[0], this.color[1], this.color[2]);
        }

        var arrays = {
            vpos : { numComponents: 3, data: posData },
            vnormal : {numComponents:3, data: normData},
            vtexcoord : {numComponents:2, data: textureData}
        };
        this.buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);

        this.texture = createGLTexture(gl, this.image, false);

    };
    TexBox.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size[0],this.size[1],this.size[2]]);
        //twgl.m4.setTranslation(modelM,this.position,modelM);

        //rotate the face
        twgl.m4.setTranslation(modelM,this.position,modelM);
        twgl.m4.translate(modelM,this.rCenter,modelM);
        twgl.m4.rotateY(modelM, this.angle, modelM);
        twgl.m4.translate(modelM,[-1*this.rCenter[0],-1*this.rCenter[1],-1*this.rCenter[2]],modelM);

        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,this.buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            model: modelM, uSampler: this.texture });

        twgl.drawBufferInfo(gl, gl.TRIANGLES, this.buffers);
    };
    TexBox.prototype.center = function(drawingState) {
        return this.position;
    }

    //utility function to create cubes
    function buildCube(left, right, bottom, cTop, back, front) {
        var positions = [];
        positions.push(
            left,bottom,back,  right,bottom,back,  right,cTop,back,        left,bottom,back,  right,cTop,back, left,cTop,back,    // z = 0
            left,bottom, front,  right,bottom, front,  right,cTop,front,        left,bottom,front,  right,cTop,front, left,cTop,front,    // z = 1
            left,bottom,back,  right,bottom,back,  right,bottom, front,        left,bottom,back,  right,bottom,front, left,bottom,front,    // y = 0
            left, cTop,back,  right,cTop,back,  right,cTop,front,        left,cTop,back,  right,cTop,front, left,cTop,front,    // y = 1
            left,bottom,back, left,cTop,back, left,cTop,front,        left,bottom,back, left,cTop,front, left,bottom,front,    // x = 0
            right,bottom,back,  right,cTop,back,  right,cTop, front,         right,bottom,back,  right,cTop,front,  right,bottom,front     // x = 1
        );
        return positions;
    }

    function cubeNormal() {
        var normals = [];
        normals.push(0,0,-1, 0,0,-1, 0,0,-1,     0,0,-1, 0,0,-1, 0,0,-1,
            0,0,1, 0,0,1, 0,0,1,        0,0,1, 0,0,1, 0,0,1,
            0,-1,0, 0,-1,0, 0,-1,0,     0,-1,0, 0,-1,0, 0,-1,0,
            0,1,0, 0,1,0, 0,1,0,        0,1,0, 0,1,0, 0,1,0,
            -1,0,0, -1,0,0, -1,0,0,     -1,0,0, -1,0,0, -1,0,0,
            1,0,0, 1,0,0, 1,0,0,        1,0,0, 1,0,0, 1,0,0);
        return normals;
    }

    function cubeTexture() {
        var texCoords = [];
        texCoords.push(
            0,0,  1,0,  1,1,        0,0,  1,1, 0,1,    // z = 0
            0,0,  1,0,  1,1,        0,0,  1,1, 0,1,    // z = 1
            0,0,  1,0,  1,1,        0,0,  1,1, 0,1,    // y = 0
            0,0,  1,0,  1,1,        0,0,  1,1, 0,1,    // y = 1
            0,0,  1,0,  1,1,        0,0,  1,1, 0,1,    // x = 0
            0,0,  1,0,  1,1,        0,0,  1,1, 0,1     // x = 1
        );
        return texCoords;
    }

    var createGLTexture = function (gl, image, flipY) {
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        if(flipY){
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,  gl.LINEAR);
        // Prevents s-coordinate wrapping (repeating).
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        // Prevents t-coordinate wrapping (repeating).
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
        return texture;
    }
})();