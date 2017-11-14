/**
 * Created by DAW 28 on 2016-12-18.
 */

const Projects = require('./Projects.js')
const Project = require('../../JS/Project.js')
const projectsData = require('./projects.json')

module.exports = function () {
    return {
        show
    }
    
    async function show(wrapperSelector) {
        document.querySelector(wrapperSelector).innerHTML =
            `<div id="projectsLibrary"></div>`
        
        let parsedProjects = projectsData.map(data => Project(data, ""))
        let projectsPage = Projects(parsedProjects, "projectsLibrary");
        await projectsPage.init()
        projectsPage.loadProjectByHash(window.location.hash)
    }
}