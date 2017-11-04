let parseHTML = require('../../JS/parseHTML.js')
let LoadingBox = require('./LoadingBox.js')

module.exports = function (deps = {}) {
    
    let containerClass = deps.containerClass || "ContentFlowContainer";
    let flowElementClass = deps.containerClass || "ContentFlow";
    let imageClass = deps.imageClass || "ContentFlowImage";
    
    return {
        start
    }
    
    function start(imageFiles) {
        let images = imageFiles.map(i => i.image.getElement())
        
        let flowContainer = getOrCreateFlowContainer();
        let flowElement = parseHTML(`<div class="${flowElementClass}"></div>`)
        let closeButton = parseHTML(`<div class="contentFlowContainer-closeButton">X</div>`)
        flowContainer.appendChild(closeButton)
        flowContainer.appendChild(flowElement)
        document.getElementById("siteWrapper").appendChild(flowContainer)
        flowContainer.style.opacity = 1;
        
        imageFiles.forEach(file => {
            file.image.getElement().className += ` ${imageClass}`
            // loadImage(flowElement, file.getAttribute(attributeName));
            let imageHeaderHTML = file.header ? `
                <div class="contentFlow-imageHeader">
                    ${file.header}
                </div>
            ` : ''
            let imageDescriptionHTML = file.description ? `
                <div class="contentFlow-imageDescription">
                    ${file.description}
                </div>
            ` : ''
            let el = parseHTML(`<div class="contentFlow-imageWrapper"></div>`)
            if(file.name) el.appendChild(file.image.getElement())
            // el.appendChild(parseHTML(`<div class="contentFlow-imageTextWrapper">${imageHeaderHTML}${imageDescriptionHTML}</div>`))
            flowElement.appendChild(el)
        })
        
        closeButton.onclick = () => {
            clearContainer(flowContainer)
            delete closeButton.onclick
        }
        
        flowContainer.onclick = event => {
            if (event.target.getAttribute("class") === containerClass)
                clearContainer(flowContainer)
        }
        flowContainer.style.pointerEvents = "all";
    }
    
    function getOrCreateFlowContainer() {
        if (document.getElementsByClassName(containerClass).length > 0)
            return document.getElementsByClassName(containerClass)[0]
        else
            return parseHTML(`<div class="${containerClass}"></div>`)
    }
    
    function clearContainer(container) {
        container.onclick = undefined;
        container.innerHTML = "";
        container.style.opacity = 0;
        container.style.pointerEvents = "none";
    }
    
}