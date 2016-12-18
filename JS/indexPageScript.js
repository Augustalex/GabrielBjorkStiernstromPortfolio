/**
 * Created by DAW 28 on 2016-12-18.
 */

(function() {
    $(document).ready(function () {
        // Loading function for Portfolio categories buttons
        /**$(".buttonPortfolio").click(function(){
                    loadPage($(this).attr("alt"))
                        .onSet(function(){
                            console.log("Footer click.");
                            reevaluateHeights();
                        });
                });*/


        (function setupWindowEventListeners() {
            window.addEventListener("resize", reevaluateHeights);
            window.addEventListener("orientationchange", reevaluateHeights);
        })();

        loadPage("HTML/home.html")
            .onSet(function () {
                reevaluateHeights();
            });
    });


//Wraps JQuery AJAX load calls with a promise.
    function loadPage(pageSrc) {
        var promise = new Promise();

        $("#portfolio_wrapper").empty().load(pageSrc, function () {
            promise.set(true);
        });

        return promise;
    }

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
        console.log("Fixed portfolio wrapper");
        newHeight = window.innerHeight * 0.85;

        document.getElementById("portfolio_wrapper").style.height = newHeight + "px";
        //document.getElementById("portfolio_wrapper").style.maxHeight = newHeight + "px";
    }

    function setFixedSlideshow() {
        document.getElementById("coolshow").style.position = "fixed";
    }


    function reevaluateHeights() {
        if (document.getElementsByClassName("coolshow").length == 1) {
            console.log("coolshow present.");
            setSlideshowSizeToJustFit();
            setFixedSlideshow();
        }
        else
            document.getElementById("portfolio_wrapper").style.height = "auto";

        setFooterSizeToJustFit();
    }
})();