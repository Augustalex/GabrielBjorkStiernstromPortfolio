/**
 * Created by DAW 28 on 2016-12-18.
 */

/*var coolshowImages = [
 "../FILES/IMG/ONSCREEN/RemainderOfTheForgotten_by_GabrielBjorkStiernstrom.png",
 "../FILES/IMG/ONSCREEN/HadesStarTheBlackCitadel_by_GabrielBjorkStiernstrom.png",
 "../FILES/IMG/ONSCREEN/Beached_by_GabrielBjorkStiernstrom.png",
 "../FILES/IMG/ONSCREEN/ExplorationOfAnOldWorld_by_GabrielBjorkStiernstrom.png",
 "../FILES/IMG/ONSCREEN/ThePhantomsGame_by_GabrielBjorkStiernstrom.png",
 "../FILES/IMG/ONSCREEN/Cartographer_by_GabrielBjorkStiernstrom.png",
 "../FILES/IMG/ONSCREEN/APlaceOfMagic_by_GabrielBjorkStiernstrom.png",
 "../FILES/IMG/ONSCREEN/moon_by_gabriel_bjork_stiernstrom.png"
 ];*/

var coolshowImages = [
    new DynamicImage()
        .addImage("FILES/IMG/slideshow/remainderOfTheForgotten/RemainderOfTheForgotten_lowres.jpg")
        .addImage("FILES/IMG/slideshow/remainderOfTheForgotten/RemainderOfTheForgotten_by_GabrielBjorkStiernstrom.png"),
    new DynamicImage()
        .addImage("FILES/IMG/slideshow/hadesStarTheBlackCitadel/HadesStarTheBlackCitadel_lowres.jpg")
        .addImage("FILES/IMG/slideshow/hadesStarTheBlackCitadel/HadesStarTheBlackCitadel_by_GabrielBjorkStiernstrom.png"),
    new DynamicImage()
        .addImage("FILES/IMG/slideshow/beached/Beached_lowres.jpg")
        .addImage("FILES/IMG/slideshow/beached/Beached_by_GabrielBjorkStiernstrom.png"),
    new DynamicImage()
        .addImage("FILES/IMG/slideshow/explorationOfAnOldWorld/ExplorationOfAnOldWorld_lowres.jpg")
        .addImage("FILES/IMG/slideshow/explorationOfAnOldWorld/ExplorationOfAnOldWorld_by_GabrielBjorkStiernstrom.png"),
    new DynamicImage()
        .addImage("FILES/IMG/slideshow/thePhantomsGame/ThePhantomsGame_lowres.jpg")
        .addImage("FILES/IMG/slideshow/thePhantomsGame/ThePhantomsGame_by_GabrielBjorkStiernstrom.png"),
    new DynamicImage()
        .addImage("FILES/IMG/slideshow/cartographer/Cartographer_lowres.jpg")
        .addImage("FILES/IMG/slideshow/cartographer/Cartographer_by_GabrielBjorkStiernstrom.png"),
    new DynamicImage()
        .addImage("FILES/IMG/slideshow/aPlaceOfMagic/APlaceOfMagic_lowres.jpg")
        .addImage("FILES/IMG/slideshow/aPlaceOfMagic/APlaceOfMagic_by_GabrielBjorkStiernstrom.png"),
    new DynamicImage()
        .addImage("FILES/IMG/slideshow/moon/Moon_lowres.jpg")
        .addImage("FILES/IMG/slideshow/moon/moon_by_gabriel_bjork_stiernstrom.png")
];

var coolshow = new Coolshow(coolshowImages);

coolshow.start()
    .onSet(function(){
        console.log("Slideshow is loaded.");
        reevaluateHeights();
        coolshow.reevaluateImageSize();
        window.windowLoaderPromise.set(true);
    });