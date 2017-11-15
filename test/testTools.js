module.exports = {runTests}

async function runTests(tests, suiteKey, depth = 0) {
    if (suiteKey) {
        console.log(`${getTabs(depth)}${suiteKey}:`)
    }
    let focusedTestKeys = Object.keys(tests).filter(t => t.startsWith('=>'))
    
    let hasSetup = 'setUp' in tests
    let hasTearDown = 'tearDown' in tests
    let context = {}
    
    let activeKeys = focusedTestKeys.length ? focusedTestKeys : Object.keys(tests)
    for (let key of activeKeys) {
        if (hasSetup) await tests.setUp.bind(context)()
        if (key === 'setUp' || key === 'tearDown') continue;
        
        let test = tests[key]
        await runTestOrSuite(key, test, context, depth + 1)
        if (hasTearDown) await tests.tearDown.bind(context)()
    }
}

async function runTestOrSuite(testName, test, testContext, depth) {
    let hasSetup = 'setUp' in test
    let hasTearDown = 'tearDown' in test
    if (!hasSetup && !hasTearDown && typeof test !== 'object') {
        try {
            await test.bind(testContext)();
            console.log(`${getTabs(depth)}PASSED: ${testName}`)
        }
        catch (ex) {
            if ('actual' in ex && 'expected' in ex) {
                console.log(`${getTabs(depth)}FAILED (Assertion failed): ${testName}`)
            }
            else {
                console.log(`${getTabs(depth)}FAILED (Did not compile): ${testName}\n\tError message: ${ex.message}`)
            }
        }
    }
    else {
        await runTests(test, testName, depth)
    }
}

function getTabs(depth) {
    let tabs = []
    for(let i = 0; i < depth; i++){
        tabs.push('   ')
    }
    return tabs.join('')
}