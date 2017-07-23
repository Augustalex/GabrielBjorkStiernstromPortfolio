
module.exports = {
    loadAllImages: async quickImages => {
        // await Promise.all(quickImages.map(i => i.load()))
        // await Promise.all(quickImages.map(i => i.load()))
        
        // await Promise.all(quickImages.map(i => {
        //     return i.load().then(() => i.load())
        // }))
    
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