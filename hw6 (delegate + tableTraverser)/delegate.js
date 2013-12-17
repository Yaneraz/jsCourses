'use strict';

//Задача №1.
//На лекции мы рассказывали про концепцию делегирования событий. Это бывает удобно в случае, когда в контейнере находиться много элементов, на которые необходимо подвесить обработчики событий. Напишите реализацию функции delegate, с помощью которой можно подвесить обработчик событий на основной контейнер, который будет вызывать функцию при срабатывании события на дочернем элементе.
//
//<Node>.delegate(/* String */childSelector, /* String */eventType, /* Function */handler)

var container = document.getElementById('container');

if (container){
    container.delegate = delegate;

    container.delegate('.child', 'onclick', function(e){
        // the context 'this' should be equal the element, that fires event, i.e. child with class 'child'
        console.log(this)
    });
}

function delegate(selector, event, callback){
    this[event] = function(e){
        e = e || window.event;
        var target = e.target || e.srcElement;

        if (selector.charAt(0) === '#' && target.id === selector.substr(1)){
            callback.call(target, e);
        }
        if (selector.charAt(0) === '.' && target.className === selector.substr(1)){
            callback.call(target, e);
        }
        if (target.tagName.toLowerCase() === selector){
            callback.call(target, e);
        }
    };
}