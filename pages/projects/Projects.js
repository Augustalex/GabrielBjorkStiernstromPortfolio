let ProjectsView = require('./Projects.vue')
let Vue = require('vue')

module.exports = function (projects, containerId) {
    
    return {
        init
    }
    
    async function init() {
        let nameOfSelectedProject = window.location.hash.split('/').pop()
        let projectName = fromKebabToCamelCase(nameOfSelectedProject);
        let currentOpenProject = projects.find(p => p.name === projectName)
        
        new Vue({
            data: {
                currentOpenProject
            },
            render(h) {
                return h(ProjectsView, {
                    props: {
                        containerId,
                        projects,
                        currentOpenProject: this.currentOpenProject,
                    },
                    on: {
                        'openProject': this.openProject,
                        'closeProject': this.closeProject
                    }
                })
            },
            methods: {
                openProject(project) {
                    this.currentOpenProject = project;
                    this.currentOpenProject.images.forEach(i => i.image.load())
                },
                closeProject() {
                    this.currentOpenProject = null;
                    window.location.hash = '/projects'
                }
            }
        }).$mount(`#${containerId}`)
    }
    
    function fromKebabToCamelCase(string) {
        return string.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    }
}