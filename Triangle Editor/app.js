canvas = document.getElementById("result");

gl = canvas.getContext("webgl");

if(!gl)
{
    alert("Warning! Your browser does not support WebGL, have to use experimental-webgl");
    gl = canvas.getContext("experimental-webgl")
}

var input1 = document.getElementsByClassName("vert1");

var input2 = document.getElementsByClassName("vert2");

var input3 = document.getElementsByClassName("vert3");

var butt1 = document.getElementById("sub1");
var butt2 = document.getElementById("sub2");
var butt3 = document.getElementById("sub3");

function submit(input, count)
{
    if (count === 1)
    {
        vertex1.x = parseFloat(input[0].value);
        vertex1.y = parseFloat(input[1].value);
        vertex1.z = parseFloat(input[2].value);
    };
    if (count === 2)
    {
        vertex2.x = parseFloat(input[0].value);
        vertex2.y = parseFloat(input[1].value);
        vertex2.z = parseFloat(input[2].value);
    }
    if (count === 3)
    {
        vertex3.x = parseFloat(input[0].value);
        vertex3.y = parseFloat(input[1].value);
        vertex3.z = parseFloat(input[2].value);
    }
}

butt1.addEventListener("click", () => {
    submit(input1, 1);
    console.log(vertexPosition);
});

butt2.addEventListener("click", () => {
    submit(input2, 2);
    console.log(vertexPosition);
})

butt3.addEventListener("click", () => {
    submit(input3, 3);
    console.log(vertexPosition);
})


var vertex1 = 
{
    x: -0.5,
    y: -0.5,
    z:  0.0
};

var vertex2 = 
{
    x:  0.0,
    y:  0.5,
    z:  0.0
};

var vertex3 = 
{
    x:  0.5,
    y: -0.5,
    z:  0.0
};
var vertexPosition = [
    vertex1.x, vertex1.y, vertex1.z,
    vertex2.x, vertex2.y, vertex2.z,
    vertex3.x, vertex3.y, vertex3.z
];

var buffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPosition), gl.STATIC_DRAW);

var vertexShaderText = 
[
    'precision mediump float;',
    'attribute vec3 vertexPosition;',
    'void main () {',
    '   gl_Position = vec4(vertexPosition, 1.0);',
    '}'

].join("\n");

var fragmentShaderText = [
    'precision mediump float;',
    'void main() {',
    'gl_FragColor = vec4(1.0, 0.5, 0.5, 1.0);',
    '}'
].join("\n");

var vertexShader = gl.createShader(gl.VERTEX_SHADER);

var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexShader, vertexShaderText);

gl.shaderSource(fragmentShader, fragmentShaderText);

gl.compileShader(vertexShader);

gl.compileShader(fragmentShader);

var program = gl.createProgram();

gl.attachShader(program, vertexShader);

gl.attachShader(program, fragmentShader);

gl.linkProgram(program);


if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS));
{
    console.error("Error compiling vertex shader", gl.getShaderInfoLog(vertexShader));
}
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS));
{
    console.error("Error compiling fragment shader", gl.getShaderInfoLog(fragmentShader));
}
if(!gl.getProgramParameter(program, gl.LINK_STATUS))
{
    console.error("Error linking program", gl.getProgramInfoLog(program));
}

var positionAttribLocation = gl.getAttribLocation(program, "vertexPosition");

gl.vertexAttribPointer(
    positionAttribLocation, // Attribute location
    3, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    gl.FALSE,
    3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    0 // Offset from the beginning of a single vertex to this attribute
);

gl.enableVertexAttribArray(positionAttribLocation);

var loop = function () {
    gl.clearColor(0.5, 0.75, 0.75, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    vertexPosition = [
        vertex1.x, vertex1.y, vertex1.z,
        vertex2.x, vertex2.y, vertex2.z,
        vertex3.x, vertex3.y, vertex3.z
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPosition), gl.STATIC_DRAW);

    /*gl.vertexAttribPointer(
        positionAttribLocation, // Attribute location
        3, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        0 // Offset from the beginning of a single vertex to this attribute
    );*/

    //gl.enableVertexAttribArray(positionAttribLocation);

    gl.useProgram(program);

    gl.drawArrays(gl.TRIANGLES, 0, 3)

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

function click1 () {

}