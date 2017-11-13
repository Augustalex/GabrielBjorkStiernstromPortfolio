module.exports = {
    BatchLoader: function* (images) {
        let [first, second, ...rest] = images;
        yield loadImages([first, second]);
        yield loadImages(rest);
        return (async function () {
            await loadImages([first, second])
            await loadImages(rest)
        }());
    }
}

async function loadImages(images) {
    await Promise.all(images.map(i => i.load()))
}
