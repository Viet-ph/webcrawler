const {crawPage} = require("./craw")

async function main(){
    let argc = process.argv.length
    if (argc != 3) {
        console.log("Invalid number of arguments")
        process.exit(1)
    }
    const url = process.argv[2]
    console.log("Start crawling...")
    crawPage(url)
}

main()