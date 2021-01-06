module.exports = function (dir, originalImage, hasLowResVersion = true) {
    let image = Object.assign({}, originalImage)
    if (originalImage.fileExtensions) {
        image.fileExtensions = [...originalImage.fileExtensions].reverse()
    }
    let [name, extension] = image.name.split('.');
    let defaultFileExtension = `.${extension}` || '.jpg'
    let imageElement = document.createElement('img');
    let highResPreloadDummy = new Image();
    
    let lowResPath = `${dir}/${name}_low`
    let highResPath = `${dir}/${name}_high`
    let hasLoadedLowRes = false;
    let onLoadHighResCallback = () => {};

    return {
        getElement: () => imageElement,
        load,
        onLoadHighRes(callback) {
            onLoadHighResCallback = callback;
        }
    }
    
    function load() {
        return new Promise(resolve => {
            if (hasLoadedLowRes || !hasLowResVersion) {
                let path = `${highResPath}${nextFileExtension()}`
                highResPreloadDummy.onload = () => {
                    imageElement.src = path
                    resolve();
                    highResPreloadDummy.onload = null
                    onLoadHighResCallback();
                }
                highResPreloadDummy.src = path
            }
            else {
                imageElement.onload = () => {
                    hasLoadedLowRes = true;
                    resolve();
                    imageElement.onload = null;

                    load()
                        .catch(error => {
                            console.error('Low res image with name "' + image.name + '" finished loading, but it failed loading its corresponding high res image.', error);
                        });
                }
                imageElement.src = `${lowResPath}${nextFileExtension()}`
            }
        })
    }
    
    function nextFileExtension() {
        return defaultFileExtension;
    }
}