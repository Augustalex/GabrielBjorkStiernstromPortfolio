/**
 * Created by August on 2016-12-31.
 */
console.log("loaded AggeBox");

/**
 * A lightweight substitute for the LightBox plugin.
 * This is a popup that appears when clicking on an image.
 * You can browser through all images via this popup.
 *
 * //TODO Add videos
 * //TODO Add scrolling view (such as Facebook or Twitter video feed)
 * @constructor
 */
function AggeBox(){

    var containerClass = "aggeBox";
    var imageClass = "aggeBoxImage";

    var attributeName = "data-high-res";

    this.start = function(){
        var images = document.getElementsByClassName("thumbnail");

        for(var i = 0; i < images.length; i++){
            console.log("Added event listener.");
            images[i].onclick = onClick;
        }
    };

    function onClick(event){
        console.log("CLICK!!");

        var image = event.target;
        console.log("Image for AggeBox: " , image);

        setupContainer(image);
    }

    function newImage(){
        var image = document.createElement("img");
        image.setAttribute("class", imageClass);

        return image;
    }

    function loadImage(imageContainer, imageSource){
        var image = newImage();

        var loadingBox = new LoadingBox();
        loadingBox.start(imageContainer);

        image.onload = function(){
            loadingBox.stop();
            imageContainer.appendChild(image);
        };

        image.src = imageSource;
    }

    function setupContainer(image){
        var container = getContainer();
        document.body.appendChild(container);
        container.style.opacity = 1;
        loadImage(container, image.getAttribute(attributeName));

        setupContainerClickEvents(container);
    }

    function getContainer(){
        if(document.getElementsByClassName(containerClass).length > 0)
            return document.getElementsByClassName(containerClass)[0];
        else
            return newContainer();
    }

    function newContainer(){
        var container = document.createElement("div");
        container.setAttribute("class", containerClass);

        return container;
    }

    function setupContainerClickEvents(containerElement){
        console.log("HAS SET UP CONTAINER EVENTS");
        containerElement.onclick = exitContainerClick;
        containerElement.style.pointerEvents = "all";
    }

    function exitContainerClick(event){
        console.log("inside exitContainerClick");
        if(event.target.getAttribute("class") != containerClass)
            console.log("Click was not outside image!");
        else {
            clearContainer(event.target);
            console.log("Container should be gone.");
        }
    }

    function clearContainer(container){
        container.onclick = undefined;
        container.innerHTML = "";
        container.style.opacity = 0;
        container.style.pointerEvents = "none";
    }

}

function LoadingBox(){
    var container = null;

    var loadingBoxClass = "loading-box";
    var element = newLoadingBoxElement();

    var loadingInterval = null;
    var loadingProgressionSpeed = 600;

    var loadingCharacter = ".";

    var currentLoadingProgress = 0;
    var maxProgressionBeforeReset = 10;

    this.start = function(loadingBoxContainer){
        container = loadingBoxContainer;

        clearAndInsertLoadingBox();
        startLoading();

        console.log("Loading progression has started.");
    };

    this.stop = function(){
        removeLoadingBox();
        console.log("Loading progression has stopped.");
    };

    function clearAndInsertLoadingBox(){
        container.innerHTML = "";
        container.appendChild(element);
    }

    function removeLoadingBox(){
        container.innerHTML = "";
        clearInterval(loadingInterval);
        loadingInterval = null;
    }

    function startLoading(){
        if(loadingInterval != null)
            console.log("Stop the current loading progression before starting a new one.");
        else
            loadingInterval = setInterval(progressLoading, loadingProgressionSpeed);
    }

    function progressLoading(){
        if(currentLoadingProgress > maxProgressionBeforeReset) {
            element.innerHTML = "";
            currentLoadingProgress = 0;
        }
        else{
            element.innerHTML += loadingCharacter;
            currentLoadingProgress++;
        }
    }

    function newLoadingBoxElement(){
        var element = document.createElement("div");
        element.setAttribute("class", loadingBoxClass);
        return element;
    }
}