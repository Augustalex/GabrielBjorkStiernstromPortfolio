let requireAll = require('require-all')
let {runTests} = require('./testTools.js')

let suite = requireAll(__dirname)
delete suite['testRunner']
delete suite['testTools']

async function run() {
    await runTests(suite, 'tests')
    process.exit()
}

run()
