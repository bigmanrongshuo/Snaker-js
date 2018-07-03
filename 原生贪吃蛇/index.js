//点击开始游戏  startWrapper消失  游戏开始==》
//随机出现失误  出现三节蛇 开始向右运动
// 上下左右 改变方向 =》
//判断是吃到食物 =》  蛇=1   食物重新出来
//判断游戏结束，弹出框 
var demo = {
    a: 132,
    Score: document.getElementById('score'),
    oScore:document.getElementsByClassName('score')[0],
    oStartWrapper: document.getElementsByClassName('start-wrapper')[0],
    oContent: document.getElementsByClassName('content')[0],
    oStartBtn: document.getElementsByClassName('startBtn')[0],
    oOverWrapper : document.getElementsByClassName('over-wrapper')[0],
    oOverScore: document.getElementsByClassName('overScore')[0],
    oClose : document.getElementsByClassName('close')[0],
    oStartAndPause: document.getElementsByClassName('startAndPause')[0],
    init: function () {
        //游戏可用地图大小初始化  因为不同大小页面的地图大小不一样
        this.MapW = parseInt(getComputedStyle(this.oContent).width)
        this.MapH = parseInt(getComputedStyle(this.oContent).height)
        this.liH = this.MapH / 20
        this.liW = this.MapW / 20
        //食物
        this.fdW = 0;
        this.fdH = 0;
        this.fdX = 0;
        this.fdY = 0;
        //蛇
        this.snakeW = 0;
        this.snakeH = 0;
        this.snakeBody = [[2, 0, 'head'], [1, 0, 'body'], [0, 0, 'body']];

        //游戏属性
        this.direction = 'right'
        this.left = false;
        this.right = false;
        this.up = true;
        this.down = true;
        this.speed = 200;
        this.score = 0;
        this.Score.innerText = this.score
        //按键间隔锁
        this.allow = true;
        //开始监听
        this.event()
    },
    event: function () {
        var self = this;
        this.oStartBtn.onclick = function(){
            self.oStartWrapper.style.display = 'none';
            self.oScore.style.display = 'block'
            self.startGame();
            self.keyDown();
        }
        // console.log(this.oStartAndPause)
        this.oStartAndPause.onclick = function(){
            if(this.getAttribute('src') == './img/start.png'){
                console.log(1)
                this.src = './img/pause.png'
                clearTimeout(self.timer)
            }else if(this.getAttribute('src') == './img/pause.png' ){
                console.log(2)
                this.src = './img/start.png'
                self.move(self.direction)
            }
            
        }
        this.oClose.onclick = function(){
            self.oOverWrapper.style.display = 'none';
            self.oStartWrapper.style.display = 'block'
        }
    },
    alwaysMove: function () {
        this.timer = setTimeout(() => {
            this.move(this.direction)
        }, this.speed)
    },
    keyDown: function () {

        var self = this
        if (this.allow) {
            document.onkeydown = function (e) {

                self.allow = false
                var timer = setTimeout(() => {
                    self.allow = true
                }, 400)

                console.log(self.allow)
                if (e.keyCode === 38) {
                    if (self.up) {
                        clearTimeout(self.timer)
                        self.direction = 'up'
                        self.move('up')
                        self.left = true;
                        self.right = true;
                        self.up = false;
                        self.down = false;
                    }



                }
                if (e.keyCode === 40) {
                    if (self.down) {
                        self.direction = 'down'
                        self.move('down')
                        self.left = true;
                        self.right = true;
                        self.up = false;
                        self.down = false;
                    }

                }
                if (e.keyCode === 37) {
                    if (self.left) {
                        self.direction = 'left'
                        clearTimeout(self.timer)
                        self.move('left')
                        self.left = false;
                        self.right = false;
                        self.up = true;
                        self.down = true;
                    }

                }
                if (e.keyCode === 39) {
                    if (self.right) {
                        self.direction = 'right'
                        clearTimeout(self.timer)
                        self.move('right')
                        self.left = false;
                        self.right = false;
                        self.up = true;
                        self.down = true;
                    }

                }
            }

        }
    },
    startGame: function () {
        this.oStartAndPause.style.display = 'block'
        this.food();//生成food
        this.snake();
        console.log(this)
        console.log(this.direction)
        this.move(this.direction);
    },
    food: function () {
        var food = document.createElement('div');
        food.style.width = this.MapW / 20 + 'px';
        food.style.height = this.MapH / 20 + 'px';
        food.style.position = 'absolute';
        this.foodX = Math.floor(Math.random() * 19)
        this.foodY = Math.floor(Math.random() * 19)
        food.style.left = this.foodX * this.liW + 'px';
        food.style.top = this.foodY * this.liH + 'px';
        food.style.background = 'url("./img/apple.png")'
        food.style.backgroundSize = '100% 100%'
        this.oContent.appendChild(food)
        food.setAttribute('class', 'food')
        this.foodDom = food
    },
    snake: function () {
        for (let i = 0; i < this.snakeBody.length; i++) {
            var snake = document.createElement('div')
            snake.style.width = this.liW + 'px';
            snake.style.height = this.liH + 'px';
            snake.style.position = 'absolute'
            snake.style.left = this.snakeBody[i][0] * this.liW + 'px';
            snake.style.top = this.snakeBody[i][1] * this.liH + 'px';
            snake.classList.add(this.snakeBody[i][2])
            snake.classList.add('snake')
            this.oContent.appendChild(snake)
            // this.oContent.appendChild(snake).classList.add('snake')
            //注意这个写法  他是上面两个的结合体
            switch (this.direction) {
                case 'right':
                    break
                case 'left':
                    snake.style.transform = 'rotate(180deg)'
                    break
                case 'up':
                    snake.style.transform = 'rotate(270deg)'
                    break
                case 'down':
                    snake.style.transform = 'rotate(90deg)'
                    break
                default:
                    break
            }
        }
    },
    move: function (direction) {
        // this.timer = setInterval(() => {
        this.snakeB = null;
        for (let i = this.snakeBody.length - 1; i >= 0; i--) {
            if (i == 0) {
                switch (direction) {
                    case 'right':
                        this.snakeBody[i][0] = this.snakeBody[i][0] + 1;

                        break
                    case 'left':
                        this.snakeBody[i][0] = this.snakeBody[i][0] - 1;
                        break
                    case 'up':
                        this.snakeBody[i][1] = this.snakeBody[i][1] - 1;
                        break
                    case 'down':
                        this.snakeBody[i][1] = this.snakeBody[i][1] + 1;
                        break
                }
                // console.log(this.snakeBody[i][0])
                // this.snakeBody[i][0] = this.snakeBody[i][0] + 1;
                // console.log(this.snakeBody[i][0])
            } else {
                this.snakeBody[i][0] = this.snakeBody[i - 1][0]
                this.snakeBody[i][1] = this.snakeBody[i - 1][1]
            }
        }
        //蛇是每次运动都会根据他的新数组运动，就会把以前的蛇神都删除掉
        this.removeClass('snake')
       
        this.snake();
        clearTimeout(this.timer)

        
        this.alwaysMove();
        if(this.snakeBody[0][0] == 20 || this.snakeBody[0][0] == -1 || this.snakeBody[0][1] == 20 ||this.snakeBody[0][1] == -1){
            console.log('die')
            clearTimeout(this.timer)
            this.reloadGame()
        }
        for(let i = 1 ; i < this.snakeBody.length ; i ++){
            if(this.snakeBody[i][0] == this.snakeBody[0][0] && this.snakeBody[i][1] == this.snakeBody[0][1]){
                console.log('die')
                clearTimeout(this.timer)
                this.reloadGame()
            }
        }
        if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
            console.log(this)
            this.score += 1;
            this.Score.innerText = this.score
            this.oContent.removeChild(this.foodDom)
            this.food()
            this.longger();
        }
        

    },
    longger: function () {
        var snakeLastX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeLastY = this.snakeBody[this.snakeBody.length - 1][1];
        switch (this.direction) {
            case 'right':
            console.log(snakeLastX,snakeLastY)
                this.snakeBody.push([snakeLastX - 1, snakeLastY, 'body'])
                break
            case 'left':
                this.snakeBody.push([snakeLastX + 1, snakeLastY, 'body'])
                break
            case 'up':
                this.snakeBody.push([snakeLastX, snakeLastY - 1, 'body'])
                break
            case 'down':
                this.snakeBody.push([snakeLastX , snakeLastY + 1, 'body'])
                break
        }
        console.log(this.snakeBody)
        this.snake();
    },
    removeClass: function (domClass) {
        var ele = document.getElementsByClassName(domClass);
        // console.log(ele)
        while (ele.length > 0) {
            ele[0].parentNode.removeChild(ele[0])
        }
    },
    reloadGame:function(){
        this.removeClass('snake')
        this.oContent.removeChild(this.foodDom)
        this.oOverScore.innerText = this.score;
        this.oOverWrapper.style.display = 'block'
        this.oStartAndPause.style.display = 'none'
        this.oScore.style.display = 'none'
        // this.oStartWrapper.style.display = 'block'
        this.init()
    }
}
demo.init();