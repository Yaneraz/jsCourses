var fs = require('fs');
//var res = fs.readFileSync(process.argv[1]);
var res = fs.readFileSync('testfile.txt ');

console.log(res.toString().split('\n').length);