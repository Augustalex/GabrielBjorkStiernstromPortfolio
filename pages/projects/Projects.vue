<template>
    <div :id="containerId">
        <div v-for="project in projects" @click="thumbnailClick(project)" class="thumbnailContainer">
            <img :src="project.thumbnailSrc" class="thumbnail">
            <div class="imageDescription">
                <h1>
                    {{ project.header }}
                </h1>
                <p v-if="project.description">
                    {{ project.description }}
                </p>
            </div>
        </div>
        <content-flow
                v-if="currentOpenProject"
                :images="currentOpenProjectImages"
                @close="closeProject">
        </content-flow>
    </div>
</template>
<script>
    let ContentFlowView = require('./ContentFlow.vue')

    module.exports = {
        props: [
            'containerId',
            'projects',
            'currentOpenProject'
        ],
        computed: {
            currentOpenProjectImages() {
                if (!this.currentOpenProject) return null

                return this.currentOpenProject.images.map(i => [i.image.getElement(), i.image])
            }
        },
        methods: {
            thumbnailClick(project) {
                let projectNameKebabCase = project.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                window.location.hash = `/projects/${projectNameKebabCase}`
                this.openProject(project)
            },
            openProject(project) {
                this.$emit('openProject', project)
            },
            closeProject() {
                this.$emit('closeProject')
            }
        },
        mounted() {
            if (this.currentOpenProject) {
                this.currentOpenProject.images.forEach(i => i.image.load())
            }
        },
        components: {
            'content-flow': ContentFlowView
        }
    }
</script>