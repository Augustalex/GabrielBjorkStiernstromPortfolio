/**
 * Created by DAW 28 on 2016-12-18.
 */

let HomePage = require('../home/homePage.js')
let AboutPage = require('../about/aboutPage.js')
let ProjectsPage = require('../projects/projectsPage.js')

let windowController = require('../../JS/windowController.js')

window.windowLoaderPromise = null;

[...document.getElementsByClassName("buttonPortfolio")].forEach(button => {
    button.onclick = function (event) {
        if (windowLoaderPromise === null) {
            let id = event.target.id
            
            switch (id) {
                case "about":
                    AboutPage().show("#portfolio_wrapper")
                    break;
                case "portfolio":
                    ProjectsPage().show("#portfolio_wrapper")
                    break;
                case "homeButton":
                    HomePage().show("#portfolio_wrapper")
                    break
                default:
                    HomePage().show("#portfolio_wrapper")
            }
            
            for(let button of document.querySelectorAll('.buttonPortfolio')) {
                if(button.id !== id) {
                    button.classList.remove('buttonPortfolio--selected')
                }
                else {
                    button.classList.add('buttonPortfolio--selected')
                }
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
