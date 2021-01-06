module.exports = function (dir, originalImage, hasLowResVersion = true) {
    let image = Object.assign({}, originalImage)
    if (originalImage.fileExtensions) {
        image.fileExtensions = [...originalImage.fileExtensions].reverse()
    }
    let [name, extension] = image.name.split('.');
    console.log('name', name, 'extension', extension);
    let defaultFileExtension = `.${extension}` || '.jpg'
    console.log('defaultFileExtension', defaultFileExtension);
    let imageElement = document.createElement('img');
    let highResPreloadDummy = new Image();
    
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
                highResPreloadDummy.onload = () => {
                    imageElement.src = path
                    resolve()
                    highResPreloadDummy.onload = null
                }
                highResPreloadDummy.src = path
            }
            else {
                console.log('!');
                imageElement.onload = () => {
                    hasLoadedLowRes = true;
                    resolve()
                    imageElement.onload = null
                }
                imageElement.src = `${lowResPath}${nextFileExtension()}`
            }
        })
    }
    
    function nextFileExtension() {
        if (image.fileExtensions) {
            return image.fileExtensions.pop() || defaultFileExtension
        }
        return defaultFileExtension
    }
}