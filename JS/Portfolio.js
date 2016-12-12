/**
 * Created by August on 2016-12-06.
 */

function Portfolio(images, containerId){

    var imageContainers = [];

    init();

    function init() {

        for(var i = 0; i < images.length; i++)
            images[i].setResolutionIndexLimit(0);

        DynamicImageLoader.loadAllImages(images)
            .onSet(function (loadedImages) {
                initPortfolio(images, loadedImages);
            });
    }

    function initPortfolio(dynamicImages, imageElements) {

        for (var i = 0; i < imageElements.length; i++) {
            var imageContainer = document.createElement("div");

            //set library_window id to thumbnailContainer class in the main.css
            imageContainer.setAttribute("class", "thumbnailContainer");
            imageContainers.push(imageContainer);

            imageContainer.appendChild(imageElements[i]);

            //Add lightbox link
            imageContainer.appendChild(newLightboxLink(dynamicImages[i].getHighestResolutionSource()));

            var descriptionDiv = document.createElement("div");
            //change id library_window_description to imageDescription class in main.css
            descriptionDiv.setAttribute("class", "imageDescription");

            //Adding description elements.
            descriptionDiv.appendChild(newTextTag("h1", dynamicImages[i].header));
            descriptionDiv.appendChild(newTextTag("h2", dynamicImages[i].subHeader));
            descriptionDiv.appendChild(newTextTag("p", dynamicImages[i].description));

            imageContainer.appendChild(descriptionDiv);

            imageElements[i].setAttribute("class", "thumbnail");

            fitImageContainersToContainer(imageContainers, containerId);
            adjustPortfolioWrapperMargins();
        }

        window.addEventListener("resize", resizeReload);

        function resizeReload(){
            if(!document.getElementById(containerId)){
                window.removeEventListener("resize", resizeReload);
                console.log("Removed event listener for portfolio.");
            }
            else {
                fitImageContainersToContainer(imageContainers, containerId);
                adjustPortfolioWrapperMargins();
            }
        }
    }
}

function fitImageContainersToContainer(imageContainers, containerId){
    var preferredImageSize = 300;

    var container = document.getElementById(containerId);
    var imagesPerRowFactor = container.offsetWidth / preferredImageSize;
    var fittedImagesPerRow = Math.floor(imagesPerRowFactor);

    var imageScaleFactor = 1 + ((imagesPerRowFactor - fittedImagesPerRow) / fittedImagesPerRow);
    var heightPixelSize = Math.floor(preferredImageSize * imageScaleFactor);
    var widthPercentage = 100 / fittedImagesPerRow;

    for(var i = 0; i < imageContainers.length; i++) {
        setSizePercentageWidthPixelHeight(imageContainers[i], widthPercentage, heightPixelSize);
        container.appendChild(imageContainers[i]);
    }

}

function setSizePercentageWidthPixelHeight(element, width, heightPixels){
    element.style.width = width + "%";
    element.style.height = heightPixels-3 + "px";
}

function newLightboxLink(href){
    var link = document.createElement("a");
    link.setAttribute("class", "lightboxLink");
    link.setAttribute("href", href);
    link.setAttribute("data-lightbox", "digitalart");

    return link;
}

function newTextTag(tagName, text){
    var element = document.createElement(tagName);
    element.innerHTML = text;

    return element;
}

function adjustPortfolioWrapperMargins(){
    var newMargin = document.getElementById("footer").offsetHeight;
    document.getElementById("portfolio_wrapper").style.marginBottom = newMargin + "px";
}