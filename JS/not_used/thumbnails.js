var thumbnailWidth = 0;

function adjustThumbnails(){
    var windowWidth = $(window).width();
    thumbnailWidth = $("img.thumbnail").width();
    var leftOversDividend = windowWidth/thumbnailWidth;
    var ammountOfThumbnails = Math.floor(leftOversDividend);
    var leftOvers = leftOversDividend - ammountOfThumbnails;
    var toAdd = thumbnailWidth * leftOvers;
    var definiteToAdd = toAdd/ammountOfThumbnails;
    var newWidthOfThumbnails = definiteToAdd + thumbnailWidth;
    if(windowWidth%thumbnailWidth!=0){
        newWidthOfThumbnails = Math.floor(newWidthOfThumbnails);
    }
    $("div#library_window").css("width", newWidthOfThumbnails);
    $("img.thumbnail").css("width", newWidthOfThumbnails);
    $("img.thumbnail").css("height", newWidthOfThumbnails);
    //var thumbnailHeight = $("img.thumbnail").height();
    $("div#library_window").css("height", newWidthOfThumbnails);

}

adjustThumbnails();

$(window).resize(function(){
    let windowWidth = $(window).width()
    let leftOversDividend = windowWidth / thumbnailWidth
    let amountOfThumbnails = Math.floor(leftOversDividend)
    let leftOvers = leftOversDividend - amountOfThumbnails
    let toAdd = thumbnailWidth * leftOvers
    let definiteToAdd = toAdd / amountOfThumbnails
    let newWidthOfThumbnails = definiteToAdd + thumbnailWidth;

    if(windowWidth%thumbnailWidth!=0){
        newWidthOfThumbnails = Math.floor(newWidthOfThumbnails);
    }

    $("div#library_window").css("width", newWidthOfThumbnails);
    $("img.thumbnail").css("width", newWidthOfThumbnails);
    $("img.thumbnail").css("height", newWidthOfThumbnails);
    //var thumbnailHeight = $("img.thumbnail").height();
    $("div#library_window").css("height", newWidthOfThumbnails);

	adjustPortfolioWrapperMargins();
});

function adjustPortfolioWrapperMargins(){	
	var newMargin = Math.floor($("#footer").height());
	$("#portfolio_wrapper").css("margin-bottom", newMargin + "px");
}

adjustPortfolioWrapperMargins();
