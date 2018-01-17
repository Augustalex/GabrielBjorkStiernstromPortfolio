<template>
    <div>
        <div v-for="suite in suites">
            <div v-if="suite.isTest" :class="testClasses(suite)">
                <div v-if="suite.passed">
                    "{{ suite.name }}" passed!
                </div>
                <div v-else-if="suite.failed">
                    "{{ suite.name }}" FAILED
                </div>
                <div v-else>
                    Running "{{ suite.name }}"...
                </div>
                <div v-if="suite.lastRun">
                    Last run: {{ suite.lastRun }}
                </div>
                <button @click="runAgainClick(suite)">Run again</button>
                <button @click="analyzeFlakynessClick(suite)">Analyze flakyness</button>
                <div v-if="suite.flakyness">
                    Flakyness factor: {{ suite.flakyness }}
                </div>
            </div>
            <div class="test-suite" v-else>
                <h1 class="test-suiteTitle">{{ suite.name }}</h1>
                <test-suite :initialSuites="suite.suite"/>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        props: ['initialSuites'],
        data() {
            return {
                suites: [...this.initialSuites].map(s => ({
                    name: s.name,
                    isTest: s.isTest,
                    message: '',
                    failed: false,
                    passed: false,
                    suite: s.suite,
                    lastRun: 0,
                    flakyness: 0
                }))
            }
        },
        methods: {
            testClasses(suite) {
                let classes = ['test-status'];
                if (suite.passed) {
                    classes.push('test-status--passed');
                }
                else if (suite.failed) {
                    classes.push('test-status--failed');
                }
                else {
                    classes.push('test-status--running');
                }
                return classes;
            },
            runAgainClick(suite) {
                let testDom = document.querySelector('#testDom')
                runTest(suite, testDom)
            },
            analyzeFlakynessClick(suite) {
                let testDom = document.querySelector('#testDom')
                runFlakynessAnalysis(suite, testDom)
            }
        },
        name: 'test-suite',
        async mounted() {
            let testDom = document.querySelector('#testDom')
            for(let suite of this.suites) {
                await runTest(suite, testDom)
            }
        }
    }

    async function runTest(suite, testDom){
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
            finally {
                console.log('run test')
                suite.lastRun = new Date()
            }
        }
        else {
            console.log('suite is not test')
        }
    }

    async function runFlakynessAnalysis (suite, testDom) {
        let fails = 0;
        for(let i = 0; i < 100; i++) {
            if (suite.isTest) {
                try {
                    await suite.test({testDom})
                }
                catch (ex) {
                    fails++;
                }
            }
        }
        console.log('flakyness', (100 - fails) / 100)
        suite.flakyness = (100 - fails) / 100;
    }

</script>