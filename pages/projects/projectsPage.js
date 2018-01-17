/**
 * Created by DAW 28 on 2016-12-18.
 */

const windowController = require('../../JS/windowController.js')
const Projects = require('./Projects.js')
const Project = require('../../JS/Project.js')

module.exports = function () {
    return {
        show
    }
    
    async function show(wrapperSelector) {
        let projectsData = await loadProjectsJSON()
        
        document.querySelector(wrapperSelector).innerHTML =
            `<div id="projectsLibrary"></div>`
        
        let parsedProjects = projectsData.map(data => Project(data, ""))
        let projectsPage = Projects(parsedProjects, "projectsLibrary");
        await projectsPage.init()
        windowController.adjustPortfolioWrapperHeightToExcludeUI();
    }
}

async function loadProjectsJSON() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', 'projects.json')
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText))
            }
            else {
                reject(xhr.status)
                console.log('Failed to load projects.', xhr.status)
            }
        }
        xhr.send()
    })
}