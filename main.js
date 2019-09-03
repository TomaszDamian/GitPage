anime({
    targets: '.Top',
    //keyframe segir til hvað á að gerast og í hvaða röð það á að gerast
    keyframes: [
        {translateX: 83, translateY: 90, rotate: 90, background: '#0000ff'},
        {translateX: 0, translateY:166, rotate: 180, background: '#000000'},
        {translateX: -83, translateY: 90, rotate: 270, background: '#ff0000'},
        {translateX: 0, translateY: 0, rotate:360, background: '#000000'}
    ],
    //duration segir hversu lengi það á að taka fyrir ÖLL keyframe að spila
    duration:6500,
    //þegar það endar byrjar það upp á nýtt
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

