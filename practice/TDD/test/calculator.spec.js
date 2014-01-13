var should = require('should'),
    calculator = require('../source/calculator');

describe('calculator spec', function(){
    it('should calculator exist', function(){
        should(calculator).be.ok;
    });

    it('should return 0 for empty string', function(){
        should(calculator.add('')).equal(0);
    });

    it('should return 1 for 1', function(){
        should(calculator.add('1')).equal(1);
    });

    it('should return 2 for 2', function(){
        should(calculator.add('2')).equal(2);
    });

    it('should return 3 for 1,2', function(){
        should(calculator.add('1,2')).equal(3);
    });

    it('should return 5 for 2,3', function(){
        should(calculator.add('1,2')).equal(3);
    });

    it('should return 10 for 1,2,3,4', function(){
        should(calculator.add('1,2,3,4')).equal(10);
    });

    it('should return 20 for 2,5,6,7', function(){
        should(calculator.add('2,5,6,7')).equal(20);
    });

    it('should return 6 with new line separator', function(){
        should(calculator.add('1\n2,3')).equal(6);
    });

    it('should return 6 with several new lines', function(){
        should(calculator.add('1\n2\n3')).equal(6);
    });

    describe('different delimiters', function(){
         it('should return 3 with custom delimiter', function(){
             should(calculator.add('//;\n1;2')).equal(3);
         });
    });

    describe('negative numbers', function(){
         it('should throw exception', function(){
             (function() {
                  calculator.add('1,2,-3');
             }).should.throw('negatives not allowed')
         });
    });
});