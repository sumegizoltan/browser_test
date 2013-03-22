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
    var td1 = document.createElement('td');
    td1.style.width = '320px';
    if (!isExpMissing) {

        if (expression === null) exp = 'null'
        else if (expression === undefined) exp = 'undefined';
        else if (Array.prototype === expression) exp = 'Array[0]';
        else if (Number.prototype === expression) exp = 'Number';
        else if (Boolean.prototype === expression) exp = 'Boolean';
        else if (String.prototype === expression) exp = 'String';
        else if (Function.prototype === expression) exp = expression + '';
        else exp = new String(expression).replace(/\n/g, '');

        if (/^function/.test(exp)) exp = exp.replace(/[ ]{2,}/g, ' ').replace(/\]\}/g, '] }').replace(/Empty\(\) \{ \}/g, 'Empty() {}');

        td1.innerText = exp;

        colorize(td1, colorArgument, expression);
    }
    tr.appendChild(td1);

    // default
    var td2 = document.createElement('td');
    td2.innerText = defaultValue;
    colorize(td2, 'gray', expression);
    tr.appendChild(td2);

    if (td2.innerText && td1.innerText != td2.innerText) {
        td.style.backgroundColor = td1.style.backgroundColor = 'BurlyWood';
    }

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
    else if (/Number|Boolean|String|Function|Date|RegExp/.test(exp)) calculatedColor = 'cadetblue';
    else if (exp == '0') calculatedColor = 'OrangeRed';
    else if (colorArgument) calculatedColor = colorArgument;

    if (calculatedColor) td.style.color = calculatedColor;
}

function createTextComment(comment, expression, color) {
    createComment(comment, expression, '', color, null, (expression === null || expression === undefined));
}

function tryComment(comment, expression, defaultValue, colorArgument) {
    try {
        createComment(comment, expression(), defaultValue, null, colorArgument);
    }
    catch (ex) {
        createComment(comment, 'Error', defaultValue, null, 'red');
    }
}