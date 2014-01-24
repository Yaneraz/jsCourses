var res = 0;
for (var i = 2; i < process.argv.length; i++){
    res += parseInt(process.argv[i], 10);
}
console.log(res);