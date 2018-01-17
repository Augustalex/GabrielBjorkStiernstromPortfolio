let sinon = require('sinon');
let Sizzle = require('sizzle');
let _assert = require('assert');
let utils = require('./utils.js');
let match = utils.match;

function getUniqueElement(selectorOrElement) {
    if (typeof selectorOrElement === 'string') {
        let elements = Sizzle(selectorOrElement);
        let count = elements.length;
        if (count !== 1) {
            let errorMessage = 'Exactly one element must match selector "' + selectorOrElement + '" but found ' + count;
            throw new Error(errorMessage);
        }
        return elements[0];
    }
    if (selectorOrElement instanceof HTMLElement) {
        return selectorOrElement;
    }
    throw new Error('Illegal argument: Must be selector or HTMLElement');
}

function getElementCount(selector) {
    return Sizzle(selector).length;
}

function getElementClasses(selector) {
    let element = getUniqueElement(selector);
    return Array.from(element.classList);
}

function getElementText(selector) {
    let element = getUniqueElement(selector);
    return element.textContent;
}

function getElementHtml(selector) {
    let element = getUniqueElement(selector);
    return element.innerHTML;
}

let domUtils = {
    getUniqueElement: getUniqueElement,
    getElementCount: getElementCount,
    getElementClasses: getElementClasses,
    getElementText: getElementText,
    getElementHtml: getElementHtml
};

module.exports = assert;

function assert(value, message) {
    if (!value) {
        _assert.fail(value, true, message, '==', assert);
    }
}

assert.equals = function (actual, expected, message) {
    if (!sinon.deepEqual(actual, expected)) {
        _assert.fail(actual, expected, message, 'equals', assert.equals);
    }
};

assert.same = function (actual, expected) {
    _assert.strictEqual(actual, expected);
};

assert.match = function (actual, expected, message) {
    if (!match(actual, expected)) {
        _assert.fail(actual, expected, message, 'match', assert.match);
    }
};

assert.defined = function (value, message) {
    if (typeof value === 'undefined') {
        _assert.fail(value, true, message, 'defined', assert.defined);
    }
};

assert.isNull = function (value) {
    assert.same(value, null);
};

assert.exception = function (callback) {
    _assert.throws(callback);
};

assert.startsWith = function (actual, expected, message) {
    if (!actual.startsWith(expected)) {
        _assert.fail(actual, expected, message, 'startsWith');
    }
};

assert.endsWith = function (actual, expected, message) {
    if (!actual.endsWith(expected)) {
        _assert.fail(actual, expected, message, 'endsWith');
    }
};

assert.called = sinon.assert.called;
assert.calledOnce = sinon.assert.calledOnce;
assert.calledTwice = sinon.assert.calledTwice;
assert.calledThrice = sinon.assert.calledThrice;
assert.calledWith = sinon.assert.calledWith;

assert.calledOnceWith = function (stub) {
    let args = Array.prototype.slice.call(arguments, 1);
    calledXWith(1, stub, args);
};

assert.calledTwiceWith = function (stub) {
    let args = Array.prototype.slice.call(arguments, 1);
    calledXWith(2, stub, args);
};

assert.calledThriceWith = function (stub) {
    let args = Array.prototype.slice.call(arguments, 1);
    calledXWith(3, stub, args);
};

function calledXWith(times, stub, expectedArgs) {
    assert(stub.callCount >= 1, 'Stub not called at least ' + times + ' time(s)');
    
    let equalsCount = 0;
    for (let i = 0; i < stub.callCount; i++) {
        let actualArgsToMatch = stub.getCall(i).args.slice(0, expectedArgs.length);
        if (sinon.deepEqual(actualArgsToMatch, expectedArgs)) {
            equalsCount++;
        }
    }
    let message = 'Stub not called ' + times + ' time(s) with argument(s): ' + expectedArgs.map(JSON.stringify).join(', ');
    assert.equals(equalsCount, times, message);
}

module.exports = assert;

assert.elementCount = function (selector, expected, message) {
    let elementCount = domUtils.getElementCount(selector);
    if (elementCount !== expected) {
        let details = 'elementCount "' + selector + '" actual=' + elementCount + ' expected=' + expected;
        _assert.fail(elementCount, expected, message || details, 'elementCount');
    }
};

assert.elementText = function (selector, expected, message) {
    let elementText = domUtils.getElementText(selector).trim();
    if (elementText !== expected) {
        let details = 'elementText "' + selector + '" actual=' + elementText + ' expected=' + expected;
        _assert.fail(elementText, expected, message || details, 'elementText');
    }
};

assert.elementHtml = function (selector, expected, message) {
    let elementHtml = domUtils.getElementHtml(selector).trim();
    if (elementHtml !== expected) {
        let details = 'elementHtml "' + selector + '" actual=' + elementHtml + ' expected=' + expected;
        _assert.fail(elementHtml, expected, message || details, 'elementHtml');
    }
};

assert.elementHasClass = function (selector, expected, message) {
    let elementClasses = domUtils.getElementClasses(selector);
    let hasClass = elementClasses.includes(expected);
    if (!hasClass) {
        let details = 'elementHasClass "' + selector + '" actual=' + elementClasses.join(',') + ' expected=' + expected;
        _assert.fail(selector, expected, message || details, 'hasClass');
    }
};

assert.elementAttribute = function (selector, attribute, expected, message) {
    let element = domUtils.getUniqueElement(selector);
    let actualValue = element.getAttribute(attribute);
    if (actualValue !== expected) {
        let details = 'elementAttribute "' + selector + '" attribute=' + attribute
            + ' actual=' + actualValue + ' expected=' + expected;
        _assert.fail(actualValue, expected, message || details, 'elementAttribute');
    }
};

assert.elementProperty = function (selector, property, expected, message) {
    let element = domUtils.getUniqueElement(selector);
    let actualValue = element[property];
    if (actualValue !== expected) {
        let details = 'elementProperty "' + selector + '" property=' + property
            + ' actual=' + actualValue + ' expected=' + expected;
        _assert.fail(actualValue, expected, message || details, 'elementProperty');
    }
};

assert.elementAttributeStartsWith = function (selector, attribute, expected, message) {
    let element = domUtils.getUniqueElement(selector);
    let actualValue = element.getAttribute(attribute);
    if (!actualValue.startsWith(expected)) {
        let details = 'elementAttributeStartsWith "' + selector + '" attribute=' + attribute
            + ' actual=' + actualValue + ' expectedStart=' + expected;
        _assert.fail(actualValue, expected, message || details, 'elementAttributeStartsWith');
    }
};

assert.elementValue = function (selector, expected, message) {
    let element = domUtils.getUniqueElement(selector);
    let actualValue = element.value;
    if (actualValue !== expected) {
        let details = 'elementValue "' + selector + '" actual=' + actualValue + ' expected=' + expected;
        _assert.fail(actualValue, expected, message || details, 'elementValue');
    }
};

assert.elementIsChecked = function (selector, message) {
    let element = domUtils.getUniqueElement(selector);
    let actualValue = element.checked;
    if (!actualValue) {
        let details = 'elementIsChecked "' + selector + '" was NOT checked';
        _assert.fail(actualValue, true, message || details, 'elementIsChecked');
    }
};