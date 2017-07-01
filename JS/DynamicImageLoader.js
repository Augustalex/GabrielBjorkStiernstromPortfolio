module.exports = function DynamicImageLoader() {
    
    return {
        loadAllImages,
        loadDynamicImage
    }
    
    async function loadAllImages(dynamicImages) {
        let loadedImages = await Promise.all(dynamicImages.map(image => {
            const imageElement = document.createElement("img");
            return loadDynamicImage(image, imageElement)
        }));
        return loadedImages;
    }
    
    async function loadDynamicImage(dynamicImage, imageElement) {
        let image = await dynamicImage.load()
        return new Promise((resolve, reject) => {
            imageElement.onload = () => {
                resolve(imageElement);
                setTimeout(function () {
                    //TODO implement loading next image first when the previous image has been shown to the screen.
                    if (!dynamicImage.atHighestResolution())
                        loadDynamicImage(dynamicImage, imageElement);
                }, 1000);
            };
            imageElement.src = image;
        });
    }
};