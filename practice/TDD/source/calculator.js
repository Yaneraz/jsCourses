var calculator = {
    add: function(str){
        var defaultDelimiterExpression = /\n|,/;
        if (str.indexOf('//') === 0) {
            var customDelimiter = str[2];
            defaultDelimiterExpression = new RegExp(customDelimiter);
            str = str.substr(4);
        }

        var numbers = str.split(defaultDelimiterExpression),
            integers = numbers.map(function(val) {
             return +val;
        });

        var negatives = integers.some(function(val) {
             return val < 0;
        });

        if (negatives){
            throw new Error('negatives not allowed');
        }

        return integers.reduce(function(memo, val) {
             return memo + val;
        }, 0);
    }
};

module.exports = calculator;