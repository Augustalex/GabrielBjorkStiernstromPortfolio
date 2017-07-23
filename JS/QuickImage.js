
module.exports = function (dir, originalImage, hasLowResVersion = true) {
    let image = Object.assign({}, originalImage)
    if(originalImage.fileExtensions) {
        image.fileExtensions = [...originalImage.fileExtensions].reverse()
    }
    let name = image.name
    let defaultFileExtension = '.jpg'
    let imageElement = document.createElement('img')
    
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
                imageElement.onload = () => {
                    resolve()
                    imageElement.onload = null
                }
                imageElement.src = `${highResPath}${nextFileExtension()}`
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