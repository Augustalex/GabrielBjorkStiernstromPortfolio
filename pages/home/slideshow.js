const QuickImage = require('../../JS/QuickImage.js')
const quickImageBatchLoader = require('../../JS/quickImageBatchLoader.js')

const Vue = require('vue')
const SlideshowView = require('./Slideshow.vue')

module.exports = function (imagesRootFolder) {
    
    return {
        show
    }
    
    async function show(wrapperSelector) {
        let replaceElement = document.createElement('div')
        let wrapper = document.querySelector(wrapperSelector)
        wrapper.appendChild(replaceElement)
        
        const slideshowImages = await loadPortfolioJSON()
        let images = slideshowImages.map(i => {
            return QuickImage(imagesRootFolder, i)
        })
        let imageElements = images.map(i => i.getElement())
        let batchLoader = quickImageBatchLoader.BatchLoader(images)
        await batchLoader.next().value //loading first two low res images
        
        new Vue({
            data: {
                allImagesLoaded: false
            },
            render(h) {
                return h(SlideshowView, {
                    props: {
                        images: imageElements,
                        allImagesLoaded: this.allImagesLoaded
                    },
                    on: {
                        'loadRestLowResImages': this.loadRestLowResImages
                    }
                })
            },
            methods: {
                async loadRestLowResImages() {
                    await batchLoader.next().value
                    this.allImagesLoaded = true
                    this.loadAllHighResImages()
                },
                async loadAllHighResImages() {
                    await batchLoader.next().value
                }
            }
        }).$mount(replaceElement)
    }
}

async function loadPortfolioJSON() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', 'slideshow.json')
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText))
            }
            else {
                reject(xhr.status)
                console.log('Failed to load portfolio.', xhr.status)
            }
        }
        xhr.send()
    })
}