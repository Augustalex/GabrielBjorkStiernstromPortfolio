module.exports = function (dir, originalImage, hasLowResVersion = true) {
    let image = Object.assign({}, originalImage)
    if (originalImage.fileExtensions) {
        image.fileExtensions = [...originalImage.fileExtensions].reverse()
    }
    let name = image.name
    let defaultFileExtension = '.jpg'
    let imageElement = document.createElement('img')
    let highResPreloadDummy = new Image();
    
    let lowResPath = `${dir}/${name}_low`
    let highResPath = `${dir}/${name}_high`
    let hasLoadedLowRes = false
    let hasLoadedHighRes = false
    
    let listeners = {loadedLowRes: [], loadedHighRes: []}
    
    return {
        getElement: () => imageElement,
        load,
        on
    }
    
    function on(eventName, handler) {
        if (eventName === 'loadedLowRes') {
            if (hasLoadedLowRes) {
                handler()
            }
            else {
                listeners.loadedLowRes.push(handler)
            }
        }
        else if (eventName === 'loadedHighRes') {
            if (hasLoadedHighRes) {
                handler()
            }
            else {
                listeners.loadedHighRes.push(handler)
            }
        }
    }
    
    function load() {
        return new Promise(resolve => {
            if (hasLoadedLowRes || !hasLowResVersion) {
                let path = `${highResPath}${nextFileExtension()}`
                highResPreloadDummy.onload = () => {
                    doneLoadingHighRes()
                    imageElement.src = path
                    resolve()
                    highResPreloadDummy.onload = null
                }
                highResPreloadDummy.src = path
            }
            else {
                imageElement.onload = () => {
                    doneLoadingLowRes()
                    resolve()
                    imageElement.onload = null
                }
                imageElement.src = `${lowResPath}${nextFileExtension()}`
            }
        })
    }
    
    function doneLoadingLowRes() {
        hasLoadedLowRes = true
        listeners.loadedLowRes.forEach(l => l())
    }
    
    function doneLoadingHighRes() {
        hasLoadedHighRes = true
        listeners.loadedHighRes.forEach(l => l())
    }
    
    function nextFileExtension() {
        if (image.fileExtensions) {
            return image.fileExtensions.pop() || defaultFileExtension
        }
        return defaultFileExtension
    }
}