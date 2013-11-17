'use strict';

//Задача №1
//Напишите реализацию функции getObject(path, obj), которая вернет значение аттрибута объекта obj по заданному пути:
//
//    var o = {a: {b: ‘c’}};
//getObject(‘a.b’, o) // ‘c’
//getObject(‘a’, o) // {b: ‘c’}
//getObject(‘d’, o) // undefined

var o = { a: { b: 'c' } };

function getObject(path, obj){
    var pathArr = path.split('.'),
        result = obj;

    for (var i = 0; i < pathArr.length; i++){
        result = result[pathArr[i]];
    }

    return result;
}

//console.log(getObject('a.b', o));
//console.log(getObject('a', o))
//console.log(getObject('d', o))

//----------------------------------

//Задача №2.
//Реализация функции deepCopy - для копирования объекта с учетом вложенных объектов:
//    var a = {b: ‘c’, d: {e: ‘f’}},
//b = deepCopy(a);
//a.d = 12;
//b.d // {e: ‘f’}

var a = {
        b: 'c',
        d: {
            e: 'f'
        }
    },
    b = deepCopy(a);

function deepCopy(obj){
    var res = {};

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)){
            res[prop] = obj[prop];
        }
    }

    return res;
}

a.d = 12;

//console.log(b);
//console.log(b.d);

//----------------------------------

//Задача №3.
//Напишите функцию getFriends, которая бы возвращала массив друзей юзера по передаваемому id.
//    Коллекция, с которой будет работать функция:
//    var people = [
//        {id: 1, name: 'Brad', friends: [2,5,6]},
//        {id: 2, name: 'John', friends: [1, 3]},
//        {id: 3, name: 'Tom', friends: [2, 5]},
//        {id: 4, name: 'Fil', friends: null},
//        {id: 5, name: 'John', friends: [1, 3]},
//        {id: 6, name: 'Jim', friends: [1]}
//    ];
//
//var getFriends = function(userId) {
//    // Put you code here
//};
//
//Example:
//    getFriends(2) // [{id: 1, name: 'Brad', friends: [2,5,6]}, {id: 3, name: 'Tom', friends: [2, 5]}]
//getFriends(4) // []
//getFriends(100500) // null

var people = [
    {id: 1, name: 'Brad', friends: [2,5,6]},
    {id: 2, name: 'John', friends: [1, 3]},
    {id: 3, name: 'Tom', friends: [2, 5]},
    {id: 4, name: 'Fil', friends: null},
    {id: 5, name: 'John', friends: [1, 3]},
    {id: 6, name: 'Jim', friends: [1]}
];

function getFriends(id){
     var friends = [],
         foundNothing = true;

    people.forEach(function(el){
        if (el.id === id){
            var friendsFound = el.friends;

            if (friendsFound !== null){
                friends = people.filter(function(n){
                    for (var i = 0; i < friendsFound.length; i++){
                        if (n.id === friendsFound[i]){
                            return n;
                        }

                    }
                });
            }
            foundNothing = false;
        }
    });

    if (foundNothing){
        friends = null;
    }

    return friends;
}

//console.log(getFriends(2)) // [{id: 1, name: 'Brad', friends: [2,5,6]}, {id: 3, name: 'Tom', friends: [2, 5]}]
//console.log(getFriends(4)) // []
//console.log(getFriends(100500)) // null