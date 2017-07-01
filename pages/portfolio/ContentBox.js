/**
 * Created by August on 2016-12-31.
 */

/**
 * A lightweight substitute for the LightBox plugin.
 * This is a popup that appears when clicking on an image.
 * You can browser through all images via this popup.
 *
 * //TODO Add videos
 * //TODO Add scrolling view (such as Facebook or Twitter video feed)
 * @constructor
 */
module.exports = function () {
    
    let containerClass = "ContentBox";
    let imageClass = "ContentBoxImage";
    
    let attributeName = "data-high-res";
    
    return {
        start
    }
    
    function start() {
        let images = document.getElementsByClassName("thumbnail")
        
        for (let i = 0; i   < images.length; i++) {
            images[i].onclick = onClick;
        }
    }
    
    function onClick(event) {
        let image = event.target;
        setupContainer(image);
    }
    
    function newImage() {
        let image = document.createElement("img");
        image.setAttribute("class", imageClass);
        
        return image;
    }
    
    function loadImage(imageContainer, imageSource) {
        let image = newImage();
        
        let loadingBox = new LoadingBox();
        loadingBox.start(imageContainer);
        
        image.onload = function () {
            loadingBox.stop();
            imageContainer.appendChild(image);
        };
        
        image.src = imageSource;
    }
    
    function setupContainer(image) {
        let container = getContainer();
        document.body.appendChild(container);
        container.style.opacity = 1;
        loadImage(container, image.getAttribute(attributeName));
        
        setupContainerClickEvents(container);
    }
    
    function getContainer() {
        if (document.getElementsByClassName(containerClass).length > 0)
            return document.getElementsByClassName(containerClass)[0];
        else
            return newContainer();
    }
    
    function newContainer() {
        let container = document.createElement("div");
        container.setAttribute("class", containerClass);
        
        return container;
    }
    
    function setupContainerClickEvents(containerElement) {
        containerElement.onclick = exitContainerClick;
        containerElement.style.pointerEvents = "all";
    }
    
    function exitContainerClick(event) {
        if (event.target.getAttribute("class") === containerClass)
            clearContainer(event.target);
    }
    
    function clearContainer(container) {
        container.onclick = undefined;
        container.innerHTML = "";
        container.style.opacity = 0;
        container.style.pointerEvents = "none";
    }
    
}

function LoadingBox() {
    let container = null;
    
    let loadingBoxClass = "loading-box";
    let element = newLoadingBoxElement();
    
    let loadingInterval = null;
    let loadingProgressionSpeed = 600;
    
    let loadingCharacter = ".";
    
    let currentLoadingProgress = 0;
    let maxProgressionBeforeReset = 10;
    
    this.start = function (loadingBoxContainer) {
        container = loadingBoxContainer;
        
        clearAndInsertLoadingBox();
        startLoading();
    };
    
    this.stop = function () {
        removeLoadingBox();
    };
    
    function clearAndInsertLoadingBox() {
        container.innerHTML = "";
        container.appendChild(element);
    }
    
    function removeLoadingBox() {
        container.innerHTML = "";
        clearInterval(loadingInterval);
        loadingInterval = null;
    }
    
    function startLoading() {
        if (!loadingInterval)
            loadingInterval = setInterval(progressLoading, loadingProgressionSpeed);
    }
    
    function progressLoading() {
        if (currentLoadingProgress > maxProgressionBeforeReset) {
            element.innerHTML = "";
            currentLoadingProgress = 0;
        }
        else {
            element.innerHTML += loadingCharacter;
            currentLoadingProgress++;
        }
    }
    
    function newLoadingBoxElement() {
        let element = document.createElement("div");
        element.setAttribute("class", loadingBoxClass);
        return element;
    }
}