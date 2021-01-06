<template>
    <site-append>
        <div @click="close" ref="flowContainer" class="ContentFlowContainer">
            <div @click="close" class="contentFlowContainer-closeButton">X</div>
            <div @click.stop="" class="ContentFlow">
                <image-container v-for="([imageElement, imageContainer], index) in images"
                     :image-element="imageElement"
                     :image-container="imageContainer"
                     @click="imageClick(index)"
                     :key="index"
                     class="contentFlow-imageWrapper"
                    :image-id="`contentFlow-image-${index}`"
                />
            </div>
        </div>
    </site-append>
</template>
<script>
    require('../../JS/site-append.js')
    const ImageContainer = require('./ImageContainer.vue');

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
                let imageId = `.contentFlow-image-${imageIndex}`;
                let imageElement = document.querySelector(imageId);
                let offsetToCenter = window.innerHeight * .5 - imageElement.offsetHeight * .5;
                this.$refs.flowContainer.scrollTop = imageElement.offsetTop - offsetToCenter;
            }
        },
        components: {ImageContainer}
    }
</script>