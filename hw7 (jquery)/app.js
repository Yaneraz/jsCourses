//Напишите конструктор my$, который принимает аргументом DOM селектор.
//
//    Реализуйте методы width, height которые соответсвенно изменяют ширишу и высоту всех селекторов,
//    которые мы определили ранее.
//
//    Пример:
//var $div = my$('div')
//console.log( $div ) //показать все div на странице.
//
//var $red = my$('.red')
//console.log( $red ) //показать все DOM элементы с классом .red, которые присутсвуют на странице
//
//$red.width('100') //изменяет текущую высоту до 100px всех DOM элементов с классом .red

//Написать реализацию CSS геттеро-сеттера в jQuery которая может принимать на вход ключ значение или объект
//со значениями. Для стилизации текущего селектора: цвет, dimensions и других параметров( стоит
//огранничиться 5 параметрами, так как их слишком много ). Сделать возможным, чтобы эти методы были
//chainable. Добавить возможность, передавать второй /третий аргумент как время, чтобы стили
//применились через какое-то время.

'use strict';

function my$(selector){
    return new my$.fn.init(selector);
}

my$.fn = my$.prototype = {
    constructor: my$,
    init: function(selector){
        var nodeList = Array.prototype.slice.call(document.querySelectorAll(selector));

        for (var i = 0; i < nodeList.length; i++){
            this[i] = nodeList[i];
        }

        this.length = nodeList.length;

        return this;
    },
    // our custom each engine :)
    each: function(fn){
        for (var i = 0; i < this.length; i++){
            if (typeof fn === 'function'){
                (function(el){
                    fn.apply(el, arguments);
                })(this[i]);
            }
        }

        return this;
    },
    width: function(width){
        this.each(function(el){
            el.style.width = width + 'px';
        });

        return this;
    },
    height: function(height){
        this.each(function(el){
            el.style.height = height + 'px';
        });

        return this;
    },
    css: function(obj, delay){
        if (typeof obj === 'string'){
            this.each(function(el){
                applyStyles(el, obj, delay);
            });
        } else { // consider that it's an objects
            this.each(function(el){
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)){

                        if (delay !== undefined && typeof delay === 'number'){
                            (function(el, prop, val){
                                setTimeout(function(){
                                    applyStyles(el, prop, val);
                                }, delay);
                            })(el, prop, obj[prop]);

                        } else {
                            applyStyles(el, prop, obj[prop]);
                        }

                    }
                }
            });
        }

        return this;
    },
    delegate: function (selector, event, callback){
        this.each(function(el){
            el[event] = function(e){
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
        });

        return this;
    }
};
my$.fn.init.prototype = my$.fn;

function applyStyles(el, prop, val){
    el.style[prop] = val;
}

var $div = my$('div');
var $red = my$('.red');

$red.width('100').height(120);

my$('span').css('color', '#000').css({
    'font-size':'12px',
    'height': '30px'
});

my$('div').delegate('.red', 'onclick', function(e){
    console.log(this)
});

my$('span').css({
    'font-size':'10px',
    'height': '20px',
    'border-color':'red'
}, 1500);

//console.log( $div ) //показать все div на странице.
//console.log( $red ) //показать все DOM элементы с классом .red, которые присутсвуют на странице

test("my$, target .red and style change", function() {
    var div = document.getElementsByClassName('red'),
        span = document.getElementsByTagName('span');

    equal(my$('.red')[0], div[0], 'Selected target is ok');
    equal(div[0].style.width, '100px', 'width was set to 100px');
    equal(div[0].style.height, '120px', 'height was set to 120px');

    equal(span[0].style.color, 'rgb(0, 0, 0)', 'color was set to #000');
    equal(span[0].style.fontSize, '12px', 'font-size was set to 12px');
    equal(span[0].style.height, '30px', 'height was set to 30px');
});

test("my$ style change after delay", function() {
    stop(); // Pause the test
    //Add your wait
    setTimeout(function() {
        var span = document.getElementsByTagName('span');

        ok(true, 'delay has passed');
        equal(span[0].style.fontSize, '10px', 'font-size was set to 10px');
        equal(span[0].style.borderColor, 'red', 'border-color was set to red');
        equal(span[0].style.height, '20px', 'height was set to 20px');
        start();
    }, 1500);
});

