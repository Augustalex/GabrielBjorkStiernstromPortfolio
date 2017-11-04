// let aboutPage = require('./about.html')

module.exports = function () {
    
    return {
        show
    }
    
    async function show(wrapperSelector) {
        let element = document.querySelector(wrapperSelector)
        try {
            element.innerHTML = await loadAboutMeHTML()
            adjustProjectsWrapperMargins()
        }
        catch(err) {
            console.log('Failed to load "About me" page.', err)
        }
    }
    
    async function loadAboutMeHTML() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', 'about.html')
            xhr.onload = function () {
                if (xhr.status === 200) {
                    resolve(xhr.responseText)
                }
                else {
                    reject(xhr.status)
                    console.log('Failed to load "About me" page.', xhr.status)
                }
            }
            xhr.send()
        })
    }
}

function adjustProjectsWrapperMargins() {
    let newMargin = document.getElementById("footer").offsetHeight;
    document.getElementById("portfolio_wrapper").style.marginBottom = newMargin + "px";
}