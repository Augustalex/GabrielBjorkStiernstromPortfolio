<template>
    <div id="coolshow" :style="coolshowStyles" ref="coolshowContainer" class="coolshow">
        <div id="coolshowFlow" :style="coolshowFlowStyles" ref="coolshowFlow">
        </div>
        <div id="coolshowControllerContainer" ref="controllerContainer">
            <div id="coolshowNextButton" ref="nextButton" :style="controllerStyles"></div>
            <div id="coolshowPreviousButton" ref="previousButton" :style="controllerStyles"></div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        props: [
            'images',
            'allImagesLoaded'
        ],
        data() {
            return {
                slideshowVisible: false,
                slideshowOpacity: 0,
                currentSlideshowIndex: 0,
                controllerOpacity: 0
            }
        },
        watch: {
            allImagesLoaded(isAllImagesLoaded) {
                if (isAllImagesLoaded) {
                    this.setImagesToSlideshowHeight()
                    this.initControllers()
                }
            }
        },
        computed: {
            slideshowVisibility() {
                return this.slideshowVisible ? 'visible' : 'hidden'
            },
            coolshowStyles() {
                return {
                    visibility: this.slideshowVisibility,
                    opacity: this.slideshowOpacity
                }
            },
            controllerStyles() {
                return {
                    opacity: this.controllerOpacity
                }
            },
            coolshowFlowStyles() {
                return {
                    left: this.slideshowOffsetLeft
                }
            },
            slideshowOffsetLeft() {
                let currentImageIndex = this.currentSlideshowIndex
                let images = this.images
                if (images.length <= currentImageIndex) throw new Error("Slideshow image index out of bounds")
                if (images.some(i => !i.naturalWidth)) return '0px'

                let mainContainerElement = this.$refs.coolshowContainer
                if (!mainContainerElement) return '0px'

                let image = images[currentImageIndex]
                let leftPositionOffset = 0;
                for (let i = 0; i < currentImageIndex; i++) {
                    leftPositionOffset += (mainContainerElement.offsetHeight / images[i].naturalHeight) * images[i].naturalWidth;
                }
                let virtualImageWidth = (mainContainerElement.offsetHeight / image.naturalHeight) * image.naturalWidth;
                let offsetToCenter = leftPositionOffset - (mainContainerElement.offsetWidth - virtualImageWidth) * 0.5;

                if (offsetToCenter < this.slideshowOffsetBounds.minOffset)
                    offsetToCenter = this.slideshowOffsetBounds.minOffset;
                else if (offsetToCenter > this.slideshowOffsetBounds.maxOffset)
                    offsetToCenter = this.slideshowOffsetBounds.maxOffset - 5;

                return `${offsetToCenter * (-1)}px`
            },
            slideshowOffsetBounds() {
                let images = this.images
                let container = this.$refs.coolshowContainer

                let scaledImagesTotalWidth = 0;
                for (let i = 0; i < images.length; i++) {
                    scaledImagesTotalWidth += (container.offsetHeight / images[i].naturalHeight) * images[i].naturalWidth;
                }

                return {
                    minOffset: 0,
                    maxOffset: scaledImagesTotalWidth - container.offsetWidth
                };
            }
        },
        methods: {
            reloadOnResize() {
                this.setImagesToSlideshowHeight()

                //Force recompute properties as they are dependent on window changes not tracked by Vue
                this.currentSlideshowIndex -= 1
                this.currentSlideshowIndex += 1
            },
            setImagesToSlideshowHeight() {
                let slideshowHeight = this.$refs.coolshowFlow.offsetHeight
                let images = this.images
                for (let i = 0; i < images.length; i++) {
                    images[i].style.height = slideshowHeight + "px"
                }
            },
            initControllers() {
                this.setupControllerButtonActions()
                this.controllerOpacity = 1
                this.setupControllerTouchActions()
                window.addEventListener("keyup", this.onKeyUp.bind(this))
            },
            setupControllerButtonActions() {
                let nextHammer = new Hammer(this.$refs.nextButton)
                nextHammer.on("tap", this.nextSlide.bind(this))
                let previousHammer = new Hammer(this.$refs.previousButton)
                previousHammer.on("tap", this.previousSlide.bind(this))
            },
            setupControllerTouchActions() {
                let coolshowHammer = new Hammer(this.$refs.controllerContainer)
                coolshowHammer.on("swipeleft", this.nextSlide.bind(this))
                coolshowHammer.on("swiperight", this.previousSlide.bind(this))
            },
            onKeyUp(event) {
                let key = event.keyCode ? event.keyCode : event.which
                if (key === 37) {
                    this.previousSlide()
                }
                else if (key === 39) {
                    this.nextSlide()
                }
            },
            nextSlide() {
                if (this.currentSlideshowIndex >= this.images.length - 1) {
                    this.currentSlideshowIndex = 0
                }
                else {
                    this.currentSlideshowIndex = this.currentSlideshowIndex + 1
                }
            },
            previousSlide() {
                if (this.currentSlideshowIndex <= 0) {
                    this.currentSlideshowIndex = this.images.length - 1
                }
                else {
                    this.currentSlideshowIndex = this.currentSlideshowIndex - 1
                }
            }
        },
        mounted() {
            this.images.forEach(image => {
                this.$refs.coolshowFlow.appendChild(image)
            })

            this.setImagesToSlideshowHeight()
            this.slideshowVisible = true
            this.slideshowOpacity = 1

            window.addEventListener("resize", this.reloadOnResize.bind(this))
            window.addEventListener("orientationchange", this.reloadOnResize.bind(this))

            this.$emit('loadRestLowResImages')
        },
        destroyed() {
            window.removeEventListener("resize", this.reloadOnResize)
            window.removeEventListener("orientationchange", this.reloadOnResize)
            window.removeEventListener("keyup", this.onKeyUp)
        }
    }
</script>