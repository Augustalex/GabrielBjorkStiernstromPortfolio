const Coolshow = require('./slideshow.js')
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
            return QuickImage('file/img/slideshow', i)
        })
        
        let batchLoader = quickImageBatchLoader.BatchLoader(images)
        await batchLoader.next()
        batchLoader.next()
        
        let imageElements = images.map(i => i.getElement())
        initSlideshow(imageElements, wrapperSelector)
    }
    
    async function initSlideshow(images, wrapperSelector) {
        let coolshow = new Coolshow(images)
        await coolshow.show(wrapperSelector);
        windowController.reevaluateHeights();
        coolshow.recalculateSlideshow();
    }
    
}