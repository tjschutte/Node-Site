/**
 * Created by Yusef.
 */

/**
 A Very Simple Textured Plane using native WebGL.

 Notice that it is possible to only use twgl for math.

 Also, due to security restrictions the image was encoded as a Base64 string.
 It is very simple to use somthing like this (http://dataurl.net/#dataurlmaker) to create one
 then its as simple as
 var image = new Image()
 image.src = <base64string>


 **/

var grobjects = grobjects || [];

(function () {
    "use strict";

    var vertexSource = "" +
        "precision highp float;" +
        "attribute vec3 aPosition;" +
        "attribute vec2 aTexCoord;" +
        "attribute vec3 vnormal;" +
        "varying vec2 vTexCoord;" +
        "uniform mat4 pMatrix;" +
        "uniform mat4 vMatrix;" +
        "uniform mat4 mMatrix;" +
        "uniform vec3 lightdir;" +
        "void main(void) {" +
        //"vec4 normal = normalize(model * vec4(vnormal,0.0));" +
        //"float diffuse = .5 + .5*abs(dot(normal, vec4(lightdir,0.0)));" +
        "gl_Position = pMatrix * vMatrix * mMatrix * vec4(aPosition, 1.0);" +
        "vTexCoord = aTexCoord;" +
        //"outColor = diffuse;"
        "}";

    var fragmentSource = "" +
        "precision highp float;" +
        "varying vec2 vTexCoord;" +
        "uniform sampler2D uTexture;" +
        "void main(void) {" +
        "  gl_FragColor = texture2D(uTexture, vTexCoord);" +
        "}";


    //useful util function to simplify shader creation. type is either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
    var createGLShader = function (gl, type, src) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log("warning: shader failed to compile!")
            console.log(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    };

    //see above comment on how this works.
    var image = new Image();
    // Done like this so I could collapse it and the editor would go faster
    {
        image.src = "data:image/jpeg;base64,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";
    }
    image.crossOrigin = "anonymous";

    //useful util function to return a glProgram from just vertex and fragment shader source.
    var createGLProgram = function (gl, vSrc, fSrc) {
        var program = gl.createProgram();
        var vShader = createGLShader(gl, gl.VERTEX_SHADER, vSrc);
        var fShader = createGLShader(gl, gl.FRAGMENT_SHADER, fSrc);
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.log("warning: program failed to link");
            return null;

        }
        return program;
    };

    //creates a gl buffer and unbinds it when done.
    var createGLBuffer = function (gl, data, usage) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, usage);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return buffer;
    };

    var findAttribLocations = function (gl, program, attributes) {
        var out = {};
        for (var i = 0; i < attributes.length; i++) {
            var attrib = attributes[i];
            out[attrib] = gl.getAttribLocation(program, attrib);
        }
        return out;
    };

    var findUniformLocations = function (gl, program, uniforms) {
        var out = {};
        for (var i = 0; i < uniforms.length; i++) {
            var uniform = uniforms[i];
            out[uniform] = gl.getUniformLocation(program, uniform);
        }
        return out;
    };

    var enableLocations = function (gl, attributes) {
        for (var key in attributes) {
            var location = attributes[key];
            gl.enableVertexAttribArray(location);
        }
    };

    //always a good idea to clean up your attrib location bindings when done. You wont regret it later.
    var disableLocations = function (gl, attributes) {
        for (var key in attributes) {
            var location = attributes[key];
            gl.disableVertexAttribArray(location);
        }
    };

    //creates a gl texture from an image object. Sometimes the image is upside down so flipY is passed to optionally flip the data.
    //it's mostly going to be a try it once, flip if you need to.
    var createGLTexture = function (gl, image, flipY) {
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        if (flipY) {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        // Option 1 : Use mipmap, select interpolation mode
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        return texture;
    };

    var TexturedPlane = function () {
        this.name = "Plane";
        this.position = new Float32Array([0, 0, 0]);
        this.scale = new Float32Array([1, 1]);
        this.program = null;
        this.attributes = null;
        this.uniforms = null;
        this.buffers = [null, null, null];
        this.texture = null;
        this.cols = 1000;
        this.rows = 1000;
        this.tick = 0;
        this.numpoints = null;
        this.terrain = [this.rows];
    };

    TexturedPlane.prototype.init = function (drawingState) {
        var gl = drawingState.gl;

        this.program = createGLProgram(gl, vertexSource, fragmentSource);
        this.attributes = findAttribLocations(gl, this.program, ["aPosition", "aTexCoord"]);
        this.uniforms = findUniformLocations(gl, this.program, ["pMatrix", "vMatrix", "mMatrix", "uTexture"]);

        this.texture = createGLTexture(gl, image, true);

        var terrainPosArr = [];
        var terrainColorArr = [];
        var normals = [];
        var normalsFloat;
        var terrainPos;
        var terrainColor;
        var numPoints = 0;

        var scale = 0.05;
        var ystep = 0;

        for (var z = 0; z < this.rows; z++) {
            this.terrain[z] = [];
            var xstep = 0;
            for (var x = 0; x < this.cols - 1; x++) {
                this.terrain[z].push(map(noise(xstep, ystep), 0, 1, -4, 4));
                xstep += scale;
            }
            this.terrain[z].push(-100000);
            ystep += scale;
        }

        for (var z = 0; z < this.rows - 1; z++) {
            for (var x = 0; x < this.cols; x++) {
                terrainPosArr.push(x, this.terrain[z][x], z);
                terrainPosArr.push(x, this.terrain[z + 1][x], z + 1);
                numPoints += 2;
            }
        }

        //normalsFloat = new Float32Array(normals.length);
        normals.push(0,0,0,0,0,0); // first two points.
        for (var i = 0; i < terrainPosArr.length; i += 9) {
            var p1 = [terrainPosArr[i], terrainPosArr[i + 1], terrainPosArr[i + 2]];
            var p2 = [terrainPosArr[i + 3], terrainPosArr[i + 4], terrainPosArr[i + 5]];
            var p3 = [terrainPosArr[i + 6], terrainPosArr[i + 7], terrainPosArr[i + 8]];
            var u = twgl.v3.subtract(p2, p1);
            var v = twgl.v3.subtract(p3, p1);
            var nx, ny, nz;
            nx = (u[1] * v[2]) - (u[2] * v[1]);
            ny = (u[2] * v[0]) - (u[0] * v[2]);
            nz = (u[0] * v[1]) - (u[1] * v[0]);
            normals.push(nx, ny, nz);
        }
        normals.push(0,0,0,0,0,0); // last two two points.

        normalsFloat = new Float32Array(normals.length);
        for (var i = 0; i < normals.length; i++){
            normalsFloat[i] = normals[i];
        }

        terrainPos = new Float32Array(terrainPosArr.length);
        for (var i = 0; i < terrainPosArr.length; i++) {
            terrainPos[i] = terrainPosArr[i];
        }
        normalsFloat = new Float32Array(normals.length);
        for (var i = 2; i < normals.length; i++) {
            normalsFloat[i] = normals[i];
        }

        // Calculate the texture position, this just makes it repeat over and over
        for (var y = 0; y < this.rows - 1; y++) {
            for (var x = 0; x < this.cols - 1; x++) {
                terrainColorArr.push(0, 0);
                terrainColorArr.push(0, 1);
                terrainColorArr.push(1, 0);
                terrainColorArr.push(1, 1);
            }
        }

        terrainColor = new Float32Array(terrainColorArr.length);
        for (var i = 0; i < terrainColorArr.length; i++) {
            terrainColor[i] = terrainColorArr[i];
        }


        // bind the positions / colors / normals
        this.buffers[0] = createGLBuffer(gl, terrainPos, gl.STATIC_DRAW);
        this.buffers[1] = createGLBuffer(gl, terrainColor, gl.STATIC_DRAW);
        //this.buffers[2] = createGLBuffer(gl, normalsFloat, gl.STATIC_DRAW);

        this.numpoints = numPoints;
    };

    TexturedPlane.prototype.center = function () {
        return this.position;
    };

    TexturedPlane.prototype.draw = function (drawingState) {
        var gl = drawingState.gl;

        gl.useProgram(this.program);
        gl.disable(gl.CULL_FACE);

        var modelM = twgl.m4.scaling([this.scale[0], this.scale[1], 1]);
        twgl.m4.setTranslation(modelM, [-(this.cols / 2), -3, -(this.rows / 2)], modelM);

        gl.uniformMatrix4fv(this.uniforms.pMatrix, gl.FALSE, drawingState.proj);
        gl.uniformMatrix4fv(this.uniforms.vMatrix, gl.FALSE, drawingState.view);
        gl.uniformMatrix4fv(this.uniforms.mMatrix, gl.FALSE, modelM);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(this.uniforms.uTexture, 0);

        enableLocations(gl, this.attributes);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[0]);
        gl.vertexAttribPointer(this.attributes.aPosition, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[1]);
        gl.vertexAttribPointer(this.attributes.aTexCoord, 2, gl.FLOAT, false, 0, 0);

        //gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[2]);
        //gl.vertexAttribPointer(this.attributes.vnormal, 3, gl.FLOAT, false, 0, 0);


        gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.numpoints);

        disableLocations(gl, this.attributes);
    };

    var plane = new TexturedPlane();

    grobjects.push(plane);


})();