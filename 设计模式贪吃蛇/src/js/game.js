var oGame = new Game();
oGame.tiemr = null;
oGame.score = 0;
oGame.firstTime = 0;
oGame.secondTime = null;
oGame.init = function () {
    oGround.init();
    
    //生成食物
    var flag = true;
    var x = null;
    var y = null;
    while(flag){
        x = 1 + parseInt(Math.random()*27)
        y = 1 + parseInt(Math.random()*27)
        var ok = true
        for(var node = snake.head;node;node = node.next){
            if(x == node.x && y == node.y){
                ok = false;
                break;
            }
        }
        if(ok){
            flag = false
        }
    }
    if(Math.random()>0.5){
        this.food = SquareFactory.create('SuperFood',x,y,'blue')
    }else{
        this.food = SquareFactory.create('Food',x,y,'green')
    }
    
    oGround.removeAndAppend(this.food)

    // //生成超级食物
    // var Sflag = true;
    // var Sx = null;
    // var Sy = null;
    // while(flag){
    //     Sx = 1 + parseInt(Math.random()*27)
    //     Sy = 1 + parseInt(Math.random()*27)
    //     var ok = true
    //     for(var node = snake.head;node;node = node.next){
    //         if(Sx == node.x && Sy == node.y){
    //             ok = false;
    //             break;
    //         }else if(Sx == this.food.x && Sy == this.food.y){
    //             ok = false;
    //             break;
    //         }
    //     }
    //     if(ok){
    //         flag = false
    //     }
    // }
    // this.surperFood = SquareFactory.create('Food',x,y,'blue')
    // oGround.removeAndAppend(this.surperFood)
    // // console.log(oGround.init)
    
    
    //生成蛇
    snake.init(oGround);
    //控制蛇
    function throttle(handle,wait){
        var lastTime = 0;
        return function(){
            console.log(465465)
            var newTime = new Date().getTime() ;
            if(newTime - lastTime > wait){
                console.log('wa')
                handle.apply(this,arguments)
                lastTime = newTime
            }
            
           
        }
    }
    function down(e){
        console.log(e)
        
            if(e.keyCode == 37 && snake.direction !== DIRECTION.RIGHT){
                snake.direction = DIRECTION.LEFT
            }else if(e.keyCode == 38 && snake.direction !== DIRECTION.DOWN){
                snake.direction = DIRECTION.UP
            }else if(e.keyCode == 39 && snake.direction !== DIRECTION.LEFT){
                snake.direction = DIRECTION.RIGHT
            }else if(e.keyCode == 40 && snake.direction !== DIRECTION.UP){
                snake.direction = DIRECTION.DOWN
            }
        
       
    }
    document.onkeydown = throttle(down,100)
//     document.onkeydown = function (e) {
//         this.secondTime = new Date().getTime() ;
//         if(this.secondTime - this.firstTime < 100){
//             return 
//         }
//         // console.log(this.secondTime - this.firstTime)
//         this.firstTime = this.secondTime
//         if(e.keyCode == 37 && snake.direction !== DIRECTION.RIGHT){
//             snake.direction = DIRECTION.LEFT
//         }else if(e.keyCode == 38 && snake.direction !== DIRECTION.DOWN){
//             snake.direction = DIRECTION.UP
//         }else if(e.keyCode == 39 && snake.direction !== DIRECTION.LEFT){
//             snake.direction = DIRECTION.RIGHT
//         }else if(e.keyCode == 40 && snake.direction !== DIRECTION.UP){
//             snake.direction = DIRECTION.DOWN
//         }
        
//     }
}

oGame.start = function () {
    this.timer = setInterval(() => {
        snake.move();
    }, INTERVAL)
}

oGame.over = function (dom) {
    // console.log(dom)
    clearInterval(this.timer)
    dom.onclick = function(){
        // console.log(this)
        document.body.removeChild(dom)
        oGame.init()
        oGame.start()
    }
}
oGame.init()
oGame.start()