/**
 * Created by DAW 28 on 2016-12-18.
 */

let HomePage = require('../home/homePage.js');
let AboutPage = require('../about/aboutPage.js');
let ProjectsPage = require('../projects/projectsPage.js');

let windowController = require('../../JS/windowController.js');

(async function () {
    [...document.getElementsByClassName("buttonPortfolio")].forEach(button => {
        button.addEventListener('click', (event) => {
            window.location.hash = `/${event.target.id}`
            window.location.reload()
        })
    });
    
    let pageName
    let hashParts = window.location.hash.split('/')
    if(hashParts.length <= 1){
        pageName = 'home'
    }
    else {
        pageName = hashParts[1]
    }
    console.log('pageName', pageName)
    loadPageByName(pageName)
    setSelectedNavigationButton(pageName)
    windowController.reevaluateHeights()
    
    window.addEventListener('hashchange', (e) => {
        window.location = e.newURL
        window.location.reload()
    })
    window.addEventListener("resize", windowController.reevaluateHeights);
    window.addEventListener("orientationchange", windowController.reevaluateHeights);
}())

function setSelectedNavigationButton(buttonId) {
    for (let button of document.querySelectorAll('.buttonPortfolio')) {
        if (button.id !== buttonId) {
            button.classList.remove('buttonPortfolio--selected')
        }
        else {
            button.classList.add('buttonPortfolio--selected')
        }
    }
}

async function loadPageByName(name) {
    switch (name) {
        case "about":
            await AboutPage().show("#portfolio_wrapper")
            break;
        case "projects":
            await ProjectsPage().show("#portfolio_wrapper")
            break;
        case "home":
            await HomePage().show("#portfolio_wrapper")
            break
        default:
            await HomePage().show("#portfolio_wrapper")
    }
}