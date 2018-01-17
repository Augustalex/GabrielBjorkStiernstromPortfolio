<template>
    <site-append>
        <div @click="close" ref="flowContainer" class="ContentFlowContainer">
            <div @click="close" class="contentFlowContainer-closeButton">X</div>
            <div @click.stop="" class="ContentFlow">
                <div v-for="(image, index) in images"
                     @click="imageClick(index)"
                     ref="flowImages"
                     class="contentFlow-imageWrapper">
                </div>
            </div>
        </div>
    </site-append>
</template>
<script>
    require('../../JS/site-append.js')

    module.exports = {
        props: ['images'],
        data() {
            return {
                scrollTop: 0
            }
        },
        methods: {
            close() {
                this.$emit('close')
            },
            imageClick(imageIndex) {
                let imageElement = this.$refs.flowImages[imageIndex]
                let offsetToCenter = window.innerHeight * .5 - imageElement.offsetHeight * .5
                this.$refs.flowContainer.scrollTop = imageElement.offsetTop - offsetToCenter
            }
        },
        mounted() {
            this.$refs.flowImages.forEach((flowImage, index) => {
                let image = this.images[index]
                image.classList.add('ContentFlowImage')
                flowImage.appendChild(image)
            })
        }
    }
</script>