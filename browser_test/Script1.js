function createComment(comment, expression, defaultValue, color, colorArgument, isExpMissing) {
    var tbody = document.getElementById('tbodyContent');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var span = document.createElement('span');
    var expResult = (expression);
    var calculatedColor;
    var exp;

    // comment
    if (color) td.style.color = color;
    td.style.width = '320px';
    td.innerHTML = (comment) ? comment : '&nbsp;';
    tr.appendChild(td);

    // expression
    td = document.createElement('td');
    td.style.width = '320px';
    if (!isExpMissing || (expression !== null && expression !== undefined)) {

        if (expression === null) exp = 'null'
        else if (expression === undefined) exp = 'undefined';
        else if (Array.prototype === expression) exp = 'Array[0]';
        else exp = new String(expression).replace(/\n/g, '');

        if (/^function/.test(exp)) exp = exp.replace(/[ ]{2,}/g, ' ').replace(/\]\}/g, '] }');

        td.innerText = exp;

        colorize(td, colorArgument, expression);
    }
    tr.appendChild(td);

    // default
    var td2 = document.createElement('td');
    td2.innerText = defaultValue;
    colorize(td2, 'gray', expression);
    tr.appendChild(td2);

    tbody.appendChild(tr);
}

function colorize(td, colorArgument, expression) {
    var calculatedColor;
    var exp = td.innerText;

    if (/^null|undefined|Error/.test(exp)) calculatedColor = 'red';
    else if (/^true/.test(exp)) calculatedColor = 'blue';
    else if (/^false/.test(exp)) calculatedColor = 'purple';
    else if (/^function/.test(exp)) calculatedColor = 'brown';
    else if (/^\[|Array\[/.test(exp)) calculatedColor = 'cadetblue';
    else if (!colorArgument && typeof expression == 'string') calculatedColor = 'green';
    else if (colorArgument) calculatedColor = colorArgument;

    if (calculatedColor) td.style.color = calculatedColor;
}

function createTextComment(comment, expression, color) {
    createComment(comment, expression, '', color, null, (expression === null || expression === undefined));
}

function tryComment(comment, expression, defaultValue) {
    try {
        createComment(comment, expression(), defaultValue);
    }
    catch (ex) {
        createComment(comment, 'Error', defaultValue, null, 'red');
    }
}