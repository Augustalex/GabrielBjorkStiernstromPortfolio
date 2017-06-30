/**
 * Created by DAW 28 on 2016-12-18.
 */

require('./AggeBox.js')
require('./Portfolio.js')

(function(){
    var images = [
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/dragonvalley_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/dragon_valley_by_gabrielbjorkstiernstrom.png")
            .setHeader("Dragon Valley").setSubHeader("Personal Work"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/wastepickers_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/wastepickers_by_gabrielbjorkstiernstrom.png")
            .setHeader("Waste Pickers").setSubHeader("Personal Work"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/beached_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/beached_by_gabrielbjorkstiernstrom.png")
            .setHeader("Beached").setSubHeader("Personal Work"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/hadesstarjumpgate_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/hadesstar_jumpgate_by_gabrielbjorkstiernstrom.png")
            .setHeader("Hades' Star - Jumpgate").setSubHeader("Parallel Space Inc.")
            .setDescription("Promotional Art"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/hadesstarblackcitadel_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/hadesstar_blackcitadel_by_gabrielbjorkstiernstrom.png")
            .setHeader("Hades' Star - Black Citadel").setSubHeader("Parallel Space Inc.")
            .setDescription("Promotional Art"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/hadesstarsupernova_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/hadesstar_supernova_by_gabrielbjorkstiernstrom.png")
            .setHeader("Hades' Star - Supernova").setSubHeader("Parallel Space Inc.")
            .setDescription("Promotional Art"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/hadesstariceplanet_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/hadesstar_iceplanet_by_gabrielbjorkstiernstrom.png")
            .setHeader("Hades' Star - Ice Planet").setSubHeader("Parallel Space Inc.")
            .setDescription("Promotional Art"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/oldworld_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/explorationofanoldworld_by_gabrielbjorkstiernstrom.jpg")
            .setHeader("Exploration of an Old World").setSubHeader("Personal Work"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/wedora_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/markusheitzwedora_coverillustration_by_gabrielbjorkstiernstrom.png")
            .setHeader("Wédora").setSubHeader("Droemer Knaur")
            .setDescription("Book Cover"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/placeofmagic_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/a_place_of_magic_by_gabriel_bjork_stiernstrom.png")
            .setHeader("A Place of Magic").setSubHeader("Personal Work"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/inoblivion_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/inoblivion_by_gabrielbjorkstiernstrom.png")
            .setHeader("In Oblivion").setSubHeader("Commissioned Work"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/ruins_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/remainder_of_the_forgotten.png")
            .setHeader("Remainder of the Forgotten").setSubHeader("Personal Work"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/phantoms_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/phantoms_game.png")
            .setHeader("The Phantoms Game").setSubHeader("Personal Work"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/cartographer_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/cartographer_by_gabrielbjorkstiernstrom.png")
            .setHeader("The Cartographer").setSubHeader("Personal Work"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/asteroidstation_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/asteroid_mining_facility.jpg")
            .setHeader("Asteriod Mining Facility").setSubHeader("Personal Work"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/mask_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/mask.jpg")
            .setHeader("Mask").setSubHeader("Personal Work"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/survivor_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/survivor.png")
            .setHeader("Survivor").setSubHeader("Personal Work"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/extraterrestialsurface_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/extraterrestial_surface.jpg")
            .setHeader("Extraterrestial Surface").setSubHeader("Personal Work"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/eyeofthestorm_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/eye_of_the_storm.png")
            .setHeader("Eye of the Storm").setSubHeader("Personal Work"),
        new DynamicImage()
            .addImage("FILES/IMG/THUMBNAIL/moon_thumbnail.png")
            .addImage("FILES/IMG/PORTFOLIO_IMG/moon_by_gabriel_bjork_stiernstrom.png")
            .setHeader("Moon").setSubHeader("Personal Work")
    ];

    Portfolio(images, "portfolioLibrary");
})();