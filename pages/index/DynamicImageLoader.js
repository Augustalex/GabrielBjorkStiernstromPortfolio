module.exports = function DynamicImageLoader() {
    
    return {
        loadAllImages,
        loadDynamicImage
    }
    
    async function loadAllImages(dynamicImages) {
        let loadedImages = await Promise.all(dynamicImages.map(image => {
            const index = i;
            const imageElement = document.createElement("img");
            loadedImages[index] = imageElement;
            return loadDynamicImage(image, imageElement)
        }));
        return loadedImages;
    }
    
    async function loadDynamicImage(dynamicImage, imageElement) {
        return new Promise((resolve, reject) => {
            dynamicImage.load()
                .onError(function (message) {
                    console.log(message);
                })
                .onSet(function (value) {
                    imageElement.onload = () => {
                        resolve(true);
                        //console.log("Loaded image at resolution level " + dynamicImage.getResolutionLevel());
                        setTimeout(function () {
                            //TODO implement loading next image first when the previous image has been shown to the screen.
                            //console.log("1 second passed.");
                            if (!dynamicImage.atHighestResolution())
                                DynamicImageLoader.loadDynamicImage(dynamicImage, imageElement);
                        }, 1000);
                    };
                    imageElement.src = value;
                });
        });
    }
};