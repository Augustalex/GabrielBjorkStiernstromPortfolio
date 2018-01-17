<template>
    <div>
        <div ref="testDom" id="testDom">
        </div>
        <div id="reporter">
            <div class="test-suite">
                <test-suite :initialSuites="parsedSuites" />
            </div>
        </div>
    </div>
</template>
<script>
    let TestSuiteView = require('./TestSuite.vue')

    module.exports = {
        props: ['suites'],
        data() {
            let parsedSuites = parseSuites(this.suites)
            return {
                parsedSuites
            }
        },
        components: {
            'test-suite': TestSuiteView
        },
        async mounted() {
            let testDom = document.querySelector('#testDom')
            for (let suite of this.parsedSuites) {
                if (suite.isTest) {
                    try {
                        await suite.test({testDom})
                        suite.passed = true;
                    }
                    catch (ex) {
                        if ('actual' in ex && 'expected' in ex) {
                            suite.failed = true
                            suite.message = `(Assertion failed): ${suite.name}`
                        }
                        else {
                            suite.failed = true
                            suite.message = `(Did not compile): ${suite.name}\n\tError message: ${ex.message}`
                        }
                    }
                }
            }
        }
    }

    function parseSuites(suites) {
        return Object.keys(suites).map(suiteName => {
            let testOrSuite = suites[suiteName]
            let isTest = typeof testOrSuite === 'function'

            let data = {name: suiteName, isTest}
            if (isTest) {
                data.test = testOrSuite
            }
            else {
                if ('setUp' in testOrSuite) {
                    data.setUp = testOrSuite.setUp
                }
                if ('tearDown' in testOrSuite) {
                    data.tearDown = testOrSuite.tearDown
                }
                data.suite = parseSuites(testOrSuite)
            }

            return data
        })
    }

    async function p(root, testDom) {
        console.log('root', root)

        async function r(suite) {
            if (suite.isTest) {
                try {
                    await suite.test({testDom})
                }
                catch (ex) {
                    console.log('ex', ex)
                    if ('actual' in ex && 'expected' in ex) {
                        console.log('1')
                        suite.failed = true
                        suite.message = `(Assertion failed): ${suite.name}`
                    }
                    else {
                        console.log('2')
                        suite.failed = true
                        suite.message = `(Did not compile): ${suite.name}\n\tError message: ${ex.message}`
                    }
                }
                finally {
                    console.log('finally', suite.name, suite)
                }
            }
            else {
                for (let s of suite.suite) {
                    await r(s)
                }
            }
        }

        await r(root)
    }

    async function runTests(suite, testDom) {
        if (!suite.isTest) {

        }
        let focusedTestKeys = Object.keys(tests) || Object.keys(tests).filter(t => t.startsWith('=>'))

        let hasSetup = tests['setUp']
        let hasTearDown = tests['tearDown']
        let context = {testDom}

        let activeKeys = focusedTestKeys.length ? focusedTestKeys : Object.keys(tests)
        console.log(tests)
        for (let key of activeKeys) {
            if (hasSetup) await tests.setUp.bind(context)()
            if (key === 'setUp' || key === 'tearDown') continue;

            let test = tests[key]
            await runTestOrSuite(key, test, context)
            if (hasTearDown) await tests.tearDown.bind(context)()
        }
    }

    async function runTestOrSuite(testName, testObj, testContext) {
        if (testObj.isTest) {
            try {
                await testObj.test.bind(testContext)();
                testObj.passed = true
            }
            catch (ex) {
                if ('actual' in ex && 'expected' in ex) {
                    testObj.failed = true
                    testObj.message = `(Assertion failed): ${testName}`
                }
                else {
                    testObj.failed = true
                    testObj.message = `(Did not compile): ${testName}\n\tError message: ${ex.message}`
                }
            }
        }
        else {
            await runTests(testObj, testName)
        }
    }
</script>

