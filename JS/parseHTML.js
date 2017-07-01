module.exports = function (htmlString) {
    let template = document.createElement('template');
    template.innerHTML = htmlString;
    return template.content.firstChild;
}