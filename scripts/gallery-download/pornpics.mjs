import * as cheerio from 'cheerio';
import axios from 'axios';
import download from 'download';
import fs from 'fs';
import sanitize from 'sanitize-filename';

const fakeClient = axios.create({
    baseURL: "https://www.pornpics.com/",
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
    },
})

async function crawlPornstar(name, num) {
    const offset = num * 20
    const url = `/search/srch.php?q=${name}&lang=en&limit=20&offset=${offset}`
    // iterate over galleries
    const data = (await fakeClient.get(url)).data
    for (const gallery of data) {
        await crawlGallery(gallery.g_url, gallery.desc)
    }
}

async function crawlGallery(url, desc) {
    const response = await fakeClient.get(url)
    const $ = cheerio.load(response.data)
    const title = sanitize(desc)
    // check if directory exists
    if (fs.existsSync(`./pornpics/${title}`)) {
        console.log(`Gallery ${title} already exists`)
        return
    }
    console.log(`Crawling gallery ${title}`)
    const $images = $('.thumbwook>a')
    const images = $images.map((i, el) => $(el).attr('href')).get()
    // download images
    for (const image of images) {
        const filename = sanitize(image.split('/').pop())
        await download(image, `./pornpics/${title}`, { filename })
    }
}

async function main() {
    let name = 'alina lopez'
    name = name.replace(' ', '+')
    for (let i = 0; i < 19; i++) {
        await crawlPornstar(name, i)
    }
}
main()