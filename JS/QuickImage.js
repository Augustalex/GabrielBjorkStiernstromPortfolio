
module.exports = function (dir, originalImage, hasLowResVersion = true) {
    let image = Object.assign({}, originalImage)
    if(originalImage.fileExtensions) {
        image.fileExtensions = [...originalImage.fileExtensions].reverse()
    }
    let name = image.name
    let defaultFileExtension = '.jpg'
    let imageElement = document.createElement('img')
    let preload = new Image();
    
    let lowResPath = `${dir}/${name}_low`
    let highResPath = `${dir}/${name}_high`
    let hasLoadedLowRes = false

    return {
        getElement: () => imageElement,
        load
    }
    
    function load() {
        return new Promise(resolve => {
            if (hasLoadedLowRes || !hasLowResVersion) {
                let path = `${highResPath}${nextFileExtension()}`
                preload.onload = () => {
                    imageElement.src = path
                    resolve()
                    preload.onload = null
                }
                preload.src = path
            }
            else {
                imageElement.onload = () => {
                    hasLoadedLowRes = true
                    resolve()
                    imageElement.onload = null
                }
                imageElement.src = `${lowResPath}${nextFileExtension()}`
            }
        })
    }
    
    function nextFileExtension() {
        if(image.fileExtensions){
            return image.fileExtensions.pop() || defaultFileExtension
        }
        return defaultFileExtension
    }
}