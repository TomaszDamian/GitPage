function main(){
    const canvas = document.querySelector("#glCanvas");
    const gl = canvas.getContext("webgl");
    //það sem er verið að gera hér er að initializa webgl virkni á canvasinn

    //getur ekki haldið áfram ef browserinn supportar ekki WebGL
    if(gl == null){
        alert("Unable to initialize WebGL. Your current browser does not support it");
        return;
    }

    //þetta setur buffer bitann sem alveg svartan og teiknar svo alveg yfir allan canvasinn þegar .clear er kallað
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //vs eða vertex shader er notaður í hvert skipti sem eitthvað er teiknað ofan á canvasinn
    //hann tekur original coordið og breytir því yfir í clipspace coordinate sem WebGL notar 
    const vsSource = ` 
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main(){
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
    `;

    //fs eða fragment shader tekur hvern pixel fyrir sig og reiknar út hvaða lit hann á að vera.
    //eftir það þá er honum hent aftur í WebGL layerið og sortaður ofan í variable sem heitir gl_FragColor
    const fsSource = `
    void main(){
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
    `

    //þetta er til þess að kalla á föllinn og compila öllum shaderum
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    //gert til þess að halda utan um alla shadera og til að gera allt léttara ef það þarf að henda þeim inn á milli hluta.
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        },
        uniformLocations:{
            projectMatrix: gl.getUniformLocation(shaderProgram, 'uProjectMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };
}
window.onload = main;

//
//þar að initializa shadera til þess að þeir virki
//
function initShaderProgram(gl, vsSource, fsSource){
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    //Búa til shader programið
    if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
        alert("unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

//
//búa til shader af ákveðni týpu, uploadar sourcinu og compilar því.
//
function loadShader(gl, type, source){
    //þetta býr til og compilar shaderinn sjálfan og ef eitthvað klikkar þá er sent út villuskilaboð.
    //annars er shaderinn kominn inn í canvasinn
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        alert('An nerror occured during compilation of the shader: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function initBuffers(gl){
    //búa til buffer fyrir kassan sem ég er að fara búa til.
    const positionBuffer = gl.creatBuffer();

    //sett þannig að positionBuffer er það sem bufferinn á að legjast á.
    gl.blindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    //búa til array með púnktum þar sem kassinn á að ver á
    const positions = [
        -1.0,  1.0,
        1.0,  1.0,
        -1.0, -1.0,
        1.0, -1.0,
    ];
    //svo er hleypt þessu array í gegnum Float32Array og yfir á canvasið þar sem bufferinn er svo fylltur.
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW);
    return{
        position: positionBuffer,
    };
}

function drawScene(gl, programInfo, buffers){
    gl.clearColor(0.0, 0.0, 0.0, 1.0,);     //gerir allt alveg svart
    gl.clearDepth(1.0);                     //hreinsar allt
    gl.enable(gl.DEPTH_TEST);               //
    gl.depthFunc(gl.LEQUAL);
}

