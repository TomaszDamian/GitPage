anime({
    targets: '.Top',
    keyframes: [
        {translateX: 83, translateY: 90, rotate: 90, background: '#0000ff'},
        {translateX: 0, translateY:166, rotate: 180, background: '#000000'},
        {translateX: -83, translateY: 90, rotate: 270, background: '#ff0000'},
        {translateX: 0, translateY: 0, rotate:360, background: '#000000'}
    ],
    duration:6500,
    loop: true
});

anime({
    targets: '.Bottom',
    keyframes: [
        {translateX: -83, translateY: -90, rotate: 90, background: '#ff0000'},
        {translateX: 0, translateY: -180, rotate: 180, background: '#ffffff'},
        {translateX: 83, translateY: -90, rotate: 270, background: '#0000ff'},
        {translateX: 0, translateY: 0, rotate: 360, background: '#ffffff'}
    ],
    duration:6500,
    loop: true
});

anime({
    targets:'.Logo',
    keyframes:[
        {borderRadius: '50%'},
        {borderRadius: '0%'}
    ],
    duration:3250,
    loop: true
})

//100,100 150,25 150,75 200,0
anime({
    targets: '.Morph',
    points: [
        { value: '0,40 40,40 40,80 80,80 80,120 120,120 120,160' },
        { value: '100,100 150,25 150,75 200,0' },
        { value: '0,40 40,40 40,80 80,80 80,120 120,120 120,160' }
    ],
    duration: 2500,
    loop: true
});

function GetRandomHex(){
    let Values = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    let string = '';
    for (let i = 0; i < 6; i++) {
        let num = Math.floor(Math.random() * 16);
        string = string + Values[num];
    }
    return string;
}