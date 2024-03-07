const {crawPage} = require("./craw")
const {printReport} = require("./report")
async function main(){
    let argc = process.argv.length
    if (argc != 3) {
        console.log("Invalid number of arguments")
        process.exit(1)
    }
    const url = process.argv[2]
    const pages = await crawPage(url, url, {})
    printReport(pages)
}

main()