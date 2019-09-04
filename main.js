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
//base poly points
//70 0 136.574 48.369 111.145 126.631 28.855 126.631 3.426 48.369
/*anime({
    targets: '.Morph',
    points:[
        { value: ['70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369',
            '70 41 118.574 59.369 111.145 132.631 60.855 84.631 20.426 60.369']},
        { value: '70 6 119.574 60.369 100.145 117.631 39.855 117.631 55.426 68.369' },
        { value: '70 57 136.574 54.369 89.145 100.631 28.855 132.631 38.426 64.369' },
        { value: '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369' }
    ],
    easing: 'easeOutQuad',
    duration: 2000,
    loop: true
});*/

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