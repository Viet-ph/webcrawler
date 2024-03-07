const {crawPage} = require("./craw")

async function main(){
    let argc = process.argv.length
    if (argc != 3) {
        console.log("Invalid number of arguments")
        process.exit(1)
    }
    const url = process.argv[2]
    const pages = await crawPage(url, url, {})
    for (const page of Object.entries(pages)) {
        console.log(page)
    }
}

main()