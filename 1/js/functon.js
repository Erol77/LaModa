'use strict';
function printConsole(arg1, arg2, arg3){
    console.log('vizovetsy eta zapis');
return arg2 + arg3;
}

console.log(printConsole('hello', 5, 4));

const foo = function(arg) {
    return arg.shift();
};
console.log(foo([1, 2, 3, 'esche odna function']));

const bar = (args) => {
    return args + ' peredelal vse s return';
};
console.log(bar('strelochnay function'));