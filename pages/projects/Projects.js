/**
 * Created by August on 2016-12-06.
 */
const ContentFlow = require('./ContentFlow.js')
let parseHTML = require('../../JS/parseHTML.js')

module.exports = function (projects, containerId) {
    
    let imageContainers = [];
    
    return {
        init,
        loadProjectByHash
    }
    
    async function init() {
        let projectThumbnails = await Promise.all(projects.map(setupProjectThumbnail))
        imageContainers.push(...projectThumbnails)
        let container = document.getElementById(containerId)
        
        imageContainers.forEach(i => {
            container.appendChild(i)
        })
        
        window.addEventListener("resize", resizeReload);
        window.addEventListener("orientationchange", resizeReload);
    }
    
    function loadProjectByHash(hash) {
        let lastPart = hash.split('/').pop()
        let projectName = lastPart.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        let project = projects.find(p => p.name === projectName)
        if (!project) return;
        
        openProject(project)
    }
    
    async function setupProjectThumbnail(project) {
        let image = await project.thumbnailImage.load();
        let thumbnail = createThumbnailContainer(image, project.header, project.description)
        
        thumbnail.onclick = () => {
            let projectNameKebabCase = project.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            window.location.hash = `/projects/${projectNameKebabCase}`
            openProject(project)
        }
        
        return thumbnail;
    }
    
    function resizeReload() {
        let container = document.getElementById(containerId)
        if (!container) {
            window.removeEventListener("resize", resizeReload);
            window.removeEventListener("orientationchange", resizeReload);
        }
    }
    
    function openProject(project) {
        let contentFlow = ContentFlow();
        contentFlow.start(project.images)
        project.images.forEach(i => i.image.load())
    }
}

function createThumbnailContainer(imageElement, header, description) {
    let container = parseHTML(`<div class="thumbnailContainer"></div>`)
    imageElement.className += ' thumbnail'
    container.appendChild(imageElement)
    let hasDescription = !!description
    let descriptionElement = parseHTML(`<div class="imageDescription">
            <h1>${header || ''}</h1>
            ${hasDescription ? `<p>${description}</p>` : ''}
        </div>`)
    container.appendChild(descriptionElement)
    
    return container
}