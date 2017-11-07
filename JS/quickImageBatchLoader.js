module.exports = {
    BatchLoader: function* (images) {
        let [first, second, ...rest] = images;
        yield loadImages([first, second]);
        return (async function () {
            await loadImages([first, second])
            await loadImages(rest)
            await loadImages(rest)
        }())
    }
}

async function loadImages(images) {
    await Promise.all(images.map(i => i.load()))
}
