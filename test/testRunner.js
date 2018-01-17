let DynamicImageVue = require('./pages/home/DynamicImageVue.js')
let EventBus = require('./JS/eventBus.js')
let {runTests} = require('./testTools.js')

let suite = {
    'DynamicImageVue': DynamicImageVue
}

async function run() {
    await runTests(suite, 'tests')
}

run()