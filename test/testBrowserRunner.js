let Vue = require('Vue')
let BrowserRunner = require('./testBrowserRunnerView.vue')
let DynamicImageVue = require('./pages/home/DynamicImageVue.js')
let EventBus = require('./JS/eventBus.js')

function runBrowserTests() {
    let vm = new Vue({
        render(h) {
            return h(BrowserRunner, {
                props: {
                    suites: {
                        'Views': DynamicImageVue
                    }
                }
            })
        }
    })
    let replaceEl = document.createElement('div')
    document.body.appendChild(replaceEl)
    vm.$mount(replaceEl)
}

module.exports = {runBrowserTests}
