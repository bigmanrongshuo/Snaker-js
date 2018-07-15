var jsUtil = {
    extend: function (origin) {
        var result = function () {
            origin.apply(this, arguments)
        }

        console.log(this)
        this.inherit(result, origin)
        return result;
    },
    inherit: function (target, origin) {
        var temp = function () { };
        temp.prototype = origin.prototype;
        target.prototype = new temp();
        target.prototype.contructor = target
    },
    singleFMS:function(origin){
        var singleResult = (function(){
            var instance;   //他应该在构造函数的作用域下  而不是实例产生的 这样他才能成为一个单例 存在一次 永久存在
            return function(){
                if(instance){
                    return instance
                }else{
                    origin &&  origin.apply(this,arguments)  //this 指向singleResulkt
                    instance = this   //内部属性 拿到sigleResult  的this
                }
                return instance  // this//new  一下  默认返回实例
            }
            
        })()
        origin && this.inherit(singleResult,Square)
        return singleResult
    },
    single: function (origin) {
        var singleResult = (function () {
            // console.log(this)           //指向window
            var instance = null;
            // console.log(instance)
            return function () {    //singleResult 拿到这个函数  在下面将origin的prototype 拿到，通过new 之后 会产生
                // console.log(this)       //这个this 指向 origin
                // console.log(typeof instance)
                if (instance) {
                    // console.log(1)
                    return instance
                }
                // console.log(2)
                origin && origin.apply(this, arguments)  //运行之后产生origin 的内部属性
                // console.log(this)
                instance = this
            }

        })()
        // console.log(this)
        origin && this.inherit(singleResult, origin)
        return singleResult
    }
}

// function Square(x, y, width, height) {
//     this.x = x || 0;
//     this.y = y || 0;
//     this.width = width || 100;
//     this.height = height || 100;
// }
// Square.prototype.touch = function () {
//     console.log('touch')
// }
// function Food() {

// }

// jsUtil.inherit(Food,Square)
//single 返回一个构造函数  传参继承自己 参数，不传参，，不继承，函数符合单例模式
// var Food = jsUtil.singleFMS(Square)
// jsUtil.inherit(Food,Square)
// var food = new Food()
// var f = new Food(1, 2, 3, 4)
// console.log(new sP())
