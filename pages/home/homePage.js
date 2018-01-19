const Coolshow = require('./slideshow.js')
const windowController = require('../../JS/windowController.js')

module.exports = function () {
    
    return {
        show
    }
    
    async function show(wrapperSelector) {
        initSlideshow('file/img/slideshow', wrapperSelector)
    }
    
    async function initSlideshow(imagesRootFolder, wrapperSelector) {
        let coolshow = new Coolshow(imagesRootFolder)
        await coolshow.show(wrapperSelector);
    }
    
}