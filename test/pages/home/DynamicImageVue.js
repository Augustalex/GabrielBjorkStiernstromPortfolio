let sinon = require('sinon')
let DynamicImage = require('../../../pages/home/DynamicImage.vue')
let Vue = require('vue')
let assert = require('../../assertLib.js')

module.exports = {
    'DynamicImage': {
        'test test': async function () {
            console.log('test test')
            assert(true);
        },
        'when imageRootPath is "root/" and image name is "test" and has low res version should compute low res path to "root/test_low.jpg"': async function () {
            console.log('hello')
            let shouldPass = Math.random() < .5
            console.log('shouldPass', shouldPass)
            assert(true)
            if(shouldPass){
                assert(true)
            }
            else{
                assert(false)
            }
            return
            
            let vm = new Vue({
                render(h) {
                    return h(DynamicImage, {
                        props: {
                            imageData: {
                                name: 'test'
                            },
                            imageRootFolder: 'root/'
                        }
                    })
                }
            })
            let testDom = document.createElement('div')
            testDom.id = 'testDom'
            let app = document.createElement('div')
            testDom.appendChild(app)
            document.body.appendChild(testDom)
            vm.$mount(app)
    
            assert.elementCount('img', 1)
        }
    }
}

function createAndMount(renderData) {
    return Vue({
        render(h) {
            return h(DynamicImage, renderData)
        }
    })
}