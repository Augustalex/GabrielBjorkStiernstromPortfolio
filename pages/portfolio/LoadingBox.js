module.exports = function () {
    let container = null;
    
    let loadingBoxClass = "loading-box";
    let element = newLoadingBoxElement();
    
    let loadingInterval = null;
    let loadingProgressionSpeed = 600;
    
    let loadingCharacter = ".";
    
    let currentLoadingProgress = 0;
    let maxProgressionBeforeReset = 10;
    
    this.start = function (loadingBoxContainer) {
        container = loadingBoxContainer;
        
        clearAndInsertLoadingBox();
        startLoading();
    };
    
    this.stop = function () {
        removeLoadingBox();
    };
    
    function clearAndInsertLoadingBox() {
        container.innerHTML = "";
        container.appendChild(element);
    }
    
    function removeLoadingBox() {
        container.innerHTML = "";
        clearInterval(loadingInterval);
        loadingInterval = null;
    }
    
    function startLoading() {
        if (!loadingInterval)
            loadingInterval = setInterval(progressLoading, loadingProgressionSpeed);
    }
    
    function progressLoading() {
        if (currentLoadingProgress > maxProgressionBeforeReset) {
            element.innerHTML = "";
            currentLoadingProgress = 0;
        }
        else {
            element.innerHTML += loadingCharacter;
            currentLoadingProgress++;
        }
    }
    
    function newLoadingBoxElement() {
        let element = document.createElement("div");
        element.setAttribute("class", loadingBoxClass);
        return element;
    }
}