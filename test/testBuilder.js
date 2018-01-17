let fs = require("fs");
let browserify = require("browserify");
let p = require('partialify');
let vueify = require('vueify');

async function buildAndRunTests() {
    try {
        await build('./testIndex.js', './test.js')
    }
    catch (ex) {
        console.log(ex)
    }
    process.exit()
}

async function build(inputSrc, outputSrc) {
    return new Promise(resolve => {
        return browserify(inputSrc)
            .transform(p)
            .transform(vueify)
            .transform("babelify", {presets: ["env"]})
            .bundle()
            .pipe(fs.createWriteStream(outputSrc))
            .on('finish', () => {
                resolve()
            })
    })
}

buildAndRunTests()
