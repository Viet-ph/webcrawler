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
                console.log(`Error with relative url: ${error.message}, ${element}`)
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

async function crawPage(baseURL, currentURL, pages){
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if (baseURLObj.hostname !== currentURLObj.hostname){
        return 
    }

    const normalizedCurrentURL = normalizeUrl(currentURL)
    if (pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL] ++
        return 
    }

    pages[normalizedCurrentURL] = 1

    console.log(`Actively crawling ${currentURL}`)
    try {
        const resp = await fetch(currentURL)
        const contentType = resp.headers.get("content-type")
        const statusCode = resp.status
        if (!contentType.includes("text/html")) {
            console.log("Content type not text/html")
            return pages
        } else if (!resp.ok){
            console.log("HTTP status " + resp.status)
            return pages
        } else{
            const html = await resp.text()
            const URLs = getURLsFromHTML(html, baseURL)
            for (const url of URLs) {
                await crawPage(baseURL, url, pages)
            }
        }
        
    } catch (error) {
        console.log(`Error occured: ${error.message}, url: ${currentURL}`)
    }

    return pages
}

module.exports = {
    normalizeUrl,
    getURLsFromHTML,
    crawPage
}