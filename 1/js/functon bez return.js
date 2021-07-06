'use strict';
function printConsole(arg1, arg2, arg3){
    console.log('vizovetsy eta zapis');
    console.log(arg1);
    console.log(arg2 + 34);
}

printConsole('hello', 5, 4);

const foo = function(arg) {
    console.log(arg);
};
foo([1, 2, 3, 'esche odna function']);

const bar = (args) => {
    console.log(args);
};
bar('hello atrelochnay function');