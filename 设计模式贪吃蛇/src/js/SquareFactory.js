function SquareFactory() {
    this.arr = [];
}
SquareFactory.create = function (type,x,y,color) {
//    console.log(type)
    if(!SquareFactory.prototype[type]){
        throw "don't have this type"
    }
    if(SquareFactory.prototype[type].prototype.__proto__ !== SquareFactory.prototype){
        // SquareFactory.prototype[type].prototype = new SquareFactory()  //创建出来的实例上也要继承SquareFactoy 的方法 并且拿到他的内部属性
        jsUtil.inherit(SquareFactory.prototype[type],SquareFactory)
    }
    var newSquare =new SquareFactory.prototype[type](x,y,color)
    return newSquare

}
SquareFactory.prototype.init = function(square, color,strategy){     //实例  颜色
    // console.log(this)
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height +'px';
    square.viewContent.style.backgroundColor = color ;
    square.viewContent.style.left = square.x*LIW + 'px'; 
    square.viewContent.style.top =square.y*LIW + 'px';
    square.touch = function(){
        return strategy
    }

}
//字工厂    
//生成地板的流水线
SquareFactory.prototype.Floor = function (x,y,color) {
    var floor = new Floor(x,y,LIW,LIW)          //生成实例
    this.init(floor,color,TOUCHENUM.MOVE)          //初始化实例
    return floor                    //返回实例
}
//stone
SquareFactory.prototype.Stone = function (x,y,color) {
    var stone = new Stone(x,y,LIW,LIW)
    this.init(stone,color,TOUCHENUM.DIE)
    return stone
}
// 蛇头
SquareFactory.prototype.SnakeHead = function (x,y,color) {
    var snakeHead = new SnakeHead(x,y,LIW,LIW)
    snakeHead.upData(x,y)           //因为蛇头是单例模式 我们在这里给他更新一下以前的属性再init
    this.init(snakeHead,color)
    
    return snakeHead
}
//蛇身
SquareFactory.prototype.SnakeBody = function (x,y,color) {
    var snakeBody = new SnakeBody(x,y,LIW,LIW)
    this.init(snakeBody,color,TOUCHENUM.DIE)
    return snakeBody
}

//food
SquareFactory.prototype.Food = function (x,y,color) {
    var food = new Food(x,y,LIW,LIW)
    food.upData(x,y)
    this.init(food,color,TOUCHENUM.EAT)
    return food
}
//障碍物
SquareFactory.prototype.Obstacle = function (x,y,color) {
    var obstacle = new Obstacle(x,y,LIW,LIW)
    this.init(obstacle,color)
    return obstacle
}
//超级食物
SquareFactory.prototype.SuperFood = function (x,y,color) {
    var superFood = new SuperFood(x,y,LIW,LIW)
    superFood.upData(x,y)
    this.init(superFood,color,TOUCHENUM.EATMORE)
    return superFood
}
// var a = SquareFactory.create('asd')

// console.log(b)
// b.create('asd')

// var floor = SquareFactory.create('Floor',20,20,'black') 
