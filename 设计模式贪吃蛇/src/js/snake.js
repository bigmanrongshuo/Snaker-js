var snake = new Snake()
// console.log(snake)
//规定运动之后的坐标变化
var DIRECTION = {
    UP :{
        x :0 , y:-1
    },
    DOWN :{
        x :0 , y:1
    },
    LEFT :{
        x : -1 , y:0
    },
    RIGHT :{
        x :+1 , y: 0
    }
}

//蛇默认方向向右
snake.init  = function(ground){
    //SquareHead Sqaure   snakeBody Square

    //创建蛇头蛇身
    var snakeHead = SquareFactory.create('SnakeHead',3,1,'red');
    var snakeBody1 = SquareFactory.create('SnakeBody',2,1,'pink')
    var snakeBody2 = SquareFactory.create('SnakeBody',1,1,'pink')
    //链表 
    this.head = snakeHead
    snakeHead.last = null;
    snakeHead.next = snakeBody1

    snakeBody1.last = snakeHead 
    snakeBody1.next = snakeBody2

    snakeBody2.next = null
    snakeBody2.last = snakeBody1
    // 蛇尾
    this.tail = snakeBody2
    //插入

    // ground.remove(snake.head.x,snake.head.y)
    // ground.append(snake.head)
    // ground.remove(snakeBody1.x,snakeBody1.y)
    // ground.append(snakeBody1)
    // ground.remove(snakeBody2.x,snakeBody2.y)
    // ground.append(snakeBody2)
    ground.removeAndAppend(this.head)
    ground.removeAndAppend(snakeBody1)
    ground.removeAndAppend(snakeBody2)

    //记录默认方向
    this.direction  = DIRECTION.RIGHT
    //蛇动
    console.log(this)
    
    // this.touch
    // if()
}

snake.move = function(){
    var square = oGround.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x]
    if(typeof square.touch == 'function'){
        //MOVE DIE EAT
        // square.touch()
        // console.log(square.touch())
        this.strategies[square.touch()](square)
    }
}
snake.strategies = {
    MOVE:function(square,EAT){
        //新建身体  并连接
        var newSnakeBody = SquareFactory.create('SnakeBody',snake.head.x,snake.head.y,'pink')
        oGround.removeAndAppend(newSnakeBody)
        
        // // snake.head = square
        // newSnakeHead.next = newSnakeBody;
        // newSnakeHead.last = null;
        // newSnakeBody.last = newSnakeHead
        // snake.head.next.last = newSnakeBody;
        newSnakeBody.next = snake.head.next
        newSnakeBody.last = null;
        newSnakeBody.next.last = newSnakeBody
        // console.log(snake.tail.last)
        
        // // snake.tail.next = null
        // oGround.append(newSnakeHead)
        //修改蛇头  
        var newSnakeHead = SquareFactory.create('SnakeHead',square.x,square.y,'red')

        oGround.removeAndAppend(newSnakeHead)
        newSnakeHead.next = newSnakeBody
        newSnakeHead.last = null;
        newSnakeBody.last = newSnakeHead;
        snake.head = newSnakeHead;
        //增加尾巴
        if(EAT == 'EATMORE'){
            console.log(1)
            var newSnakeBody = SquareFactory.create('SnakeBody',snake.lastTail.x,snake.lastTail.y,'pink')
            oGround.removeAndAppend(newSnakeBody)
            newSnakeBody.last = snake.tail
            newSnakeBody.next = null;
            snake.lastTail = snake.tail    //将此时的尾巴保存一下 留给下一次的EATMORE使用
            snake.tail = newSnakeBody
            return 
        }
        
        //删除尾巴
        if(EAT == 'EAT'){
            return 
        }
        console.log(123)
        var newFloor = SquareFactory.create('Floor',snake.tail.x,snake.tail.y,'orange')
        oGround.removeAndAppend(newFloor)
        // snake.tail = newFloor
        snake.lastTail = snake.tail     //将此时的尾巴保存一下 留给下一次的EATMORE使用
        snake.tail = snake.tail.last
        
        
    },
    EAT:function(square){
        this.MOVE(square,'EAT')
        var flag = true;
        var x = null;
        var y = null;
        // var cache = 0
        // var inspectTimer = null;
        // inspectTimer = setInterval(()=>{
        //     for(var i = 0 ; i < YLEN; i ++){
        //         for(var j = 0 ; j < XLEN; j ++){
        //             // console.log(oGround.SquareTable[i][j])
        //             if(oGround.SquareTable[i][j].touch() == 'MOVE'){
        //                 cache ++
        //                 // console.log(cache)
        //             }
        //         }
        //     }
        // },100000)

        
        // if(cache > 400){
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
            if(Math.random()>0.1){
                oGame.food = SquareFactory.create('SuperFood',x,y,'blue')
            }else{
                oGame.food = SquareFactory.create('Food',x,y,'green')
            }
            
            oGround.removeAndAppend(oGame.food)
        // }else{
        //     clearInterval(inspectTimer)
        //     while(flag){
        //         x = 1 + parseInt(Math.random()*27)
        //         y = 1 + parseInt(Math.random()*27)
        //         var ok = true
        //         for(var node = square;node;node = node.next){
        //             if(x == node.x && y == node.y){
        //                 ok = false;
        //                 break;
        //             }
        //         }
        //         if(ok){
        //             flag = false
        //         }
        //     }
        // }
        
        // oGame.food = SquareFactory.create('Food',x,y,'green')
        // oGround.removeAndAppend(oGame.food)
        oGame.score ++
        // if(Math.random()>0.9){
        //     SurperFood.init()
        // }
    },  
    DIE:function(){
        console.log(' GAME OVER ' + '你的分数是' + oGame.score ) 
        oGame.over() 
    },
    EATMORE:function(square){
        console.log(123)
        this.MOVE(square,'EATMORE')
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
            console.log(oGame.food.touch())
            if(Math.random()>0.1 && oGame.food.touch() !== 'EATMORE'){   //因为我们如果两次蓝色恰巧出现在我们前进的两个格子上 ，那么我们的snake.lasttail会无法记录 导致出错
                    //所以我们采取强制性的让他不允许出现连着连个超级食物，可以看出 即使 我们把蓝色食物出现的概率设为0.9  他依然是0.5 左右
                
                oGame.food = SquareFactory.create('SuperFood',x,y,'blue')
            }else{
                oGame.food = SquareFactory.create('Food',x,y,'green')
            }
            
            oGround.removeAndAppend(oGame.food)
        
        oGame.score ++
    }
}