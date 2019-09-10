anime({
    targets: '.Top',
    //keyframes segja til um hvað á að gera og í hvaða röð
    keyframes: [
        {translateX: 83, translateY: 90, rotate: 90, background: '#0000ff'},
        {translateX: 0, translateY:166, rotate: 180, background: '#000000'},
        {translateX: -83, translateY: 90, rotate: 270, background: '#ff0000'},
        {translateX: 0, translateY: 0, rotate:360, background: '#000000'}
    ],
    //duration segir hversu hratt allt á að gerast og loop hvort það á að endurtakast
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

anime({
    targets: '.Morph',
    //virkar eigninlega eins og keyframes, breytir gildinu þangað til það er orðið eins og það segir að neðan
    points: [
        { value: '0,0 200,200 100,45 100,155 0,0' },
        { value: '0,50 200,50 200,150 0,150 0,50' },
        { value: '0,200 200,0 100,155, 100,45 0,200' },
        { value: '0,50 200,50 200,150 0,150 0,50' },
    ],
    //easing er bara hvernig animationið á að líta út
    easing:'linear',
    duration: 8500,
    loop: true
});