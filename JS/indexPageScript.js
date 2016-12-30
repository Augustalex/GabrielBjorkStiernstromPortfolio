/**
 * Created by DAW 28 on 2016-12-18.
 */

function setFooterSizeToJustFit() {
    var footer = document.getElementById("footer");
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

    var newHeight = window.innerHeight * 0.15;
    footer.style.height = newHeight + "px";

    //var height = document.getElementById("footer").offsetHeight;
    //document.getElementById("portfolio_wrapper").style.marginBottom = height + "px";
}

function setSlideshowSizeToJustFit() {
    newHeight = window.innerHeight * 0.85;

    document.getElementById("portfolio_wrapper").style.height = newHeight + "px";
    console.log("New portfolio wrapper size is " + newHeight);
    //document.getElementById("portfolio_wrapper").style.maxHeight = newHeight + "px";
}

function setFixedSlideshow() {
    document.getElementById("coolshow").style.position = "fixed";
}


function reevaluateHeights() {
    if (document.getElementsByClassName("coolshow").length == 1) {
        setSlideshowSizeToJustFit();
        setFixedSlideshow();
    }
    else
        document.getElementById("portfolio_wrapper").style.height = "auto";

    setFooterSizeToJustFit();
}

(function() {
    $(document).ready(function () {

        window.windowLoaderPromise = null;

        // Loading function for Portfolio categories buttons
        $(".buttonPortfolio").click(function(){
            if(windowLoaderPromise == null) {
                console.log("Loader PROMISE is null");
                windowLoaderPromise =
                    loadPage($(this).attr("alt"))
                        .onSet(function () {
                            console.log("Footer click.");
                            reevaluateHeights();
                        })
                        .finally(function(){
                            console.log("\n\tSETTING WINDOW LOADER TO NULL");
                            windowLoaderPromise = null;
                        });
            }
            else {
                console.log("Loader PROMISE is NOT null");
                /*windowLoaderPromise.attachOnSet(function(value){
                    loadPage($(this).attr("alt"))
                        .onSet(function () {
                            console.log("Attached Footer click.");
                            reevaluateHeights();
                        })
                });*/
            }
        });


        (function setupWindowEventListeners() {
            window.addEventListener("resize", reevaluateHeights);
            window.addEventListener("orientationchange", reevaluateHeights);
        })();

        console.log("\tLoading Page.");
        windowLoaderPromise = loadPage("HTML/home.html")
            .onSet(function () {
                console.log("loaded page.");
            })
            .finally(function(){
                windowLoaderPromise = null;
            })
    });


    //Wraps JQuery AJAX load calls with a promise.
    function loadPage(pageSrc) {
        var promise = new Promise();

        var element  = document.getElementById("portfolio_wrapper");

        element.innerHTML = "";
        console.log("Emptied portfolio_wrapper");
        console.log("START", new Date().getMilliseconds());
        $(element).load(pageSrc, function () {
            console.log("END", new Date().getMilliseconds() );
            //promise.set(true); //this should be set globally!
        });

        return promise;
    }

    lightbox.option({
        'resizeDuration': 200,
        'showImageNumberLabel': false
    });

})();