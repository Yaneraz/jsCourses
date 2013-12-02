'use strict';

//Задача №1
//Раньше в JavaScript’e очень не хватало биндинга событий\функций. Начиная с Javascript 1.8.5(IE9, FF4, Chrome7, Opera 11.6) появилась нативная реализация. Раньше же приходилось писать собственную реализацию биндинга или использовать существующие решения.
//    Напишите реализацию функции bind, которая позволяет выполнять функцию в передаваемом контексте выполнения и аргументами.
//    Подсказка: Обратите внимание на методы apply/call нативного JavaScript.

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

        var fn = this;
        return function(){
            return fn.apply(context, arguments);
        }
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
    return Object.create(args);
};

var p = new Person({
    name: 'Jack',
    age: '10',
    jump: function(){ return "My name is " + this.name + " and I can jump.";}
});

assert(p.name == 'Jack', 'p.name is Jack');
assert(p.age == '10', 'p.age is 10');
assert(p.jump() == "My name is Jack and I can jump.", 'My name is Jack and I can jump.');
assert();

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
    var privateVals = {};

    for (var prop in args) {
        if (args.hasOwnProperty(prop)){
            if (typeof args[prop] != 'function'){
                (function(self, prop){
                    var firstLetter = prop.charAt(0).toUpperCase();
                    self['get' + firstLetter + prop.slice(1)] = function(){
                        return args[prop];
                    };
                    self['set' + firstLetter + prop.slice(1)] = function(newValue){
                        args[prop] = newValue;
                    };

                    privateVals[prop] = args[prop];
                })(this, prop);
            } else {
                this[prop] = args[prop].bind(privateVals);
            }
        }
    }
};

var p2 = new Person2({
    name: 'Jack',
    age: 10,
    jump: function(){
        return "My name is " + this.name + " and I can jump.";
    }
});

assert(p2.getName() == 'Jack', 'p2.getName() is Jack');
assert(p2.name == undefined, 'p2.name is undefined');
assert(p2.getAge() == 10, 'p2.getAge is 10');
assert(p2.age == undefined, 'p2.age is undefined');
p2.setAge(11);
assert(p2.getAge() == 11, 'p2.getAge was set to 11 successfully');
assert(p2.jump() == 'My name is Jack and I can jump.', 'My name is Jack and I can jump. ');
console.log(p2.jump());
assert(p2.getJump == undefined, 'p2.getJump is undefined');
