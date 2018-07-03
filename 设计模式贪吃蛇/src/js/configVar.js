// 决定游戏场景的位置和大小
// 在后序的脚本中 他们基本上都不变了  所以把他们都弄成大写了（习惯）

//  XLEN 横向系数 YLEN 纵向系数
var XLEN = 30;
var YLEN = 30;

//格子宽度
var LIW = 20;

//广场坐标  游戏场景
var BASE_X_POINT = 200;
var BASE_Y_POINT = 100


//设置游戏难度

//蛇的移动速度
var INTERVAL = 100;

//定义基类
function Square(x, y, width, height,dom) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 100;
    this.height = height || 100;
    //存储dom 对象 
    this.viewContent = dom || document.createElement('div')
}
// Square.prototype.touch = function(){
//     console.log('touch')
// }
//其他子类

//地板
var Floor = jsUtil.extend(Square)
//围墙 石头
var Stone = jsUtil.extend(Square)
//食物
var Food = jsUtil.single(Square)
Food.prototype.upData = function(x,y){
    this.x = x;
    this.y = y;
}
// 障碍物
var Obstacle = jsUtil.single(Square)
// 超级食物
var SuperFood = jsUtil.single(Square)
SuperFood.prototype.upData = function(x,y){
    this.x = x;
    this.y = y;
}
//蛇身   //蛇身不是单例
var SnakeBody = jsUtil.extend(Square)

var Snake = jsUtil.single(Square)

//蛇头
var SnakeHead = jsUtil.single(Square)
SnakeHead.prototype.upData = function(x,y){
    this.x = x;
    this.y = y;
}
//广场
var Ground = jsUtil.single(Square)

//游戏控制
var Game = jsUtil.single();

//触碰策略
var TOUCHENUM = {
    EAT:'EAT',
    MOVE: 'MOVE',
    DIE:'DIE',
    EATMORE:'EATMORE'

}
