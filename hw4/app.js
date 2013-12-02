'use strict';

//Задача №1
//Раньше в JavaScript’e очень не хватало биндинга событий\функций. Начиная с Javascript 1.8.5(IE9, FF4, Chrome7, Opera 11.6) появилась нативная реализация. Раньше же приходилось писать собственную реализацию биндинга или использовать существующие решения.
//    Напишите реализацию функции bind, которая позволяет выполнять функцию в передаваемом контексте выполнения и аргументами.
//    Подсказка: Обратите внимание на методы apply/call нативного JavaScript.
//
//    Пример:
//
//var App = function(){
//    return {
//        init: function() {
//            this.nodes = document.querySelectorAll('.node');
//            this.setListeners();
//        },
//
//        setListeners: function() {
//            [].slice.call(this.nodes).forEach(function(n){
//                n.onclick = this.onClick.myBind(this);
//            }, this);
//        },
//
//        onClick: function(e) {
//            e = e || window.event;
//            var node = e.target || e.srcElement;
//            // this - should be the main context - instance of App
//            // node - should be the node, that fires event
//        }
//    };
//};
//
//if (typeof Function.prototype.myBind !== 'undefined') {
//    Function.prototype.myBind = function(context){
//        // Put your code here
//    };
//}
//
//(new App()).init();

var App = function(){
    return {
        init: function() {
            this.nodes = document.querySelectorAll('.node');
            this.setListeners();
        },

        setListeners: function() {
            [].slice.call(this.nodes).forEach(function(n){
                n.onclick = this.onClick.myBind(this);
            }, this);
        },

        onClick: function(e) {
            e = e || window.event;
            var node = e.target || e.srcElement;
            // this - should be the main context - instance of App
            // node - should be the node, that fires event
        }
    };
};

if (typeof Function.prototype.myBind !== 'undefined') {
    Function.prototype.myBind = function(context){
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && context ? this : context, aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

(new App()).init();


//Задача №2
//Напишите реализацию конструктора, принимающего на вход объект и создающего аттрибуты\методы по ключам этого объекта:
//
//    var Person = function(args){
//        // put your code here
//    };
//
//var p = new Person({
//    name: ‘Jack’,
//age: ’10’,
//jump: function(){ return “My name is ” + this.name + “ and I can jump.”;}
//});
//p.name // ‘Jack’
//p.age // 10
//console.log(p.jump()) // “My name is Jack and I can jump.”

var Person = function(args){
    var res = {};
    for (var obj in args) {
        if (args.hasOwnProperty(obj)) {
            res[obj] = args[obj];
        }
    }
    return res;
};

var p = new Person({
    name: 'Jack',
    age: '10',
    jump: function(){ return "My name is " + this.name + " and I can jump.";}
});

//console.log(p.name)

//Задача №3
//Модифицируйте конструктор из прошлой задачи, добавив к нему геттеры\сеттеры для каждого переданного свойства.
//
//    var p = new Person({
//    name: ‘Jack’,
//age: ’10’
//});
//p.getName() // ‘Jack’
//p.name // undefined
//p.getAge() // 10
//p.age // undefined
//console.log(p.jump()) // “My name is Jack and I can jump.”
//console.log(p.getJump) // undefined

var Person2 = function(args){
    var res = {};

    for (var prop in args) {
        if (args.hasOwnProperty(prop)){
            var propValue = args[prop];

            (function(prop){
                var firstLetter = prop.charAt(0).toUpperCase();

                res['get' + firstLetter + prop.slice(1)] = function(){
                    return args[prop];
                };
                res['set' + firstLetter + prop.slice(1)] = function(newValue){
                    args[prop] = newValue;
                };
            })(prop);
        }
    }

    res.jump = function(){
        if (args.name !== undefined){
            return "My name is " + args.name + " and I can jump.";
        } else {
            return "I have no name";
        }
    };


    return res;
};


var p2 = new Person2({
    name: 'Jack',
    age: '10'
});

//console.log(p2.getName())
//console.log(p2.name)
//console.log(p2.getAge())
//console.log(p2.age)
//p2.setAge(11)
//console.log(p2.getAge())
//console.log(p2.jump())
//console.log(p2.getJump)