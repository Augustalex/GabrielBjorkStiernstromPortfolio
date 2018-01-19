const FOOTER_SIZE = 0.15

module.exports = {
    reevaluateHeights,
    adjustPortfolioWrapperHeightToExcludeUI,
    adjustPortfolioWrapperHeightToExcludeUIAutomatically
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
    adjustPortfolioWrapperHeight(portfolioWrapper)
}

function adjustPortfolioWrapperHeightToExcludeUIAutomatically() {
    let portfolioWrapper = document.querySelector('#portfolio_wrapper')
    adjustPortfolioWrapperHeight(portfolioWrapper)
    window.addEventListener('resize', () => {
        adjustPortfolioWrapperHeight(portfolioWrapper)
    })
}

function adjustPortfolioWrapperHeight(portfolioWrapper) {
    const wrapperHeight = window.innerHeight - 180 //(footerSizePx < maxHeight ? footerSizePx : maxHeight)
    portfolioWrapper.style.height = `${Math.round(wrapperHeight)}px`
}