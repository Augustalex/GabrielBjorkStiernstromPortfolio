
let aboutPage = require('./about.html')

module.exports = function () {
    
    return {
        show
    }
    
    async function show(wrapperSelector) {
        let element = document.querySelector(wrapperSelector)
        element.innerHTML = aboutPage
    }
}