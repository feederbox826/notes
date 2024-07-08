import * as cheerio from "cheerio";
import axios from "axios";
import download from "download";
import fs from "fs";
import sanitize from "sanitize-filename";

// config
let name = "alina lopez";
const pages = 9;

const fakeClient = axios.create({
  baseURL: "https://www.porngals4.com",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  },
});

async function crawlPornstar(name, num) {
  const url = `/${name}/${num}/`;
  const response = await fakeClient.get(url);
  console.log(response.status);
  const $ = cheerio.load(response.data);
  // find all links
  const $galleries = $(".gl1>.item");
  const links = $galleries.map((i, el) => $(el).find("a").attr("href")).get();
  return links;
}

async function crawlGallery(path) {
  const response = await fakeClient.get(path);
  const $ = cheerio.load(response.data);
  const title = sanitize($("h1").text());
  // check if directory exists
  if (fs.existsSync(`./pg4/${title}`)) {
    console.log(`Gallery ${title} already exists`);
    return;
  }
  console.log(`Crawling gallery ${title}`);
  const $images = $(".gal>a");
  const images = $images.map((i, el) => $(el).attr("href")).get();
  // download images
  for (const image of images) {
    if (badlinks.includes(image)) {
      continue;
    }
    const filename = sanitize(image.split("/").pop());
    await download(image, `./pg4/${title}`, { filename });
  }
}

async function main() {
  name = name.replace(" ", "-");
  for (let i = 1; i < pages; i++) {
    const galleryLinks = await crawlPornstar(name, i);
    console.log(galleryLinks);
    for (const gallery of galleryLinks) {
      crawlGallery(gallery);
    }
  }
}
main();
