main();
function main(){
    const canvas = document.querySelector("#glcanvas");
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
        attribute vec4 aVertexColor;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        varying lowp vec4 vColor;

        void main(){
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
            vColor = aVertexColor;
        }
    `;

    //fs eða fragment shader tekur hvern pixel fyrir sig og reiknar út hvaða lit hann á að vera.
    //eftir það þá er honum hent aftur í WebGL layerið og sortaður ofan í variable sem heitir gl_FragColor
    const fsSource = `
        varying lowp vec4 vColor;

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
            vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };
    //hér er rútínan kölluð á yfir því sem ég er að fara teikna
    const buffers = initBuffers(gl);

        //teikna senu
    drawScene(gl, programInfo, buffers);
}

function initBuffers(gl){
    //búa til buffer fyrir kassan sem ég er að fara búa til.
    //þetta að neðan setur mismunandi lit á kassann og bindir hann við buffer.
    
    const colors = [
        1.0,  1.0,  1.0,  1.0,    // hvítur
        1.0,  0.0,  0.0,  1.0,    // rauður
        0.0,  1.0,  0.0,  1.0,    // grænn
        0.0,  0.0,  1.0,  1.0,    // blár
    ];

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    //sett þannig að positionBuffer er það sem bufferinn á að legjast á.
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

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
        color: colorBuffer,
    };
}

function drawScene(gl, programInfo, buffers){
    gl.clearColor(0.0, 0.0, 0.0, 1.0,);     //gerir allt alveg svart
    gl.clearDepth(1.0);                     //hreinsar allt
    gl.enable(gl.DEPTH_TEST);               //enablar deapth testing
    gl.depthFunc(gl.LEQUAL);                //hlutir sem eru nær eru teiknaðir yfir hluti sem eru fjær
    
    //hreinsar canvasinn áður en við byrjum að teikna á hann
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //Búa til perspective matrix, sem er sérstök matrix fyrir myndavélina í senuni.
    //fov-ið er 45 gráður sem segir hversu langt við getum séð í hverja átt.
    const fieldOfView = 45 * Math.PI / 180 //fov er reiknað með radíunum
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;         //segir til um hvaða point er legst og styst frá myndavélinni
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix,
                     fieldOfView,
                     aspect,
                     zNear,
                     zFar);

    const modelViewMatrix = mat4.create();

    mat4.translate(modelViewMatrix,         //destination.
                   modelViewMatrix,         //matrix til þess að þýða.
                   [-0.0, 0.0, -6.0]);      //valuið sem þarf að þýða í.

    //þarf að segja hvernig WebGL á að taka út positionið og buffera því inn í vertexPosition attributið
    {
        const numComponents = 2;        // taka út 2 value í hvert skipti sem það er keyrt
        const type = gl.FLOAT;          //gögnin eru í 32 bita float formi í buffernum
        const normalize = false;        //ekki normaliza
        const stride = 0;               //hversu marga bytes á að taka út úr valuenum
                                        //ef það er núll þá á að nota type of numComponents að ofan
        const offset = 0;               //á hvaða bita á að byrja inn í buffernum
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);

        //basically að initializa með því að nota allt að ofan
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset
        );
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }
    //þetta segir webgl hvernig það á að ná í litina sem voru setting á pixlana inn í initbuffer
    {
        const numComponents = 4;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexColor,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexColor);
    }
    //segir webgl að nota programið þegar það er að teikna.
    gl.useProgram(programInfo.program);

    //setur shader uniform
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix
    );
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix
    );
    {
        const offset = 0;
        const vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
}

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




