const FOOTER_SIZE = 0.15

module.exports = {
    reevaluateHeights,
    adjustPortfolioWrapperHeightToExcludeUI
}

function setFooterSizeToJustFit() {
    let footer = document.getElementById("footer");
    let newHeight = window.innerHeight * FOOTER_SIZE
    footer.style.height = newHeight + "px";
}

function setSlideshowSizeToJustFit() {
    let newHeight = window.innerHeight * (1 - FOOTER_SIZE);
    console.log('setSlideshowSizeToJustFit', newHeight)
    document.getElementById("portfolio_wrapper").style.height = newHeight + "px";
    //document.getElementById("portfolio_wrapper").style.maxHeight = newHeight + "px";
}

function setFixedSlideshow() {
    document.getElementById("coolshow").style.position = "fixed";
}

function reevaluateHeights() {
    if (document.getElementsByClassName("coolshow").length === 1) {
        // setSlideshowSizeToJustFit();
        // setFixedSlideshow();
    }
    
    // setFooterSizeToJustFit();
}

function adjustPortfolioWrapperHeightToExcludeUI() {
    let portfolioWrapper = document.querySelector('#portfolio_wrapper')
    portfolioWrapper.style.height = `${Math.round(window.innerHeight * .88)}px`
    window.addEventListener('resize', () => {
        portfolioWrapper.style.height = `${Math.round(window.innerHeight * .88)}px`
    })
}