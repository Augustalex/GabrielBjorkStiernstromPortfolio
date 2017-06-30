/*      DYNAMIC IMAGES      */

/**
 * Created by August on 2016-12-05.
 */
/**
 *
 * Returns a Promise when called with "load" method.
 *
 * Mainly used to dynamically load more heavy coolshowImages into
 * an element as soon as they become available, starting with
 * the a more lightweight low resolution image and ending
 * with a beautiful full resolution photo.
 *
 * Parameters may include certain size limitations on what
 * coolshowImages too load depending on the platform requesting them.
 *
 * @constructor
 */
module.exports = function DynamicImage() {
    let currentIndex = 0;
    let resolutionIndexLimit = null;
    let imageArray = [];
    
    let description = "";
    let header = "";
    let subHeader = "";
    
    return {
        atHighestResolution,
        getResolutionLevel,
        getHighestResolutionSource,
        setResolutionIndexLimit,
        getNextResolutionIndex,
        addImage,
        setHeader,
        setSubHeader,
        setDescription,
        load
    }
    
    /**
     * Returns true if the current loaded Image source is
     * the highest available resolution.
     * @returns {boolean}
     */
    function atHighestResolution() {
        if (resolutionIndexLimit !== null && currentIndex >= resolutionIndexLimit)
            return true;
        else if (currentIndex >= imageArray.length)
            return true;
        else
            return false;
    }
    
    function getResolutionLevel() {
        return currentIndex;
    }
    
    function getHighestResolutionSource() {
        return imageArray[imageArray.length - 1];
    }
    
    function setResolutionIndexLimit(indexLimit) {
        resolutionIndexLimit = indexLimit;
    }
    
    function getNextResolutionIndex() {
        if (resolutionIndexLimit !== null
            && resolutionIndexLimit < currentIndex
            && resolutionIndexLimit < imageArray.length)
            return resolutionIndexLimit;
        else if (currentIndex < imageArray.length)
            return currentIndex++;
        else
            return imageArray.length - 1;
    }
    
    /**
     * Will add the Image source string together with
     * a priorityValue, which indicates a higher priority
     * with a lower number.
     *
     * @param imageSrc
     */
    function addImage(imageSrc) {
        imageArray.push(imageSrc);
        return this;
    }
    
    function setHeader(newHeader) {
        header = newHeader;
        return this;
    }
    
    function setSubHeader(newSubHeader) {
        subHeader = newSubHeader;
        return this;
    }
    
    function setDescription(newDescription) {
        description = newDescription;
        return this;
    }
    
    /**
     * Will get the highest priority coolshowImages currently in the pool
     * and load it through the given imageInjectionFunction.
     * @returns {Promise}
     */
    function load() {
        const imageSource = imageArray[getNextResolutionIndex()]
        return Promise.resolve(imageSource);
    }
}