/**
 * Created by DAW 28 on 2016-12-18.
 */

let HomePage = require('../home/homePage.js')
let AboutPage = require('../about/aboutPage.js')
let PortfolioPage = require('../portfolio/portfolioPage.js')

let windowController = require('../../JS/windowController.js')

window.windowLoaderPromise = null;

// Loading function for Portfolio categories buttons
[...document.getElementsByClassName("buttonPortfolio")].forEach(button => {
    button.onclick = function (event) {
        if (windowLoaderPromise === null) {
            let id = event.target.id
            
            switch (id) {
                case "about":
                    AboutPage().show("#portfolio_wrapper")
                    break;
                case "portfolio":
                    PortfolioPage().show("#portfolio_wrapper")
                    break;
                case "homeButton":
                    HomePage().show("#portfolio_wrapper")
                    break
                default:
                    HomePage().show("#portfolio_wrapper")
            }
            windowController.reevaluateHeights()
            windowLoaderPromise = null;
        }
        else {
            console.log("Loader PROMISE is NOT null");
        }
    }
});

window.addEventListener("resize", windowController.reevaluateHeights);
window.addEventListener("orientationchange", windowController.reevaluateHeights);

let homePage = HomePage()
homePage.show('#portfolio_wrapper')
