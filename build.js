var fs = require("fs");
var browserify = require("browserify");

(function () {
	async function build() {
			browserify("./pages/index/main.js")
				.transform("babelify", {presets: ["env"]})
				.bundle()
				.pipe(fs.createWriteStream("./dist/main.js"))
				.on('transform', (tr, file) => {
					console.log("Built: Index (Main)");
				});
			browserify("./pages/home/homePageScript.js")
				.transform("babelify", {presets: ["env"]})
				.bundle()
				.pipe(fs.createWriteStream("./dist/homePageScript.js"))
				.on('transform', (tr, file) => {
					console.log("Built: Index (Main)");
				});
			browserify("./pages/portfolio/portfolioPageScript.js")
				.transform("babelify", {presets: ["env"]})
				.bundle()
				.pipe(fs.createWriteStream("./dist/portfolioPageScript.js"))
				.on('transform', (tr, file) => {
					console.log("Built: Index (Main)");
				});
	}
	
	build();
//browserify ./pages/home/homePageScript.js -o ./bundle/homePageScriptBundle.js
//browserify ./pages/index/main.js -o ./bundle/mainBundle.js
//browserify ./pages/portfolio/portfolioPageScript.js -o ./bundle/portfolioPageScriptBundle.js
}())
