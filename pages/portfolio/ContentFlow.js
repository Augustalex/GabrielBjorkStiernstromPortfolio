let parseHTML = require('../../JS/parseHTML.js')
let LoadingBox = require('./LoadingBox.js')

module.exports = function (deps = {}) {
    
    let containerClass = deps.containerClass || "ContentFlowContainer";
    let flowElementClass = deps.containerClass || "ContentFlow";
    let imageClass = deps.imageClass || "ContentFlowImage";
    
    return {
        start
    }
    
    function start(images) {
        let flowContainer = getOrCreateFlowContainer();
        let flowElement = parseHTML(`<div class="${flowElementClass}"></div>`)
        let closeButton = parseHTML(`<div class="contentFlowContainer-closeButton">X</div>`)
        flowContainer.appendChild(closeButton)
        flowContainer.appendChild(flowElement)
        document.getElementById("siteWrapper").appendChild(flowContainer)
        flowContainer.style.opacity = 1;
        
        images.forEach(image => {
            image.className += ` ${imageClass}`
            // loadImage(flowElement, image.getAttribute(attributeName));
            flowElement.appendChild(image)
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