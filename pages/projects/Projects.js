/**
 * Created by August on 2016-12-06.
 */
const ContentFlow = require('./ContentFlow.js')
let parseHTML = require('../../JS/parseHTML.js')

module.exports = function (projects, containerId) {
    
    let imageContainers = [];
    
    init();
    
    async function init() {
        let projectThumbnails = await Promise.all(projects.map(loadProjectThumbnail))
        imageContainers.push(...projectThumbnails)
        let container = document.getElementById(containerId)
        
        imageContainers.forEach(i => {
            container.appendChild(i)
        })
        
        adjustProjectsWrapperMargins()
        appendFlexSpacers(imageContainers, container)
        
        window.addEventListener("resize", resizeReload);
        window.addEventListener("orientationchange", resizeReload);
    }
    
    async function loadProjectThumbnail(project) {
        let image = await project.thumbnailImage.load();
        let thumbnail = createThumbnailContainer({
            header: project.header,
            description: project.description,
            image
        })
        
        thumbnail.onclick = () => {
            let contentFlow = ContentFlow();
            contentFlow.start(project.images)
            project.images.forEach(i => i.image.load())
        }
        
        return thumbnail;
    }
    
    function resizeReload() {
        let container = document.getElementById(containerId)
        if (!container) {
            window.removeEventListener("resize", resizeReload);
            window.removeEventListener("orientationchange", resizeReload);
        }
        else {
            appendFlexSpacers(imageContainers, container)
            adjustProjectsWrapperMargins();
        }
    }
}

function appendFlexSpacers(imageContainers, container) {
    let imagesPerRowFactor = container.offsetWidth / imageContainers[0].offsetWidth;
    let fittedImagesPerRow = Math.max(1, Math.floor(imagesPerRowFactor));
    let leftOverFrames = Math.floor(imageContainers.length / fittedImagesPerRow);
    if (leftOverFrames === 0) {
        let dummies = document.getElementsByClassName('dummyThumbnail')
        for (let i = 0; i < dummies.length; i++) {
            dummies.remove()
        }
    }
    if (imageContainers.length % fittedImagesPerRow !== 0) {
        let dummies = document.getElementsByClassName('dummyThumbnail')
        if (dummies.length > leftOverFrames) {
            let toRemove = dummies.length - leftOverFrames
            for (let i = 0; i < toRemove; i++) {
                dummies[i].remove()
            }
        }
        else if (dummies.length < leftOverFrames) {
            let toAdd = leftOverFrames - dummies.length;
            for (let i = 0; i < toAdd; i++) {
                let dummy = createThumbnailContainer({isDummy: true})
                container.appendChild(dummy)
            }
        }
    }
}

function createThumbnailContainer({image, header, description, isDummy}) {
    let hasDescription = !!description
    
    let container = parseHTML(`<div class="thumbnailContainer"></div>`)
    let imageElement = !isDummy ? image : parseHTML('<div class="thumbnail"></div>')
    imageElement.className += ' thumbnail'
    let descriptionElement = parseHTML(`<div class="imageDescription">
            <h1>${header || ''}</h1>
            ${hasDescription ? `<p>${description}</p>` : ''}
        </div>`)
    container.appendChild(imageElement)
    container.appendChild(descriptionElement)
    if (isDummy) {
        container.style.opacity = '0'
        container.className += ' dummyThumbnail'
    }
    
    return container
}

function fitThumbnailsToContainer(imageContainers, containerId) {
    let marginPixels = 10;
    let preferredImageWidth = 550;
    let ratio = 2.2
    
    let container = document.getElementById(containerId);
    let imagesPerRowFactor = container.offsetWidth / preferredImageWidth;
    let fittedImagesPerRow = Math.floor(imagesPerRowFactor);
    
    let imageScaleFactor = 1 + ((imagesPerRowFactor - fittedImagesPerRow) / fittedImagesPerRow);
    let heightPixelSize = Math.floor(preferredImageWidth * imageScaleFactor / ratio);
    let screenEstateFactor = (container.offsetWidth - fittedImagesPerRow * (marginPixels * 2)) / container.offsetWidth
    let widthPercentage = screenEstateFactor * 100 / fittedImagesPerRow;
    
    for (let i = 0; i < imageContainers.length; i++) {
        let element = imageContainers[i];
        element.style.width = `${widthPercentage * 0.99}%`;
        element.style.height = `${heightPixelSize}px`;
        element.style.margin = `${marginPixels}px`;
        container.appendChild(imageContainers[i]);
    }
}

function adjustProjectsWrapperMargins() {
    let newMargin = document.getElementById("footer").offsetHeight;
    document.getElementById("portfolioLibrary").style.marginBottom = newMargin + "px";
}