function sortPages(pages){
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a, b) => {
        return b[1] - a[1]
    })

    return pagesArr
}
function printReport(pages){
    console.log("===========")
    console.log("REPORT")
    console.log("===========")
    const sortedPages = sortPages(pages)
    for (const page of sortedPages) {
        console.log(`Found ${page[1]} internal links to ${page[0]}`)
    }
    console.log("===========")
    console.log("END REPORT")
    console.log("===========")
}


module.exports = {
    sortPages,
    printReport
}