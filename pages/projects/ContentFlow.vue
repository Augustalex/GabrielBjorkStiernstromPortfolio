<template>
    <site-append>
        <div class="ContentFlowContainer" @click="close">
            <div @click="close" class="contentFlowContainer-closeButton">X</div>
            <div @click.stop="" class="ContentFlow">
                <div v-for="image in images" ref="flowImages" class="contentFlow-imageWrapper">
                </div>
            </div>
        </div>
    </site-append>
</template>
<script>
    require('../../JS/site-append.js')

    module.exports = {
        props: ['images'],
        methods: {
            close() {
                this.$emit('close')
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