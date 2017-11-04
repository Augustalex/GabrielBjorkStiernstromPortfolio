module.exports = function (fileSrc) {
    
    let imageElement = document.createElement('img')
    
    return {
        load
    }
    
    function load() {
        return new Promise(resolve => {
            imageElement.onload = () => {
                resolve(imageElement)
                imageElement.onload = null
            }
            imageElement.src = fileSrc
        })
    }
}