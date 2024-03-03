const {test, expect} = require("@jest/globals")
const {normalizeUrl} = require("./craw.js")

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

