
let QuickImage = require('./QuickImage.js')

module.exports = function (project, rootRelativePath) {
    
    let thumbnailSrc = `${rootRelativePath}/file/img/thumbnail/${project.name}Thumbnail.jpg`
    
    let images = project.images
        .map(image => {
            let quickImage = QuickImage(`${rootRelativePath}/file/img`, image, false)
            return {
                image: quickImage,
                name: image.name,
                header: image.header,
                description: image.description || ''
            }
        })
    
    return {
        name: project.name,
        header: project.header,
        description: project.description,
        thumbnailSrc,
        images
    }
}