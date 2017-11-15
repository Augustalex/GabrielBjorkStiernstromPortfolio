let parseHTML = require('../../JS/parseHTML.js')
let LoadingBox = require('./LoadingBox.js')
let EventBus = require('../../JS/EventBus.js')

module.exports = function (deps = {}) {
    
    let containerClass = deps.containerClass || "ContentFlowContainer";
    let flowElementClass = deps.containerClass || "ContentFlow";
    let imageClass = deps.imageClass || "ContentFlowImage";
    
    let eventBus = EventBus()
    
    return {
        start,
        on: eventBus.on
    }
    
    function start(imageFiles) {
        let flowContainer = getOrCreateFlowContainer();
        let flowElement = parseHTML(`<div class="${flowElementClass}"></div>`)
        let closeButton = parseHTML(`<div class="contentFlowContainer-closeButton">X</div>`)
        flowContainer.appendChild(closeButton)
        flowContainer.appendChild(flowElement)
        document.getElementById("siteWrapper").appendChild(flowContainer)
        flowContainer.style.opacity = 1;
        
        imageFiles.forEach(file => {
            file.image.getElement().className += ` ${imageClass}`
            let el = parseHTML(`<div class="contentFlow-imageWrapper"></div>`)
            if(file.name) el.appendChild(file.image.getElement())
            flowElement.appendChild(el)
        })
        
        closeButton.onclick = () => {
            close()
        }
        
        flowContainer.onclick = event => {
            if (event.target.getAttribute("class") === containerClass)
                close()
        }
        flowContainer.style.pointerEvents = "all";
        
        function close() {
            clearContainer(flowContainer)
            delete closeButton.onclick
            eventBus.emit('close')
        }
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