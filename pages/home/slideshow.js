const parseHTML = require('../../JS/parseHTML.js')

const containerClass = 'coolshow'
const flowContainerId = 'coolshowFlow'
const controllerContainerId = 'coolshowControllerContainer'
const nextButtonId = 'coolshowNextButton'
const previousButtonId = 'coolshowPreviousButton'

module.exports = function (images) {
    
    let currentSlideshowIndex = 0;
    
    let carouselBounds = {
        minOffset: 0,
        maxOffset: 0
    };
    
    return {
        show,
        recalculateSlideshow: () => recalculateImageDimensions(images)
    }
    
    async function show(wrapperSelector) {
        let root = parseHTML(
            `<div id="coolshow" class="coolshow">
                <div id="${flowContainerId}"></div>
                <div id="${controllerContainerId}">
                    <div id="${nextButtonId}"></div>
                    <div id="${previousButtonId}"></div>
                </div>
            </div>`
        )
        let rootElement = document.querySelector(wrapperSelector)
        rootElement.innerHTML = root.outerHTML
        
        images.forEach(image => {
            let flowContainer = rootElement.querySelector(`#${flowContainerId}`)
            flowContainer.appendChild(image)
        })
        
        initControllers(images)
        recalculateImageDimensions(images)
        centerCurrentImage(images, 0)
        
        document.querySelector('#coolshow').style.opacity = 1
        root.style.visibility = "visible";
        
        window.addEventListener("resize", reloadOnResize);
        window.addEventListener("orientationchange", reloadOnResize);
    }
    
    function initControllers(images) {
        setupControllerButtonActions(
            document.getElementById(nextButtonId),
            document.getElementById(previousButtonId),
            images
        );
        setupControllerTouchActions(
            document.getElementById("coolshowControllerContainer"),
            images
        );
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
            
            if (key === 37) {
                setTimeout(function () {
                    moveSlideshow(allImages, previousSlide);
                }, 0)
            }
            else if (key === 39) {
                setTimeout(function () {
                    moveSlideshow(allImages, nextSlide);
                }, 0)
            }
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
    function centerCurrentImage(images, currentImageIndex) {
        if (images.length <= currentImageIndex) throw new Error("Slideshow image index out of bounds")
        if (images.some(i => !i.naturalWidth)) return;
        // if (images.some(i => i.naturalWidth === undefined)) return;
        
        let mainContainerElement = document.getElementsByClassName(containerClass)[0]
        if (!mainContainerElement) return
        let flowContainerElement = document.getElementById(flowContainerId)
        
        let image = images[currentImageIndex]
        let leftPositionOffset = 0;
        for (let i = 0; i < currentImageIndex; i++)
            leftPositionOffset += (mainContainerElement.offsetHeight / images[i].naturalHeight) * images[i].naturalWidth;
        let virtualImageWidth = (mainContainerElement.offsetHeight / image.naturalHeight) * image.naturalWidth;
        let offsetToCenter = leftPositionOffset - (mainContainerElement.offsetWidth - virtualImageWidth) * 0.5;
        setOffset(flowContainerElement, offsetToCenter);
    }
    
    /**
     * Sets the left offset of a DOM element but with limitations
     * as defined in the offsetParameters object (min and max limitations).
     * @param element
     * @param newOffset
     */
    function setOffset(element, newOffset) {
        if (newOffset < carouselBounds.minOffset)
            newOffset = carouselBounds.minOffset;
        else if (newOffset > carouselBounds.maxOffset)
            newOffset = carouselBounds.maxOffset - 5;
        
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
     * @param images
     * @returns {{minOffset: number, maxOffset: number}}
     */
    function getOffsetParameters(images) {
        let container = document.getElementsByClassName(containerClass)[0]
        if (!container) throw new Error("No slideshow container element present.")
        
        let scaledImagesTotalWidth = 0;
        
        for (let i = 0; i < images.length; i++)
            scaledImagesTotalWidth += (container.offsetHeight / images[i].naturalHeight) * images[i].naturalWidth;
        
        return {
            minOffset: 0,
            maxOffset: scaledImagesTotalWidth - container.offsetWidth
        };
    }
    
    function conformImagesToHeight(images, height) {
        for (let i = 0; i < images.length; i++) {
            images[i].style.height = height + "px";
        }
    }
    
    function reloadOnResize() {
        let slideshowIsPresent = document.getElementsByClassName("coolshow")[0]
        if (!slideshowIsPresent) {
            window.removeEventListener("resize", reloadOnResize);
            window.removeEventListener("orientationchange", reloadOnResize);
        }
        else {
            recalculateImageDimensions(images);
        }
    }
    
    function recalculateImageDimensions(allImages) {
        let flowContainer = document.getElementById(flowContainerId)
        
        carouselBounds = getOffsetParameters(allImages);
        conformImagesToHeight(allImages, flowContainer.offsetHeight);
        centerCurrentImage(allImages, currentSlideshowIndex);
    }
}
