const { JSDOM } = require('jsdom')

function normalizeUrl(urlString){
    const urlObj = new URL(urlString)
    let hostPath = `${urlObj.hostname}${urlObj.pathname}`

    if (hostPath.length > 0 && hostPath.slice(-1) === "/"){
        hostPath = hostPath.slice(0, -1)
    }

    return hostPath 
}

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll("a")
    linkElements.forEach(element => {
        if (element.href.charAt(0) === '/')
            try {
                let urlObj = new URL(`${baseURL}${element.href}`)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`Error with relative url: ${error.message}`)
            }
            
        else
        try {
            let urlObj = new URL(element.href)
            urls.push(urlObj.href)
        } catch (error) {
            console.log(`Error with absolute url: ${error.message}`)
        }
    });

    return urls
}

module.exports = {
    normalizeUrl,
    getURLsFromHTML
}