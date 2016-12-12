function Coolshow(imageSourceArray){

    //Returns the function (before slideshow setup) if the input number of images is too small.
    if(imageSourceArray.length < 2)
        return;

    //Properties of the slideshow that may be set by the user
    var properties = {
        containerId: "coolshow",
        containerClass: 'coolshow',
        flowContainerId: "coolshowFlow",
        controllerContainerId: "coolshowControllerContainer",
        hasCustomControllers: false,
        nextButtonId: "coolshowNextButton",
        previousButtonId: "coolshowPreviousButton"
    };

    var currentSlideshowIndex = 0;

    //Carousel automatic parameters
    var carousel = {
        minOffset: 0,
        maxOffset: 0
    };

    //Setting up the main container
    var mainContainer = document.getElementsByClassName(properties.containerClass)[0];

    //Creating and adding flowContainer to the main container (and also setting proper id)
    var flowContainerElement = document.createElement("div");
    flowContainerElement.setAttribute("id", properties.flowContainerId);
    mainContainer.appendChild(flowContainerElement);

    //Creating and adding the ControllerContainer to the main container.
    var controllerContainerElement = document.createElement("div");
    controllerContainerElement.setAttribute("id", properties.controllerContainerId);
    mainContainer.appendChild(controllerContainerElement);

    init();

    function init(){
        DynamicImageLoader.loadAllImages(imageSourceArray)
            .onSet(function(loadedImages){
                console.log("loaded all images.");
                initCarousel(loadedImages);
                document.getElementsByClassName("coolshow")[0].style.visibility = "visible";

            })
    }

    function initCarousel(loadedImages){

        console.log("MainContainer", mainContainer.offsetWidth, mainContainer.offsetHeight);
        carousel = getOffsetParameters(
            {
               width: mainContainer.offsetWidth,
               height: mainContainer.offsetHeight
            },
            loadedImages
        );

        for(var i = 0; i < loadedImages.length; i++)
            flowContainerElement.appendChild(loadedImages[i]);

        //Setting up next and previous event handlers
        if(!properties.hasCustomControllers)
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

        function resizeReloader(){
            if(!document.getElementsByClassName("coolshow")[0]) {
                window.removeEventListener("resize", resizeReloader);
                window.removeEventListener("orientationchange", resizeReloader);
                console.log("Removed resize event.")
            }
            else {
                reload(loadedImages);
                console.log("loaded images", loadedImages);
            }
        }

        reload(loadedImages);
        centerCurrentImage(loadedImages, 0);

        mainContainer.style.opacity = 1;
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
    function setupControllerButtonActions(nextButton, previousButton, allImages){
        var nextHammer = new Hammer(nextButton);
        var previousHammer = new Hammer(previousButton);

        nextHammer.on("tap", function(){
            moveSlideshow(allImages, nextSlide);
        });

        previousHammer.on("tap", function(){
            moveSlideshow(allImages, previousSlide);
        });

        window.addEventListener("keyup", moveSlideshowOnArrayKeys);

        function moveSlideshowOnArrayKeys(e){
            var key = e.keyCode ? e.keyCode : e.which;

            if (key == 37)
                setTimeout(function(){
                    moveSlideshow(allImages, previousSlide);
                },0);
            else if (key == 39)
                setTimeout(function(){
                    moveSlideshow(allImages, nextSlide);
                },0);


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
    function setupControllerTouchActions(controllerContainer, allImages){
        var coolshowHammer = new Hammer(controllerContainer);

        coolshowHammer.on("swipeleft", function(){
            currentSlideshowIndex = nextSlide(allImages, currentSlideshowIndex);
            centerCurrentImage(allImages, currentSlideshowIndex);
        });

        coolshowHammer.on("swiperight", function(){
            currentSlideshowIndex = previousSlide(allImages, currentSlideshowIndex);
            centerCurrentImage(allImages, currentSlideshowIndex);
        });

    }

    function createControls(){
        console.log("Creating controls.");
        var nextButton = document.createElement("div");
        nextButton.setAttribute("id", properties.nextButtonId);
        controllerContainerElement.appendChild(nextButton);

        var previousButton = document.createElement("div");
        previousButton.setAttribute("id", properties.previousButtonId);
        controllerContainerElement.appendChild(previousButton);

    }

    /**
     * Puts focus on the next element in the slide.
     * If the current slide is the last slide, then focus
     * is put on the first slide in the slideshow.
     */
    function nextSlide(allImages, currentImageIndex){
        if(currentImageIndex >= allImages.length - 1)
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
    function previousSlide(allImages, currentImageIndex){
        if(currentImageIndex <= 0)
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
    function centerCurrentImage(allImages, currentImageIndex){

        //Starting from far left, at what X position
        // is the center of the current slideshow image.
        var offset = getImageCenterPosition(allImages, currentImageIndex);

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
    function setOffset(element, newOffset, offsetParameters){
        if(newOffset < offsetParameters.minOffset)
            newOffset = offsetParameters.minOffset;
        else if(newOffset > offsetParameters.maxOffset)
            newOffset = offsetParameters.maxOffset - 5;

        element.style.left = (newOffset * (-1)).toString() + "px";
    }

    /**
     * Returns a new object containing offset limits (min, max).
     *
     * Calculates the limitations based on the actual width
     * of all images, minus the width of the screen.
     *
     * The actual width of the images is calculated by getting
     * the scale factor between the images actual size v.s. the
     * size of the containing element in the DOM.
     *
     * @param containerDimensions
     * @param images
     * @returns {{minOffset: number, maxOffset: number}}
     */
    function getOffsetParameters(containerDimensions, images){
        var scaledImagesTotalWidth = 0;

        for(var i = 0; i < images.length; i++)
            scaledImagesTotalWidth += (containerDimensions.height / images[i].naturalHeight) * images[i].naturalWidth;

        return parameters = {
            minOffset: 0,
            maxOffset: scaledImagesTotalWidth - containerDimensions.width
        };
    }

    /**
     * Takes all loaded images and adds their width up until the specified indexed
     * image. For the specified image it only adds half of its width, and in that way
     * getting the total offset value (from the left) to the center of the specified
     * images (in the array of all loaded images).
     *
     * @param images
     * @param index
     * @returns {*}
     */
    function getImageCenterPosition(images, index){
        var leftPos = getOffset(images, index);

        console.log("[centerPosition] images", images);
        console.log("Index", index);
        leftPos += ((mainContainer.offsetHeight / images[index].naturalHeight) * images[index].naturalWidth) / 2;

        return leftPos;
    }

    /**
     * Returns the offset value from the left, of the image
     * at the specified index in an array of images.
     * @param images
     * @param index
     * @returns {number}
     */
    function getOffset(images, index){
        var offset = 0;
        for(var i = 0; i < index; i++)
            offset += (mainContainer.offsetHeight / images[i].naturalHeight) * images[i].naturalWidth;

        return offset;
    }

    function conformImagesToHeight(images, height){
        for(var i = 0; i < images.length; i++)
            images[i].style.height = height + "px";
    }

    function reload(allImages) {
        console.log("RELOAD");
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

}
