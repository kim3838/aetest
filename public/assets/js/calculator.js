
var calculatorDisplayElement = document.getElementById('calculator-display');
var recentlyEnteredSign = false;
var value = {
    raw : '',
    log: [

    ]
};
var CALC = {
    NUMBER : 0,
    OPERATOR : 1,
    SETTLE : 2
};
var delegate = {
    '1' : {type: CALC.NUMBER, value : 1},
    '2' : {type: CALC.NUMBER, value : 2},
    '3' : {type: CALC.NUMBER, value : 3},
    '4' : {type: CALC.NUMBER, value : 4},
    '5' : {type: CALC.NUMBER, value : 5},
    '6' : {type: CALC.NUMBER, value : 6},
    '7' : {type: CALC.NUMBER, value : 7},
    '8' : {type: CALC.NUMBER, value : 8},
    '9' : {type: CALC.NUMBER, value : 9},
    '0' : {type: CALC.NUMBER, value : 0},
    '+' : {type: CALC.OPERATOR, value : 'add'},
    '-' : {type: CALC.OPERATOR, value : 'subtract'},
    '=' : {type: CALC.SETTLE}
};



function cast(i){

    switch (delegate[i].type){
        case CALC.NUMBER:
            recentlyEnteredSign = false;
            value.raw = value.raw + i
            buildLog(delegate[i]);
            display(value.raw);
            break;
        case CALC.OPERATOR:
            if (recentlyEnteredSign) return;
            recentlyEnteredSign = true;
            value.raw = value.raw + i;
            buildLog(delegate[i]);
            display(value.raw);
            break;
        case CALC.SETTLE:
            if (recentlyEnteredSign) return;
            recentlyEnteredSign = false;
            if(logContainsOperator()){
                settle();
            };
            break;
    }

}

function logContainsOperator(){
    return value.log.filter(function(log){
        return log.type == CALC.OPERATOR;
    }).length;
}

function buildLog(i){
    if (value.log.length) {

        var recentLog = value.log[value.log.length - 1];

        if (i.type == recentLog.type) {
            recentLog.value = recentLog.value.concat(i.value.toString());
        } else {
            value.log.push({
                value: i.value.toString(),
                type: i.type
            });
        }
    } else {
        value.log.push({
            value: i.value.toString(),
            type: i.type
        });
    }
}

function settle(){

    var preValue = '';
    var operator = '';
    value.log.forEach(function(log, index){
        if (index == 0) {
            switch (log.type){
                case CALC.NUMBER:
                    preValue = log.value;
                    break;
                case CALC.OPERATOR:
                    preValue = (log.value == 'subtract' ? '-' : '');
                    break;
            }
        } else {
            switch (log.type){
                case CALC.NUMBER:
                    if (operator) {
                        preValue = this[operator](preValue, log.value);
                        operator = '';
                    } else {
                        preValue = preValue.concat(log.value);
                    }
                    break;
                case CALC.OPERATOR:
                    operator = log.value;
                    break;
            }
        }
    });


    var postLog = [];

    if (parseInt(preValue) < 0) {
        postLog.push({
            value: 'subtract',
            type: CALC.OPERATOR
        });
        postLog.push({
            value: (Math.abs(parseInt(preValue))).toString(),
            type: CALC.NUMBER
        });
    } else {
        postLog.push({
            value: preValue,
            type: CALC.NUMBER
        });
    }

    value.log = postLog;
    value.raw = preValue;
    display(preValue);
}

function add(i, j){
    return (parseInt(i) + parseInt(j)).toString();
}

function subtract(i, j){
    return (parseInt(i) - parseInt(j)).toString();
}

function display(text){
    calculatorDisplayElement.value = text;
}

display(value.raw);