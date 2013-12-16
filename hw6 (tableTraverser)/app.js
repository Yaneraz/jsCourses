'use strict';

//Задача №1.
//На лекции мы рассказывали про концепцию делегирования событий. Это бывает удобно в случае, когда в контейнере находиться много элементов, на которые необходимо подвесить обработчики событий. Напишите реализацию функции delegate, с помощью которой можно подвесить обработчик событий на основной контейнер, который будет вызывать функцию при срабатывании события на дочернем элементе.
//
//<Node>.delegate(/* String */childSelector, /* String */eventType, /* Function */handler)

var container = document.getElementById('container');

container.delegate = function(selector, event, callback, e){
    this[event] = function(e){
        e = e || window.event;
        var target = e.target || e.srcElement;

        if (selector.charAt(0) === '.' && target.className === selector.substr(1)){
            callback.call(target, e);
        }
    };
};

container.delegate('.child', 'onclick', function(e){
    // the context 'this' should be equal the element, that fires event, i.e. child with class 'child'
    console.log(this)
});


//Задача №2.
//Для более тесного ознакомления с DOM предлагается написать небольшой UI для навигации по DOM-структуре.
//Навигация должна проводиться исключительно с помощью стрелок клавиатуры.
//Клик мыши по какой-либо ячейке таблицы должен выделять ее
//(при этом предыдущее выделение ячейки\таблицы\рядка должно сбрасываться).
//https://drive.google.com/folderview?id=0B1HuspRXFd4hVVBfZVFBbUhHNkU&usp=sharing
//
//Управление:
//<стрелка влево> - перемещение выделения на ячейку слева/перемещение выделения на ряд
//(в случае, если была выделена первая ячейка ряда)
//<стрелка вправо> - перемещение выделения на ячейку справа/перемещение выделения на первую ячейку ряда
//(в случае, если был выделен весь ряд)
//<стрелка вверх> - перемещение выделения на ячейку сверху/перемещение выделения на таблицу
//(в случае, если был выделен первый ряд)
//<стрелка вниз> - перемещение выделения на ячейку снизу/перемещение выделения на первый ряд
//(в случае, если была выделена таблица)
//
//Редактирования:
//<Enter> - добавление рядка
//<Shift>+<Enter> - добавление колонки
//<Delete> - удаление рядка
//<Shift>+<Delete> - удаление колонки`

var body = document.getElementById('tbl');

// creates a <table> element
var tbl  = document.createElement("table");

// creating all cells
for (var j = 0; j < 2; j++) {
    // creates a table row
    var row = document.createElement("tr");

    for (var i = 0; i < 2; i++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");

        row.appendChild(cell);
    }

    // add the row to the end of the table body
    tbl.appendChild(row);
}

// appends <table> into <body>
body.appendChild(tbl);
// sets the border attribute of tbl to 2;
tbl.setAttribute("border", "2");