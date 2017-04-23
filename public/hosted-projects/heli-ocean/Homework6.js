
document.addEventListener( "DOMContentLoaded", function init() {
	start();
});

function start() {
    "use strict";

    // Get canvas, WebGL context, twgl.m4
    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");
    var m4 = twgl.m4;
    noise.seed(Math.random());
    //var width = canvas.wdith;
    //var height = canvas.height;


    var slider = document.getElementById('zoom');
    slider.value = 4;
    var rotation = document.getElementById('rotation');
    rotation.value = 0;
    var cameraHeight = document.getElementById('cameraHeight');
    cameraHeight.value = 150;
    var targetX = document.getElementById('targetX');
    targetX.value = 0;
    var targetY = document.getElementById('targetY');
    targetY.value = 0;
    var targetZ = document.getElementById('targetZ');
    targetZ.value = 0;
    var wireframe = document.getElementById('wireframe');
    wireframe.checked = false;

    var helicopterLoc = [0, 2, -4];

    // Read shader source
    var vertexSourceBody = document.getElementById("vs").text;
    var fragmentSourceBody = document.getElementById("fs").text;

    // Compile vertex shader
    var vertexShaderBody = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderBody, vertexSourceBody);
    gl.compileShader(vertexShaderBody);

    if (!gl.getShaderParameter(vertexShaderBody, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(vertexShaderBody));
        return null;
    }

    // Compile fragment shader
    var fragmentShaderBody = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderBody, fragmentSourceBody);
    gl.compileShader(fragmentShaderBody);

    if (!gl.getShaderParameter(fragmentShaderBody, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(fragmentShaderBody));
        return null;
    }

    // Attach the shaders and link
    var shaderProgramBody = gl.createProgram();
    gl.attachShader(shaderProgramBody, vertexShaderBody);
    gl.attachShader(shaderProgramBody, fragmentShaderBody);
    gl.linkProgram(shaderProgramBody);

    if (!gl.getProgramParameter(shaderProgramBody, gl.LINK_STATUS)) {
        alert("Could not initialize shaders");
    }
    gl.useProgram(shaderProgramBody);

    // with the vertex shader, we need to pass it positions
    // as an attribute - so set up that communication
    shaderProgramBody.PositionAttribute = gl.getAttribLocation(shaderProgramBody, "vPosition");
    gl.enableVertexAttribArray(shaderProgramBody.PositionAttribute);

    shaderProgramBody.ColorAttribute = gl.getAttribLocation(shaderProgramBody, "vColor");
    gl.enableVertexAttribArray(shaderProgramBody.ColorAttribute);

    // this gives us access to the matrix uniform
    /*
     uniform mat3 normalMatrix;
     uniform mat4 modelViewMatrix;
     uniform mat4 projectionMatrix;
     */
    shaderProgramBody.MVPmatrix = gl.getUniformLocation(shaderProgramBody, "uMVP");
    shaderProgramBody.normalMatrix = gl.getUniformLocation(shaderProgramBody, "normalMatrix");
    shaderProgramBody.modelViewMatrix = gl.getUniformLocation(shaderProgramBody, "modelViewMatrix");
    shaderProgramBody.projectionMatrix = gl.getUniformLocation(shaderProgramBody, "projectionMatrix");
    shaderProgramBody.normal = gl.getUniformLocation(shaderProgramBody, "normal");

    function createCube(center, width, height, length, color, vertexPos, vertexColors, currNumT) {
        var keyx = center[0] - width / 2;
        var keyy = center[1] - height / 2;
        var keyz = center[2] - length / 2;
        var numT = 0;

        var temp = [];
        var tempArry = new Float32Array(currNumT + 108);
        for (var i = 0; i < currNumT; i++) {
            tempArry[i] = vertexPos[i];
        }

        //var origin = m4.translate(tModel, center);
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
        points = m4.transformPoint(rotationMat, [keyx + width, keyy + height, keyz + length]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy + height, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx + width, keyy, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy, keyz]);
        temp.push(points[0], points[1], points[2]);
        points = m4.transformPoint(rotationMat, [keyx, keyy + height, keyz]);
        temp.push(points[0], points[1], points[2]);

        // number of triangles
        numT += temp.length / pointsPerT;

        for (var i = 0; i < temp.length; i++) {
            tempArry[currNumT + i] = temp[i];
        }

        var vertexColorsReplacement = new Float32Array(currNumT + 108);
        for (var i = 0; i < currNumT; i++) {
            vertexColorsReplacement[i] = vertexColors[i];
        }
        for (var i = 0; i < 108; i++) {
            vertexColorsReplacement[currNumT + i] = color[0]
            i++;
            vertexColorsReplacement[currNumT + i] = color[1];
            i++;
            vertexColorsReplacement[currNumT + i] = color[2];
        }

        return [tempArry, vertexColorsReplacement, numT + currNumT];

    }

    function drawTerrainLines() {
        var terrainPosArr = [];// = new Float32Array(0);
        var terrainColorArr = [];// = new Float32Array(0);
        var terrainPos;
        var terrainColor;
        var numPoints = 0;

        var cols = 80;
        var rows = 100;
        var scale = 10;

        var xstep = 0;
        var zstep = 0;

        var YVals = [rows];
        for (var z = 0; z < rows; z++) {
            YVals[z] = [];
            for (var x = 0; x < cols - 1; x++) {
                YVals[z].push(noise.simplex2(xstep, zstep + tick));
                xstep += 0.1;
            }
            YVals[z].push(-10);
            zstep += 0.1;
        }

        for (var z = 0; z < rows - 1; z++) {
            for (var x = 0; x < cols; x++) {
                terrainPosArr.push(x, YVals[z][x], z);
                terrainPosArr.push(x, YVals[z+1][x], z + 1);
                numPoints += 2;
            }
        }

        terrainPos = new Float32Array(terrainPosArr.length);
        for (var i = 0; i < terrainPosArr.length; i++) {
            terrainPos[i] = terrainPosArr[i];
        }

        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < cols; x++) {
                terrainColorArr.push(1, 1, 1);
                terrainColorArr.push(1, 1, 1);
            }
        }

        terrainColor = new Float32Array(terrainColorArr.length);
        for (var i = 0; i < terrainColorArr.length; i++) {
            terrainColor[i] = terrainColorArr[i];
        }

        var tmodelterrain = m4.multiply(m4.scaling([scale, scale, scale]), m4.axisRotation([0, 1, 0], 0));
        m4.translate(tmodelterrain, [-(cols / 2), 0, -(rows / 2)], tmodelterrain);

        tCamera = m4.inverse(m4.lookAt(eye, target, up));
        tProjection = m4.perspective(Math.PI / slider.value, 1, 10, renderDist);

        var tMVP = m4.multiply(m4.multiply(tmodelterrain, tCamera), tProjection);

        var terrainPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, terrainPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, terrainPos, gl.STATIC_DRAW);
        // a buffer for colors
        var terrainColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, terrainColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, terrainColor, gl.STATIC_DRAW);

        // Set up uniforms & attributes
        gl.uniformMatrix4fv(shaderProgramBody.MVPmatrix, false, tMVP);

        gl.bindBuffer(gl.ARRAY_BUFFER, terrainColorBuffer);
        gl.vertexAttribPointer(shaderProgramBody.ColorAttribute, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, terrainPosBuffer);
        gl.vertexAttribPointer(shaderProgramBody.PositionAttribute, 3, gl.FLOAT, false, 0, 0);

        // Do the drawing
        gl.drawArrays(gl.LINE_STRIP, 0, numPoints);
    }

    function drawTerrainFill() {
        var terrainFillPosArr = [];// = new Float32Array(0);
        var terrainFillColorArr = [];// = new Float32Array(0);
        var terrainFillPos;
        var terrainFillColor;
        var numPoints = 0;

        var cols = 80;
        var rows = 100;
        var scale = 10;

        var xstep = 0;
        var zstep = 0;

        var YVals = [rows];
        for (var z = 0; z < rows; z++) {
            YVals[z] = [];
            for (var x = 0; x < cols - 1; x++) {
                YVals[z].push(noise.simplex2(xstep, zstep + tick));
                xstep += 0.1;
            }
            YVals[z].push(-10);
            zstep += 0.1;
        }

        for (var z = 0; z < rows - 1; z++) {
            for (var x = 0; x < cols; x++) {
                terrainFillPosArr.push(x, YVals[z][x], z);
                terrainFillPosArr.push(x, YVals[z+1][x], z + 1);

                terrainFillColorArr.push(0.15, 0.15, YVals[z][x] + 0.1);
                terrainFillColorArr.push(0.15, 0.15, YVals[z][x] + 0.1);

                numPoints += 2;
            }
        }

        terrainFillPos = new Float32Array(terrainFillPosArr.length);
        for (var i = 0; i < terrainFillPosArr.length; i++) {
            terrainFillPos[i] = terrainFillPosArr[i];
        }

        terrainFillColor = new Float32Array(terrainFillColorArr.length);
        for (var i = 0; i < terrainFillColorArr.length; i++) {
            terrainFillColor[i] = terrainFillColorArr[i];
        }

        var tmodelterrainFill = m4.multiply(m4.scaling([scale, scale, scale]), m4.axisRotation([0, 1, 0], 0));
        m4.translate(tmodelterrainFill, [-(cols / 2), 0, -(rows / 2)], tmodelterrainFill);

        tCamera = m4.inverse(m4.lookAt(eye, target, up));
        tProjection = m4.perspective(Math.PI / slider.value, 1, 10, renderDist);

        var tMVP = m4.multiply(m4.multiply(tmodelterrainFill, tCamera), tProjection);

        var terrainFillPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, terrainFillPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, terrainFillPos, gl.STATIC_DRAW);
        // a buffer for colors
        var terrainFillColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, terrainFillColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, terrainFillColor, gl.STATIC_DRAW);

        // Set up uniforms & attributes
        gl.uniformMatrix4fv(shaderProgramBody.MVPmatrix, false, tMVP);

        gl.bindBuffer(gl.ARRAY_BUFFER, terrainFillColorBuffer);
        gl.vertexAttribPointer(shaderProgramBody.ColorAttribute, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, terrainFillPosBuffer);
        gl.vertexAttribPointer(shaderProgramBody.PositionAttribute, 3, gl.FLOAT, false, 0, 0);

        // Do the drawing
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, numPoints);
    }

    const pointsPerT = 3;

    // angle to make the object rotate about the y axis
    var theta = 0;

    function drawBody() {
        var vertexPos_Body = new Float32Array(0);
        var vertexColors_body = new Float32Array(0);

        var tmodelHelicopterBody = m4.multiply(m4.scaling([50, 50, 50]), m4.axisRotation([0, 1, 0], 0));

        // Rotate the heli about the world
        m4.translate(tmodelHelicopterBody, [helicopterLoc[0], helicopterLoc[1] + height, helicopterLoc[2]], tmodelHelicopterBody);
        m4.multiply(tmodelHelicopterBody, m4.axisRotation([0, 1, 0], theta / 4), tmodelHelicopterBody);

        var normalMatrix = m4.inverse(m4.transpose(tmodelHelicopterBody));

        tCamera = m4.inverse(m4.lookAt(eye, target, up));
        tProjection = m4.perspective(Math.PI / slider.value, 1, 10, renderDist);

        var tMVP = m4.multiply(m4.multiply(tmodelHelicopterBody, tCamera), tProjection);

        // grey cube body
        var cap = createCube([0, 0, 0], 0.75, 0.5, 0.4, [.5, .5, .5], 0, [0, 1, 0], vertexPos_Body, vertexColors_body, 0);
        vertexPos_Body = cap[0];
        vertexColors_body = cap[1];

        var trianglePosBuffer_Body = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer_Body);
        gl.bufferData(gl.ARRAY_BUFFER, vertexPos_Body, gl.STATIC_DRAW);
        // a buffer for colors
        var colorBuffer_Body = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_Body);
        gl.bufferData(gl.ARRAY_BUFFER, vertexColors_body, gl.STATIC_DRAW);

        // Set up uniforms & attributes
        gl.uniformMatrix4fv(shaderProgramBody.MVPmatrix, false, tMVP);
        gl.uniformMatrix4fv(shaderProgramBody.normalMatrix, false, normalMatrix);
        gl.uniformMatrix4fv(shaderProgramBody.modelViewMatrix, false, tmodelHelicopterBody);
        gl.uniformMatrix4fv(shaderProgramBody.projectionMatrix, false, tProjection);

        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_Body);
        gl.vertexAttribPointer(shaderProgramBody.ColorAttribute, pointsPerT, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer_Body);
        gl.vertexAttribPointer(shaderProgramBody.PositionAttribute, pointsPerT, gl.FLOAT, false, 0, 0);

        // Do the drawing
        gl.drawArrays(gl.TRIANGLES, 0, 36);
    }

    function drawTail() {
        var vertexPos_Tail = new Float32Array(0);
        var vertexColors_Tail = new Float32Array(0);

        var tmodelHelicopterTail = m4.multiply(m4.scaling([50, 50, 50]), m4.axisRotation([0, 1, 0], 0));

        // Rotate the heli about the world
        m4.translate(tmodelHelicopterTail, [helicopterLoc[0] + 0.75, helicopterLoc[1] + 0.125 + height, helicopterLoc[2]], tmodelHelicopterTail);
        m4.multiply(tmodelHelicopterTail, m4.axisRotation([0, 1, 0], theta / 4), tmodelHelicopterTail);

        var normalMatrix = m4.inverse(m4.transpose(tmodelHelicopterTail));

        tCamera = m4.inverse(m4.lookAt(eye, target, up));
        tProjection = m4.perspective(Math.PI / slider.value, 1, 10, renderDist);

        var tMVP = m4.multiply(m4.multiply(tmodelHelicopterTail, tCamera), tProjection);

        // grey cube body
        var cap = createCube([0,0,0], 0.75, 0.1, 0.1, [.5, .5, .5], 0, [0, 1, 0], vertexPos_Tail, vertexColors_Tail, 0);
        vertexPos_Tail = cap[0];
        vertexColors_Tail = cap[1];

        var trianglePosBuffer_Tail = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer_Tail);
        gl.bufferData(gl.ARRAY_BUFFER, vertexPos_Tail, gl.STATIC_DRAW);
        // a buffer for colors
        var colorBuffer_Tail = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_Tail);
        gl.bufferData(gl.ARRAY_BUFFER, vertexColors_Tail, gl.STATIC_DRAW);
        // Set up uniforms & attributes
        gl.uniformMatrix4fv(shaderProgramBody.MVPmatrix, false, tMVP);
        gl.uniformMatrix4fv(shaderProgramBody.normalMatrix, false, normalMatrix);
        gl.uniformMatrix4fv(shaderProgramBody.modelViewMatrix, false, tmodelHelicopterTail);
        gl.uniformMatrix4fv(shaderProgramBody.projectionMatrix, false, tProjection);

        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_Tail);
        gl.vertexAttribPointer(shaderProgramBody.ColorAttribute, pointsPerT, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer_Tail);
        gl.vertexAttribPointer(shaderProgramBody.PositionAttribute, pointsPerT, gl.FLOAT, false, 0, 0);

        // Do the drawing
        gl.drawArrays(gl.TRIANGLES, 0, 36);
    }

    function drawMainRotor() {
        var vertexPos_MainRotor = new Float32Array(0);
        var vertexColors_MainRotor = new Float32Array(0);

        var tmodelHelicopterMainRotor = m4.multiply(m4.scaling([50, 50, 50]), m4.axisRotation([0, 1, 0], 0));

        // Rotate the heli about the world
        m4.translate(tmodelHelicopterMainRotor, [helicopterLoc[0], helicopterLoc[1] + .26 + height, helicopterLoc[2]], tmodelHelicopterMainRotor);
        m4.multiply(tmodelHelicopterMainRotor, m4.axisRotation([0, 1, 0], theta / 4), tmodelHelicopterMainRotor);

        // Rotate the blades
        m4.multiply(m4.axisRotation([0,1,0], theta), tmodelHelicopterMainRotor, tmodelHelicopterMainRotor);

        var normalMatrix = m4.inverse(m4.transpose(tmodelHelicopterMainRotor));

        tCamera = m4.inverse(m4.lookAt(eye, target, up));
        tProjection = m4.perspective(Math.PI / slider.value, 1, 10, renderDist);

        var tMVP = m4.multiply(m4.multiply(tmodelHelicopterMainRotor, tCamera), tProjection);

        // grey cube body
        var cap = createCube([0,0,0], 1.75, 0.01, 0.1, [.05, .05, .05], theta, [0, 1, 0], vertexPos_MainRotor, vertexColors_MainRotor, 0);
        vertexPos_MainRotor = cap[0];
        vertexColors_MainRotor = cap[1];

        var trianglePosBuffer_MainRotor = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer_MainRotor);
        gl.bufferData(gl.ARRAY_BUFFER, vertexPos_MainRotor, gl.STATIC_DRAW);
        // a buffer for colors
        var colorBuffer_MainRotor = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_MainRotor);
        gl.bufferData(gl.ARRAY_BUFFER, vertexColors_MainRotor, gl.STATIC_DRAW);
        // Set up uniforms & attributes
        gl.uniformMatrix4fv(shaderProgramBody.MVPmatrix, false, tMVP);
        gl.uniformMatrix4fv(shaderProgramBody.normalMatrix, false, normalMatrix);
        gl.uniformMatrix4fv(shaderProgramBody.modelViewMatrix, false, tmodelHelicopterMainRotor);
        gl.uniformMatrix4fv(shaderProgramBody.projectionMatrix, false, tProjection);

        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_MainRotor);
        gl.vertexAttribPointer(shaderProgramBody.ColorAttribute, pointsPerT, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer_MainRotor);
        gl.vertexAttribPointer(shaderProgramBody.PositionAttribute, pointsPerT, gl.FLOAT, false, 0, 0);

        // Do the drawing
        gl.drawArrays(gl.TRIANGLES, 0, 36);
    }

    function drawTailRotor() {
        var vertexPos_TailRotor = new Float32Array(0);
        var vertexColors_TailRotor = new Float32Array(0);

        var tmodelHelicopterTailRotor = m4.multiply(m4.scaling([50, 50, 50]), m4.axisRotation([0, 1, 0], 0));

        // Rotate the heli about the world
        m4.translate(tmodelHelicopterTailRotor, [helicopterLoc[0] + 1.06, helicopterLoc[1] + .15 + height, helicopterLoc[2] + 0.05], tmodelHelicopterTailRotor);
        m4.multiply(tmodelHelicopterTailRotor, m4.axisRotation([0, 1, 0], theta / 4), tmodelHelicopterTailRotor);

        var normalMatrix = m4.inverse(m4.transpose(tmodelHelicopterTailRotor));

        tmodelHelicopterTailRotor = m4.multiply(m4.axisRotation([0,0,1], theta * 2), tmodelHelicopterTailRotor);
        tCamera = m4.inverse(m4.lookAt(eye, target, up));
        tProjection = m4.perspective(Math.PI / slider.value, 1, 10, renderDist);

        var tMVP = m4.multiply(m4.multiply(tmodelHelicopterTailRotor, tCamera), tProjection);

        // grey cube body
        var cap = createCube([0, 0, 0], .05, 0.5, 0.01, [.05, .05, .05], 0, [0, 0, 1], vertexPos_TailRotor, vertexColors_TailRotor, 0);
        vertexPos_TailRotor = cap[0];
        vertexColors_TailRotor = cap[1];

        var trianglePosBuffer_TailRotor = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer_TailRotor);
        gl.bufferData(gl.ARRAY_BUFFER, vertexPos_TailRotor, gl.STATIC_DRAW);
        // a buffer for colors
        var colorBuffer_TailRotor = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_TailRotor);
        gl.bufferData(gl.ARRAY_BUFFER, vertexColors_TailRotor, gl.STATIC_DRAW);
        // Set up uniforms & attributes
        gl.uniformMatrix4fv(shaderProgramBody.MVPmatrix, false, tMVP);
        gl.uniformMatrix4fv(shaderProgramBody.normalMatrix, false, normalMatrix);
        gl.uniformMatrix4fv(shaderProgramBody.modelViewMatrix, false, tmodelHelicopterTailRotor);
        gl.uniformMatrix4fv(shaderProgramBody.projectionMatrix, false, tProjection);

        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_TailRotor);
        gl.vertexAttribPointer(shaderProgramBody.ColorAttribute, pointsPerT, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer_TailRotor);
        gl.vertexAttribPointer(shaderProgramBody.PositionAttribute, pointsPerT, gl.FLOAT, false, 0, 0);

        // Do the drawing
        gl.drawArrays(gl.TRIANGLES, 0, 36);
    }

    var eye;
    var target;
    var up;
    var tCamera;
    var tProjection;
    var carZ = -3;

    var renderDist = 2000;

    var angle = 0;

    var frames = 0.0;
    var start;
    var end;
    var height = 0;
    var dir = -0.01;
    var tick = 0;

    // Scene draw routine
    function draw() {
        start = new Date().getTime();

        // Clear screen, prepare for rendering
        gl.clearColor(0.53, .808, 0.98, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        eye = [300 * Math.sin(rotation.value * (Math.PI / 180)), cameraHeight.value, 600.0 * Math.cos(rotation.value * (Math.PI / 180))];
        target = [targetX.value, targetY.value, targetZ.value + 2];
        up = [0, 1, 0];

        drawBody();
        drawTail();
        drawMainRotor();
        drawTailRotor();
        if (!wireframe.checked) {
            drawTerrainFill();
        } else {
            drawTerrainLines();
        }

        theta += 0.1; // rotate the object about y axis
        angle += 0.01;
        height += dir;

        if (height > 0.5) {
            dir = -0.01;
        }
        if (height < -0.5) {
            dir = 0.01;
        }

        carZ += 0.1;
        if (carZ > 10) {
            carZ = -10;
        }

        end = new Date().getTime();

        frames = 1000 / ((end - start) + 1); // make so it doesnt go to infinity

        var fps = document.getElementById('fps');
        fps.innerText = "Approximate framerate: " + frames;

        //drawTerrainLines();
        drawTerrainFill();
        tick += 0.01;
        window.requestAnimationFrame(draw);
    }

    draw();
}
