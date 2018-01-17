
const FOOTER_SIZE = 0.15

module.exports = {
    reevaluateHeights
}

function setFooterSizeToJustFit() {
    let footer = document.getElementById("footer");
    /*
     var calcHeight;
     try {
     calcHeight = window.getComputedStyle(footer, null)
     .getPropertyValue('height');
     } catch(e) {
     calcHeight = document.getElementById('example').currentStyle.height;
     }
     console.log(calcHeight);
     var newHeightToAdd = window.innerHeight * 0.15 - (footer.offsetHeight - parseInt(calcHeight, 10));

     console.log(footer.offsetHeight, calcHeight);
     console.log($("#footer").css("height"));
     $("#footer").css("height", calcHeight + newHeightToAdd + "px");
     console.log($("#footer").css("height"));
     console.log("New height to add: ", newHeightToAdd);*/
    
    let newHeight = window.innerHeight * FOOTER_SIZE
    footer.style.height = newHeight + "px";
    
    //var height = document.getElementById("footer").offsetHeight;
    //document.getElementById("portfolio_wrapper").style.marginBottom = height + "px";
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
