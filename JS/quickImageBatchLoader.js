
module.exports = {
    loadAllImages: async quickImages => {
        let [first, second, ...rest] = quickImages
        
        await Promise.all([
            first.load(),
            second.load()
        ])
        await first.load()
        await second.load()
        
        await Promise.all(rest.map(i => {
            return i.load()
        }))
        await Promise.all(rest.map(i => {
            return i.load()
        }))
    }
}