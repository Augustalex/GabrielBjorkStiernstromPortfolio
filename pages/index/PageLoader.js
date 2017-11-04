module.exports = {
    loadPage
}

async function loadPage(pageSrc, wrapperId) {
    const element = document.getElementById(wrapperId)
    
    element.innerHTML = "";
    
    element.innerHTML = await loadContent(pageSrc)
}

/**
 * Loads a file asynchronously with XHR.
 *
 * Wraps the progress in a Promise that can be used
 * to handle error, cancel and success scenarios.
 * @param fileSource
 * @returns {Promise}
 */
function loadContent(fileSource) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open("GET", fileSource, true);
        xhr.onreadystatechange = function () {
            if (this.status !== 200) {
                reject("Could not load " + fileSource);
            }
            else {
                resolve(this.responseText);
            }
        };
        xhr.send();
    });
}

