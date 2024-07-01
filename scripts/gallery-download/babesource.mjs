import * as cheerio from 'cheerio';
import axios from 'axios';
import download from 'download';
import fs from 'fs';
import sanitize from 'sanitize-filename';

const fakeClient = axios.create({
    baseURL: "https://babesource.com",
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
    },
})

async function crawlPornstar(num) {
    const url = `/pornstars/alina-lopez-5360/page${num}.html`
    const response = await fakeClient.get(url)
    console.log(response.status)
    const $ = cheerio.load(response.data)
    // find all links
    const $galleries = $('.main-content__card-link')
    const links = $galleries.map((i, el) => $(el).attr('href')).get()
    return links
}

async function crawlGallery(path) {
    const response = await fakeClient.get(path)
    const $ = cheerio.load(response.data)
    const title = sanitize(path.split('/').pop().split('.').shift())
    // check if directory exists
    if (fs.existsSync(`./bs/${title}`)) {
        console.log(`Gallery ${title} already exists`)
        return
    }
    console.log(`Crawling gallery ${title}`)
    const $images = $('a.box-massage__card-link')
    const images = $images.map((i, el) => $(el).attr('href')).get()
    // download images
    for (const image of images) {
        const filename = sanitize(image.split('/').pop())
        const url = encodeURI(image)
        await download(url, `./bs/${title}`, { filename })
    }
}

async function main() {
    for (let i = 1; i < 4; i++) {
        const galleryLinks = await crawlPornstar(i)
        console.log(galleryLinks)
        for (const gallery of galleryLinks) {
            crawlGallery(gallery)
        }
    }
}
main()