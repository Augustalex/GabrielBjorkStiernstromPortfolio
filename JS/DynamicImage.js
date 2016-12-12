/**
 * Created by August on 2016-12-05.
 */
/**
 *
 * Returns a Promise when called with "load" method.
 *
 * Mainly used to dynamically load more heavy images into
 * an element as soon as they become available, starting with
 * the a more lightweight low resolution image and ending
 * with a beautiful full resolution photo.
 *
 * Parameters may include certain size limitations on what
 * images too load depending on the platform requesting them.
 *
 * @constructor
 */
function DynamicImage(){
    var currentIndex = 0;
    var resolutionIndexLimit = null;
    this.imageArray = [];

    this.description = "";
    this.header = "";
    this.subHeader = "";

    /**
     * Returns true if the current loaded Image source is
     * the highest available resolution.
     * @returns {boolean}
     */
    this.atHighestResolution = function(){
        if(resolutionIndexLimit != null && currentIndex >= resolutionIndexLimit)
            return true;
        else if(currentIndex >= this.imageArray.length)
            return true;
        else
            return false;
    };

    this.getResolutionLevel = function(){
        return currentIndex;
    };

    this.getHighestResolutionSource = function(){
        return this.imageArray[this.imageArray.length-1];
    };

    this.setResolutionIndexLimit = function(indexLimit){
        resolutionIndexLimit = indexLimit;
    };

    this.getNextResolutionIndex = function(){
        if(resolutionIndexLimit != null
            && resolutionIndexLimit < currentIndex
            && resolutionIndexLimit < this.imageArray.length)
                return resolutionIndexLimit;
        else if(currentIndex < this.imageArray.length)
            return currentIndex++;
        else
            return this.imageArray.length - 1;
    };

    /**
     * Will add the Image source string together with
     * a priorityValue, which indicates a higher priority
     * with a lower number.
     *
     * @param imageSrc
     */
    this.addImage = function(imageSrc){
        this.imageArray.push(imageSrc);
        return this;
    };

    this.setHeader = function(header){
        this.header = header;
        return this;
    };

    this.setSubHeader = function(subHeader){
        this.subHeader = subHeader;
        return this;
    };

    this.setDescription = function(description){
        this.description = description;
        return this;
    };

    /**
     * Will get the highest priority images currently in the pool
     * and load it through the given imageInjectionFunction.
     * @returns {Promise}
     */
    this.load = function(){
        var imageSource = this.imageArray[this.getNextResolutionIndex()];
        return new Promise().set(imageSource);
    };
}

var DynamicImageLoader = {
    loadAllImages: function(dynamicImages){
        var loadedImages = new Array(dynamicImages.length);

        const loadedImagesPromise = new Promise();

        var countdown = new Countdown(dynamicImages.length, function(){
            loadedImagesPromise.set(loadedImages);
        });

        for(var i = 0; i < dynamicImages.length; i++) {
            const index = i;
            const img = document.createElement("img");

            loadedImages[index] = img;

            DynamicImageLoader.loadDynamicImage(dynamicImages[index], img)
                .onSet(function(value){
                    countdown.tick();
                });

        }

        return loadedImagesPromise;
    },
    loadDynamicImage: function(dynamicImage, imageElement){
        const loadedTruePromise = new Promise();

        dynamicImage.load()
            .setToHold()
            .onError(function(message){
                console.log(message);
            })
            .onSet(function(value){
                imageElement.onload = function(){
                    loadedTruePromise.set(true);
                    console.log("Loaded image at resolution level " + dynamicImage.getResolutionLevel());
                    setTimeout(function(){
                        //TODO implement loading next image first when the previous image has been shown to the screen.
                        console.log("1 second passed.");
                        if(!dynamicImage.atHighestResolution())
                            DynamicImageLoader.loadDynamicImage(dynamicImage, imageElement);
                    }, 1000);
                };

                imageElement.src = value;
            });

        return loadedTruePromise;
    }
};