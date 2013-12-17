'use strict';

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

var keys = {
    enter: 13,
    del: 46,
    up: 38,
    left: 37,
    right: 39,
    down: 40
};

function TableTraverser(){
    var self = this,
        elem,
        prevItem = null,
        currentItem = null;

    this.init = function(){
        this.drawTable();
        this.attachEvents();
    };

    this.drawTable = function(){
        var body = document.getElementById('tbl'),
            tbl  = elem = document.createElement('table'),
            tbody  = document.createElement('tbody'),
            row = document.createElement('tr'),
            cell = document.createElement('td');

        row.appendChild(cell);
        tbody.appendChild(row);
        tbl.appendChild(tbody);
        body.appendChild(tbl);
    };

    this.attachEvents = function(){
        // mouse click on td, using delegate from previous task
        delegate.call(elem, 'td', 'onclick', function(e){
            self.makeActive(this);
        });

        window.onkeydown = function(e){
            if (e.keyCode === keys.up){
                self.move('up');
            }

            if (e.keyCode === keys.down){
                self.move('down');
            }

            if (e.keyCode === keys.left){
                self.move('left');
            }

            if (e.keyCode === keys.right){
                self.move('right');
            }

            if (e.keyCode === keys.enter && !e.shiftKey){
                self.addRow();
            } else if (e.keyCode === keys.enter && e.shiftKey) {
                self.addCell();
            }

            if (e.keyCode === keys.del && !e.shiftKey){
                self.removeRow();
            } else if (e.keyCode === keys.del && e.shiftKey) {
                self.removeCell();
            }
        }
    };
    this.addCell = function(){
        for (var i = 0; i < elem.rows.length; i++){
            elem.rows[i].insertCell(elem.rows[0].cells.length - 1);
        }
    };
    this.addRow = function(){
        var row = elem.insertRow(elem.rows.length);

        for (var i = 0; i < elem.rows[0].cells.length; i++){
            row.insertCell();
        }
    };
    this.removeRow = function(){
        if (elem.rows.length !== 1){
            elem.deleteRow(elem.rows.length - 1);
        }
    };
    this.removeCell = function(){
        for (var i = 0; i < elem.rows.length; i++){
            if (elem.rows[i].cells.length !== 1){
                elem.rows[i].deleteCell(elem.rows[0].cells.length - 1);
            }
        }
    };
    this.makeActive = function(item){
        if (prevItem) {
            prevItem.className = '';
        }
        currentItem = item;
        currentItem.className = 'active';

        prevItem = currentItem;
    };

    // movement
    this.move = function(direction){
        var currentRow = isTd(currentItem) ? currentItem.parentNode : currentItem;

         switch (direction){
             case 'up':
                 if (currentRow && currentRow.rowIndex > 0){
                     isTd(currentItem)
                         ? self.makeActive(elem.rows[currentRow.rowIndex - 1].cells[currentItem.cellIndex])
                         : self.makeActive(elem.rows[currentRow.rowIndex - 1]);
                 }
                 else if (currentRow && currentRow.rowIndex === 0){
                     self.makeActive(elem);
                 }
                 break;

             // feature: selects table on left arrow press
             case 'left':
                 if (currentItem && currentItem.cellIndex > 0){
                     self.makeActive(currentRow.cells[currentItem.cellIndex - 1]);
                 }
                 else if (currentItem && currentItem.cellIndex === 0){
                     self.makeActive(currentRow);
                 }
                 else if (currentItem === currentRow){
                     self.makeActive(elem);
                 }
                 break;

             case 'down':
                 if (currentRow && currentRow.rowIndex < elem.rows.length - 1){
                     isTd(currentItem)
                         ? self.makeActive(elem.rows[currentRow.rowIndex + 1].cells[currentItem.cellIndex])
                         : self.makeActive(elem.rows[currentRow.rowIndex + 1]);
                 }
                 else if (currentItem === elem){
                     self.makeActive(elem.rows[0]);
                 }
                 break;

             case 'right':
                 if (currentItem === elem){
                     self.makeActive(elem.rows[0]);
                 }
                 else if (currentItem && currentItem.cellIndex < currentRow.cells.length - 1){
                     self.makeActive(currentRow.cells[currentItem.cellIndex + 1]);
                 }
                 else if (currentRow && currentItem === currentRow){
                     self.makeActive(currentRow.cells[0]);
                 }

                 break;
         }
    };

    function isTd(node){
         return node && node.tagName.toLowerCase() === 'td';
    }
}

(new TableTraverser()).init();
