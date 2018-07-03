// x y width height dom
var oGround = new Ground (BASE_X_POINT,BASE_Y_POINT,XLEN*LIW,YLEN*LIW,document.createElement('div'))

oGround.SquareTable = [];


oGround.init = function(){
    console.log(1)
    this.viewContent.style.position = 'absolute',
    this.viewContent.style.width = this.width + 'px'
    this.viewContent.style.height= this.height + 'px'
    this.viewContent.style.left = this.x + 'px'
    this.viewContent.style.top = this.y +'px'
    this.viewContent.style.backgroundColor = '#0ff'
    document.body.appendChild(this.viewContent)
    this.SquareTable = [];
    
    for(var i = 0; i < YLEN; i  ++){   //根据YLEN 生成多少列
        
        
        this.SquareTable[i] = new Array(XLEN) //new Array给每一行【】创建30个空数组
        for(var j = 0; j < YLEN ; j ++){
            var newSquare = undefined;
            if(i == 0 || i == YLEN - 1 || j == 0 || j == XLEN - 1){
                //墙
                newSquare = SquareFactory.create('Stone',j,i,'black') 
              
                
            }else{
                //地板
                newSquare = SquareFactory.create('Floor',j,i,'orange')
            }
            this.SquareTable[i][j] = newSquare;
            this.viewContent.appendChild(newSquare.viewContent)
        }
    }
} 
//拆掉地板
// console.log(SquareFactory)
oGround.remove = function(square){
    this.viewContent.removeChild(this.SquareTable[square.y][square.x].viewContent)
    this.SquareTable[square.y][square.x] = null;  //虽然已经没了 但是要更新一下场景信息 不然以后用的时候会报错，不然明明已经没了 但是他的dom 还存在
}

//安装新对象的功能
oGround.append = function(square){              //传一个square对象  不然不知道他的类型信息
    this.SquareTable[square.y][square.x] = square;
    this.viewContent.appendChild(square.viewContent)
}


oGround.removeAndAppend = function(square){
    
    this.viewContent.removeChild(this.SquareTable[square.y][square.x].viewContent)
    this.SquareTable[square.y][square.x] = null;
    this.SquareTable[square.y][square.x] = square;
    this.viewContent.appendChild(square.viewContent)
    
}
// var snakeHead = SquareFactory.create('SnakeHead',2,2,'red')
// oGround.remove(2,2)
// oGround.append(snakeHead.x,snakeHead.y,snakeHead)