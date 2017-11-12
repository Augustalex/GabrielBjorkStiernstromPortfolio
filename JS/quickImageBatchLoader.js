module.exports = {
    BatchLoader: function* (images) {
        let [first, second, ...rest] = images;
        yield loadImages([first, second]);
        yield loadImages(rest);
        return (async function () {
            console.log('A')
            await loadImages([first, second])
            console.log('B')
            await loadImages(rest)
            console.log('C')
        }());
    }
}

async function loadImages(images) {
    await Promise.all(images.map(i => i.load()))
}
