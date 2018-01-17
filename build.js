let fs = require("fs");
let browserify = require("browserify");
let partialify = require('partialify');
let vueify = require('vueify');
let chokidar = require('chokidar')
let envify = require('envify/custom')
let watcher = chokidar.watch('./pages')

let building = false
let queued = false
watcher.on('ready', function () {
    console.log('ready')
    watcher.on('all', function () {
        try {
            build()
        }
        catch (err) {
            console.log('There was an error when building: ', err.message)
        }
    })
})

function build() {
    if (building && !queued) {
        console.log('Build in progress, queuing requested rebuild.')
        queued = true
        return;
    }
    console.log('\x1b[36m%s\x1b[0m', 'Starting build. . .')
    building = true
    return browserify("./pages/index/main.js")
        .transform(partialify)
        .transform(vueify)
        .transform(
            // Required in order to process node_modules files
            {global: true},
            envify({NODE_ENV: 'production'})
        )
        .transform("babelify", {presets: ["env"], plugins: ["transform-async-to-generator"]})
        .bundle()
        .pipe(fs.createWriteStream("./dist/main.js"))
        .on('finish', () => {
            if (queued) {
                console.log('Running queued rebuild!')
                build()
            }
            else {
                console.log('\tDone!\n')
            }
            building = false
            queued = false
        })
}

build()