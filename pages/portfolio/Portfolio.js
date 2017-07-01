/**
 * Created by August on 2016-12-06.
 */
const ContentBox = require('./ContentBox.js')
const ContentFlow = require('./ContentFlow.js')
const DynamicImage = require('../../JS/DynamicImage.js')
const DynamicImageLoader = require('../../JS/DynamicImageLoader.js')()
let parseHTML = require('../../JS/parseHTML.js')

module.exports = function (projects, containerId) {
    
    let imageContainers = [];
    
    init();
    
    async function init() {
        projects.forEach(project => {
            let thumbnail = parseHTML(
                `<div class="thumbnailContainer">
                    <img class="thumbnail" src="${project.thumbnailSrc}" />
                    <div class="imageDescription">
                        <h1>${project.header}</h1>
                        <p>${project.description}</p>
                    </div>
                </div>`
            )
            
            thumbnail.onclick = () => {
                let contentFlow = ContentFlow();
                
                contentFlow.start(project.images.map(i => i.image.getElement()))
                project.images.forEach(i => i.image.load())
            }
            
            imageContainers.push(thumbnail)
        })
        fitThumbnailsToContainer(imageContainers, containerId)
        
        window.addEventListener("resize", resizeReload);
        window.addEventListener("orientationchange", resizeReload);
    }

    function resizeReload() {
        if (!document.getElementById(containerId)) {
            window.removeEventListener("resize", resizeReload);
            window.removeEventListener("orientationchange", resizeReload);
        }
        else {
            fitThumbnailsToContainer(imageContainers, containerId);
            adjustPortfolioWrapperMargins();
        }
    }
}

function fitThumbnailsToContainer(imageContainers, containerId) {
    let preferredImageSize = 300;
    
    let container = document.getElementById(containerId);
    let imagesPerRowFactor = container.offsetWidth / preferredImageSize;
    let fittedImagesPerRow = Math.floor(imagesPerRowFactor);
    
    let imageScaleFactor = 1 + ((imagesPerRowFactor - fittedImagesPerRow) / fittedImagesPerRow);
    let heightPixelSize = Math.floor(preferredImageSize * imageScaleFactor);
    let widthPercentage = 100 / fittedImagesPerRow;
    
    for (let i = 0; i < imageContainers.length; i++) {
        setSizePercentageWidthPixelHeight(imageContainers[i], widthPercentage, heightPixelSize);
        console.log('appending container', imageContainers[i])
        container.appendChild(imageContainers[i]);
    }
    
}

function setSizePercentageWidthPixelHeight(element, width, heightPixels) {
    element.style.width = width + "%";
    element.style.height = heightPixels - 3 + "px";
}

function adjustPortfolioWrapperMargins() {
    let newMargin = document.getElementById("footer").offsetHeight;
    document.getElementById("portfolioLibrary").style.marginBottom = newMargin + "px";
}