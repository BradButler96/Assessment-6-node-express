const fs = require('fs');
const process = require('process');
const axios = require('axios');

function writeToFile(txt, out) {
    fs.writeFile(out, txt, 'utf8', (err) => {
        if (err) {
            console.error(`Could not write to ${out} due to ${err}`)
        } 
    })
}

async function urlToText(url) {
    try {
        let res = await axios.get(url)
        const baseURL = url.split('/')
        writeToFile(res.data, baseURL[2])
        console.log(`Wrote to ${url}`)
    } catch(err) {
        console.error(`Couldn't download ${url}`)
    }
}

function textToFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error in ${path}: ${err}`)
            process.exit(1)
        } else {
            for (let url of data.split(/\r?\n/)) {
                urlToText(url)
            }
        }
    })
}

let file = process.argv[2]

textToFile(file)