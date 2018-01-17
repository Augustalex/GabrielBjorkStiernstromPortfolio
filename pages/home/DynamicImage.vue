<template>
    <!--<img :src="path" @load="imageLoad"/>-->
    <!--<img style="display: none" :src="preloadSrc" @load="preloadImageLoad"/>-->
</template>
<script>

    const EXT = '.jpg'

    module.exports = {
        props: [
            'imageData',
            'imageRootFolder',
//            'canLoadLowRes',
//            'canLoadHighRes'
        ],
        data() {

            return {
//                loadedLowRes: false,
//                loadedHighRes: false,
//                preloadDummy: new Image()
            }
        },
//        watch: {
//            canLoadHighRes() {
//                this.preloadDummy.src = this.highResPath
//            }
//        },
        computed: {
            lowResPath() {
                return `${this.imageRootFolder}/${this.imageData.name}_low${EXT}`
            },
//            highResPath() {
//                return `${this.imageRootFolder}/${this.imageData.name}_high${EXT}`
//            },
//            path() {
//                if (this.canLoadLowRes) {
//                    return this.lowResPath()
//                }
//                if (this.loadedHighRes) {
//                    return this.highResPath()
//                }
//            },
//            preloadSrc() {
//                if(this.canLoadHighRes) return this.highResPath()
//                return null
//            },
//            loadingHighRes() {
//                return !!this.preloadSrc
//            }
        },
//        methods: {
//            imageLoad() {
//
//            },
//            preloadImageLoad() {
//                this.loadedHighRes = true
//            }
//        }
    }
</script>