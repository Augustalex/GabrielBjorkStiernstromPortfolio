let fs = require("fs");
let browserify = require("browserify");
let p = require('partialify');

(function () {
	async function build() {
			browserify("./pages/index/main.js")
                .transform(p)
				.transform("babelify", {presets: ["env"]})
				.bundle()
				.pipe(fs.createWriteStream("./dist/main.js"))

			// browserify("./pages/home/homePage.js")
			// 	.transform(p)
			// 	.transform("babelify", {presets: ["env"]})
			// 	.bundle()
			// 	.pipe(fs.createWriteStream("./dist/homePageScript.js"))
            //
			// browserify("./pages/portfolio/portfolioPageScript.js")
             //    .transform(p)
			// 	.transform("babelify", {presets: ["env"]})
			// 	.bundle()
			// 	.pipe(fs.createWriteStream("./dist/portfolioPageScript.js"))

	}
	
	build();
//browserify ./pages/home/homePageScript.js -o ./bundle/homePageScriptBundle.js
//browserify ./pages/index/main.js -o ./bundle/mainBundle.js
//browserify ./pages/portfolio/portfolioPageScript.js -o ./bundle/portfolioPageScriptBundle.js
}())
