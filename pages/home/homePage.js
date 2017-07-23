
const Coolshow = require('./slideshow.js')
const DynamicImage = require('../../JS/DynamicImage.js')
const DynamicImageLoader = require('../../JS/DynamicImageLoader.js')()
const windowController = require('../../JS/windowController.js')

const slideshowImages = require('./slideshow.json')
const QuickImage = require('../../JS/QuickImage.js')
const quickImageBatchLoader = require('../../JS/quickImageBatchLoader.js')

module.exports = function () {
    
    return {
        show
    }
    
    async function show(wrapperSelector) {
        let images = slideshowImages.map(i => {
            return QuickImage('../../file/img/slideshow', i)
        })
        
        quickImageBatchLoader.loadAllImages(images).then(() => {
            console.log('loaded all images!')
            initSlideshow(images, wrapperSelector)
        })
    }
    
    async function initSlideshow(images, wrapperSelector) {
        let coolshow = new Coolshow(images)
        await coolshow.show(wrapperSelector);
        windowController.reevaluateHeights();
        coolshow.recalculateSlideshow();
    }
    
}