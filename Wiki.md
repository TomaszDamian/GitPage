Game is pretty simple, you're that small ball moving around using wasd doing your best to avoide the big balls that come flying your way, then if the line that appears at the bottom hits a certain height you win.
you have a visable life and time counter to the side and you can also see the controls, you can restart the game the only thing I was struggling with really was how to make the ball not spawn right on top of you.
I wanted to implement a dash for the player which just increased his speed by x amount for y seconds and has a cooldown of z seconds but I could never get the cooldowns to really work for me so I just gave up.

also one thing that I'm not really happy about is the code on line 264-273 which is the seconds that pass
```javascript
let SecondPassed = function(){
    //called by a setInterval which calls something every x ms, 1000 ms in this case
    //time to spawn always gets reset when a new ball is placed
    timeToSpawn ++;
    //if the User is still alive then you should update the timer that is visable to the side
    if(User.life > 0){
        totalTime ++;
        document.getElementById("ScoreContainer").innerHTML = "Time survived: " + totalTime;
    }
}

setInterval(SecondPassed,1000);
```
I honestly dislike this code mainly because I never could figure out how to clear the interval and start it again, I have played with it before but I never really got the answer to that question.
this works but it's very situational. What I really need to do though is clear out the code and make a visable pattern with it, It's already way cleaner than any of the previous things I've done but I'm still not quite happy with the cleanness of it


Thanks to Arne https://github.com/enra4
```javascript
const counterino = () => {
    const interval = setInterval(() => {
        if (User.life === 0) clearInterval(interval)
        timeToSpawn++
        totalTime++
        document.getElementById("ScoreContainer").innerHTML = "Time survived: " + totalTime;
    }, 1000)
}
```
this is code to fix the whole timer thing but I want to do my best and find my own solution
