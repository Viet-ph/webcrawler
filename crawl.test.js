const {test, expect} = require("@jest/globals")
const {normalizeUrl, getURLsFromHTML} = require("./craw.js")

test('Normalize Url strip trailing', () => {
    const input = "https://blog.boot.dev/path/"
    const expected = "blog.boot.dev/path"
    const actual = normalizeUrl(input)
    expect(actual).toEqual(expected)
})

test('Normalize Url capitals', () => {
    const input = "https://Blog.boot.dev/path/"
    const expected = "blog.boot.dev/path"
    const actual = normalizeUrl(input)
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute Urls', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
</html>
`
    const inputBaseUrl = "https://blog.boot.dev"
    const expected = ["https://blog.boot.dev/"]
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative Urls', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path"><span>Go to Boot.dev</span></a>
    </body>
</html>
`
    const inputBaseUrl = "https://blog.boot.dev"
    const expected = ["https://blog.boot.dev/path"]
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute and relativeUrls', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path1"><span>Go to Boot.dev</span></a>
        <a href="/path"><span>Go to Boot.dev</span></a>
    </body>
</html>
`
    const inputBaseUrl = "https://blog.boot.dev"
    const expected = ["https://blog.boot.dev/path1", "https://blog.boot.dev/path"]
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid url', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="/path"><span>Go to Boot.dev</span></a>
        <a href="Invalid"><span>Go to Boot.dev</span></a>
    </body>
</html>
`
    const inputBaseUrl = "https://blog.boot.dev"
    const expected = ["https://blog.boot.dev/", "https://blog.boot.dev/path"]
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    expect(actual).toEqual(expected)
})


