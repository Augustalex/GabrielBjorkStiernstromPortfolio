const DynamicImage = require('../../JS/DynamicImage.js')
const DynamicImageLoader = require('../../JS/DynamicImageLoader.js')()

module.exports = function (imageSourceArray) {
    let self = this;
    
    //Returns the function (before slideshow setup) if the input number of coolshowImages is too small.
    if (imageSourceArray.length < 2)
        return;
    
    //Properties of the slideshow that may be set by the user
    let properties = {
        containerId: "coolshow",
        containerClass: 'coolshow',
        flowContainerId: "coolshowFlow",
        controllerContainerId: "coolshowControllerContainer",
        hasCustomControllers: false,
        nextButtonId: "coolshowNextButton",
        previousButtonId: "coolshowPreviousButton"
    };
    
    let currentSlideshowIndex = 0;
    
    //Carousel automatic parameters
    let carousel = {
        minOffset: 0,
        maxOffset: 0
    };
    
    //Setting up the main container
    let mainContainer = document.getElementsByClassName(properties.containerClass)[0]
    
    //Creating and adding flowContainer to the main container (and also setting proper id)
    let flowContainerElement = document.createElement("div")
    flowContainerElement.setAttribute("id", properties.flowContainerId);
    mainContainer.appendChild(flowContainerElement);
    
    //Creating and adding the ControllerContainer to the main container.
    let controllerContainerElement = document.createElement("div")
    controllerContainerElement.setAttribute("id", properties.controllerContainerId);
    mainContainer.appendChild(controllerContainerElement);
    
    this.start = async function () {
        try {
            let loadedImages = await DynamicImageLoader.loadAllImages(imageSourceArray)
            initCarousel(loadedImages);
            document.getElementsByClassName("coolshow")[0].style.visibility = "visible";
        }
        catch (err) {
            console.log("\nCould not load all images: " + err.message);
        }
    };
    
    function initCarousel(loadedImages) {
        carousel = getOffsetParameters(
            {
                width: mainContainer.offsetWidth,
                height: mainContainer.offsetHeight
            },
            loadedImages
        );
        
        for (let i = 0; i < loadedImages.length; i++)
            flowContainerElement.appendChild(loadedImages[i]);
        
        //Setting up next and previous event handlers
        if (!properties.hasCustomControllers)
            createControls();
        
        setupControllerButtonActions(
            document.getElementById(properties.nextButtonId),
            document.getElementById(properties.previousButtonId),
            loadedImages
        );
        
        setupControllerTouchActions(
            document.getElementById("coolshowControllerContainer"),
            loadedImages
        );
        
        window.addEventListener("resize", resizeReloader);
        window.addEventListener("orientationchange", resizeReloader);
        
        function resizeReloader() {
            if (!document.getElementsByClassName("coolshow")[0]) {
                window.removeEventListener("resize", resizeReloader);
                window.removeEventListener("orientationchange", resizeReloader);
            }
            else {
                reload(loadedImages);
            }
        }
        
        reload(loadedImages);
        centerCurrentImage(loadedImages, 0);
        
        mainContainer.style.opacity = 1;
        
        // windowLoaderPromise.set(true); //TODO fix loading pages and promises with that
        
        self.reevaluateImageSize = function () {
            reload(loadedImages);
        };
    }
    
    /**
     * Sets up action listeners on controllers for the slideshow and attaches
     * events to them, such as switching to the next or previous slide.
     *
     * This function uses methods as defined by the Hammer.js library.
     * @param nextButton
     * @param previousButton
     * @param allImages
     */
    function setupControllerButtonActions(nextButton, previousButton, allImages) {
        let nextHammer = new Hammer(nextButton)
        let previousHammer = new Hammer(previousButton)
        
        nextHammer.on("tap", function () {
            moveSlideshow(allImages, nextSlide);
        });
        
        previousHammer.on("tap", function () {
            moveSlideshow(allImages, previousSlide);
        });
        
        window.addEventListener("keyup", moveSlideshowOnArrayKeys);
        
        function moveSlideshowOnArrayKeys(e) {
            let key = e.keyCode ? e.keyCode : e.which
            
            if (key === 37)
                setTimeout(function () {
                    moveSlideshow(allImages, previousSlide);
                }, 0);
            else if (key === 39)
                setTimeout(function () {
                    moveSlideshow(allImages, nextSlide);
                }, 0);
        }
    }
    
    function moveSlideshow(allImages, switchFunction) {
        currentSlideshowIndex = switchFunction(allImages, currentSlideshowIndex);
        centerCurrentImage(allImages, currentSlideshowIndex);
    }
    
    /**
     * Sets up touch action listeners on controllers for the slideshow and attaches
     * events to them, such as switching to the next or previous slide.
     *
     * This function uses methods as defined by the Hammer.js library.
     * @param controllerContainer
     * @param allImages
     */
    function setupControllerTouchActions(controllerContainer, allImages) {
        let coolshowHammer = new Hammer(controllerContainer)
        
        coolshowHammer.on("swipeleft", function () {
            currentSlideshowIndex = nextSlide(allImages, currentSlideshowIndex);
            centerCurrentImage(allImages, currentSlideshowIndex);
        });
        
        coolshowHammer.on("swiperight", function () {
            currentSlideshowIndex = previousSlide(allImages, currentSlideshowIndex);
            centerCurrentImage(allImages, currentSlideshowIndex);
        });
        
    }
    
    function createControls() {
        let nextButton = document.createElement("div")
        nextButton.setAttribute("id", properties.nextButtonId);
        controllerContainerElement.appendChild(nextButton);
        
        let previousButton = document.createElement("div")
        previousButton.setAttribute("id", properties.previousButtonId);
        controllerContainerElement.appendChild(previousButton);
        
    }
    
    /**
     * Puts focus on the next element in the slide.
     * If the current slide is the last slide, then focus
     * is put on the first slide in the slideshow.
     */
    function nextSlide(allImages, currentImageIndex) {
        if (currentImageIndex >= allImages.length - 1)
            return 0;
        else
            return currentImageIndex + 1;
        
        //centerCurrentImage(allImages, currentImageIndex);
    }
    
    /**
     * Puts focus on the previous element in the slide.
     * If the current slide is the first slide, then focus
     * is put on the last slide in the slideshow.
     */
    function previousSlide(allImages, currentImageIndex) {
        if (currentImageIndex <= 0)
            return allImages.length - 1;
        else
            return currentImageIndex - 1;
        
        //centerCurrentImage(allImages, currentImageIndex);
    }
    
    /**
     * Centers the scroll of the slideshow to center on
     * the current focused slide.
     *
     * Takes into account the total offset (from the left)
     * of the focused image and then adjust it to the width
     * of the slideshow. With the final calculated offset
     * it sets the x-scroll value of containing element to
     * center the focused image.
     */
    function centerCurrentImage(allImages, currentImageIndex) {
        
        //Starting from far left, at what X position
        // is the center of the current slideshow image.
        let offset = getImageCenterPosition(allImages, currentImageIndex);
        
        //Get the offset to be the actual center of the view (the slideshow).
        offset -= mainContainer.offsetWidth / 2;
        
        setOffset(flowContainerElement, offset, carousel);
    }
    
    /**
     * Sets the left offset of a DOM element but with limitations
     * as defined in the offsetParameters object (min and max limitations).
     * @param element
     * @param newOffset
     * @param offsetParameters
     */
    function setOffset(element, newOffset, offsetParameters) {
        if (newOffset < offsetParameters.minOffset)
            newOffset = offsetParameters.minOffset;
        else if (newOffset > offsetParameters.maxOffset)
            newOffset = offsetParameters.maxOffset - 5;
        
        element.style.left = (newOffset * (-1)).toString() + "px";
    }
    
    /**
     * Returns a new object containing offset limits (min, max).
     *
     * Calculates the limitations based on the actual width
     * of all coolshowImages, minus the width of the screen.
     *
     * The actual width of the coolshowImages is calculated by getting
     * the scale factor between the coolshowImages actual size v.s. the
     * size of the containing element in the DOM.
     *
     * @param containerDimensions
     * @param images
     * @returns {{minOffset: number, maxOffset: number}}
     */
    function getOffsetParameters(containerDimensions, images) {
        let scaledImagesTotalWidth = 0;
        
        for (let i = 0; i < images.length; i++)
            scaledImagesTotalWidth += (containerDimensions.height / images[i].naturalHeight) * images[i].naturalWidth;
        
        return {
            minOffset: 0,
            maxOffset: scaledImagesTotalWidth - containerDimensions.width
        };
    }
    
    /**
     * Takes all loaded coolshowImages and adds their width up until the specified indexed
     * image. For the specified image it only adds half of its width, and in that way
     * getting the total offset value (from the left) to the center of the specified
     * coolshowImages (in the array of all loaded coolshowImages).
     *
     * @param images
     * @param index
     * @returns {*}
     */
    function getImageCenterPosition(images, index) {
        let leftPos = getOffset(images, index);
        
        leftPos += ((mainContainer.offsetHeight / images[index].naturalHeight) * images[index].naturalWidth) / 2;
        
        return leftPos;
    }
    
    /**
     * Returns the offset value from the left, of the image
     * at the specified index in an array of coolshowImages.
     * @param images
     * @param index
     * @returns {number}
     */
    function getOffset(images, index) {
        let offset = 0;
        for (let i = 0; i < index; i++)
            offset += (mainContainer.offsetHeight / images[i].naturalHeight) * images[i].naturalWidth;
        
        return offset;
    }
    
    function conformImagesToHeight(images, height) {
        for (let i = 0; i < images.length; i++) {
            images[i].style.height = height + "px";
            
            //testing mini-lightbox
            images[i].setAttribute("data-image-opened", images[i].src);
        }
    }
    
    function reload(allImages) {
        carousel = getOffsetParameters(
            {
                width: mainContainer.offsetWidth,
                height: mainContainer.offsetHeight
            },
            allImages
        );
        
        conformImagesToHeight(allImages, flowContainerElement.offsetHeight);
        
        //currentSlideshowIndex = 0;
        centerCurrentImage(allImages, currentSlideshowIndex);
    }
    
    this.reevaluateImageSize = function () {
        console.log("No images to reevaluate.");
    }
    
}
