
const Coolshow = require('./slideshow.js')
const DynamicImage = require('../../JS/DynamicImage.js')
const DynamicImageLoader = require('../../JS/DynamicImageLoader.js')()
const windowController = require('../../JS/windowController.js')

/*var coolshowImages = [
 "..../../FILES/IMG/ONSCREEN/RemainderOfTheForgotten_by_GabrielBjorkStiernstrom.png",
 "..../../FILES/IMG/ONSCREEN/HadesStarTheBlackCitadel_by_GabrielBjorkStiernstrom.png",
 "..../../FILES/IMG/ONSCREEN/Beached_by_GabrielBjorkStiernstrom.png",
 "..../../FILES/IMG/ONSCREEN/ExplorationOfAnOldWorld_by_GabrielBjorkStiernstrom.png",
 "..../../FILES/IMG/ONSCREEN/ThePhantomsGame_by_GabrielBjorkStiernstrom.png",
 "..../../FILES/IMG/ONSCREEN/Cartographer_by_GabrielBjorkStiernstrom.png",
 "..../../FILES/IMG/ONSCREEN/APlaceOfMagic_by_GabrielBjorkStiernstrom.png",
 "..../../FILES/IMG/ONSCREEN/moon_by_gabriel_bjork_stiernstrom.png"
 ];*/

module.exports = function () {
    
    return {
        show
    }
    
    async function show(wrapperSelector) {
        let element = document.querySelector(wrapperSelector)
        element.innerHTML = `<div id="coolshow" class="coolshow"></div>`
        
        let coolshowImages = [
            new DynamicImage()
                .addImage("../../FILES/IMG/slideshow/remainderOfTheForgotten/RemainderOfTheForgotten_lowres.jpg")
                .addImage("../../FILES/IMG/slideshow/remainderOfTheForgotten/RemainderOfTheForgotten_by_GabrielBjorkStiernstrom.png"),
            new DynamicImage()
                .addImage("../../FILES/IMG/slideshow/hadesStarTheBlackCitadel/HadesStarTheBlackCitadel_lowres.jpg")
                .addImage("../../FILES/IMG/slideshow/hadesStarTheBlackCitadel/HadesStarTheBlackCitadel_by_GabrielBjorkStiernstrom.png"),
            new DynamicImage()
                .addImage("../../FILES/IMG/slideshow/beached/Beached_lowres.jpg")
                .addImage("../../FILES/IMG/slideshow/beached/Beached_by_GabrielBjorkStiernstrom.png"),
            new DynamicImage()
                .addImage("../../FILES/IMG/slideshow/explorationOfAnOldWorld/ExplorationOfAnOldWorld_lowres.jpg")
                .addImage("../../FILES/IMG/slideshow/explorationOfAnOldWorld/ExplorationOfAnOldWorld_by_GabrielBjorkStiernstrom.png"),
            new DynamicImage()
                .addImage("../../FILES/IMG/slideshow/thePhantomsGame/ThePhantomsGame_lowres.jpg")
                .addImage("../../FILES/IMG/slideshow/thePhantomsGame/ThePhantomsGame_by_GabrielBjorkStiernstrom.png"),
            new DynamicImage()
                .addImage("../../FILES/IMG/slideshow/cartographer/Cartographer_lowres.jpg")
                .addImage("../../FILES/IMG/slideshow/cartographer/Cartographer_by_GabrielBjorkStiernstrom.png"),
            new DynamicImage()
                .addImage("../../FILES/IMG/slideshow/aPlaceOfMagic/APlaceOfMagic_lowres.jpg")
                .addImage("../../FILES/IMG/slideshow/aPlaceOfMagic/APlaceOfMagic_by_GabrielBjorkStiernstrom.png"),
            new DynamicImage()
                .addImage("../../FILES/IMG/slideshow/moon/Moon_lowres.jpg")
                .addImage("../../FILES/IMG/slideshow/moon/moon_by_gabriel_bjork_stiernstrom.png")
        ];
    
        let coolshow = new Coolshow(coolshowImages)
    
        await coolshow.start();
        windowController.reevaluateHeights();
        coolshow.reevaluateImageSize();
    }
    
}