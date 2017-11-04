/**
 * Created by DAW 28 on 2016-12-18.
 */

const Portfolio = require('./Projects.js')
const Project = require('../../JS/Project.js')
const projects = require('./projects.json')

module.exports = function () {
    return {
        show
    }
    
    async function show(wrapperSelector) {
        document.querySelector(wrapperSelector).innerHTML =
            `<div id="portfolioLibrary"></div>`
        
        let parsedProjects = projects.map(project => Project(project, ""))
        Portfolio(parsedProjects, "portfolioLibrary");
    }
}