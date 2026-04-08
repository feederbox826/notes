## tl;dr
- use (and copy from) existing scrapers (as long as you respect the licence)
- https://docs.stashapp.cc/in-app-manual/scraping/scraperdevelopment/
- for xpath, https://devhints.io/xpath
- LLMs prefer writing python, but it is much slower than .yml
- disable javascript on sites

## selectors and opengraph
https://devhints.io/xpath is one of the best references for xpath.

xpath testing can be done locally in-browser, no extensions needed. Enter dev mode (F12) and in the Elements tab, hit Ctrl + F. A search box pops up which allows finding by selector, string or XPath. Plug your query in and it will validate it and show results

Selecting element in browser and copying the full xpath is not usually very helpful, fortunately you can use uBlock Origin and right click for "Block Element" and a pop-up will appear that lets you hover and select elements using a simplfied path you can later convert to xpath.
This can be done by removing the two preceding `#` from the selector, as that's the syntax used by AdGuard (and uBO)

### opengraph
Websites LOVE SEO and one of the ways is to support [OpenGraph](https://ogp.me/). Let's exploit it.

In dev mode, head to elements and open up the `<head>` element. Look for `<meta>` blocks. These usually contain opengraph descriptions and machine-readable properties already pre-formatted for our ~~scraper~~ SEO needs. These can be selected with the following scraper syntax
```
/html/head/meta[@property="og:title"]/@content
```

If you can't seem to find any obvious ones, go back to the search bar (Ctrl + F) and start typing in the text content that you want to scrape (title, description, studio) and see if there are multiple or cleaner results that can be scraped from instead.

There is also [`ld+json`](https://json-ld.org/) and `__NEXT_DATA__` but that goes into regex.

## regex (and unholy sins)

regex is tricky, https://regexr.com/ and https://regex101.com/ are great resouces for testing regex patterns
Keep in mind that the postprocess replace: is more of a substitution. Anything not selected will remain in the string, so select everything if you want it wholly gone.

### `ld+json`
[ld-json](https://json-ld.org/) is a really popular and powerful way to get metadata and is already used in [multiple scrapers](https://github.com/search?q=repo%3Astashapp%2FCommunityScrapers+application%2Fld%2Bjson&type=code)

Unfortunately this requires us to commit some [unholy sins](https://stackoverflow.com/a/1732454)

Here's my shortcut to sinning

```regex
Title:
  selector: //script[@type="application/ld+json"]/text()
  postProcess:
    - replace:
	  - regex: .*"fieldName":\s?"([^"]).+"
	    with: $1
```

Throw that in [regexr](regexr.com/8hs9q) and we can see that it captures the value for the fieldName property and then captures it into $1 for parsing. This has a lot of benefits similar to OpenGraph but since it's in JSON it's much harder to parse.
If you are reusing it for multiple properties, throwing it into `common` can save you a lot of wasted characters down the line

### `__NEXT_DATA__`
This is where it gets weird and wacky. Next is a framework used by [a few sites](https://github.com/search?q=repo%3Astashapp%2FCommunityScrapers+__NEXT_DATA__&type=code) that is very similar to ld+json. The main difference is that you'll want to disable javascript in your browser for that site in order to see it for most of it's glory and to properly search it. __NEXT_DATA__ usually contains all the metadata displayed on the site, but is usually nested multiple levels of JSON deep.

[AD4X](https://github.com/stashapp/CommunityScrapers/blob/f85e44fa8be1e07b3b5f3d4995c526903ec6f286/scrapers/AD4X.yml) is a great example of scraping NEXT_DATA. 

If we take a look at the regex
```regex
.+"content":{(?:[^}]+)"publish_date":"(\d{4}\/\d{2}\/\d{2}).+
```
there is one key difference, content and `[^}]+`. This matches everything underneath the `content:` object. NEXT_DATA is usually minifed so throwing it into a [JSON prettier](https://jsonformatter.curiousconcept.com/) really helps.
The reason for the `content` block is because NEXT_DATA includes everything, it also includes data for other scenes (recommendations, etc...). Be very wary of sub-blocks and arrays when scraping `__NEXT_DATA__`, it's much trickier than ld+json

## troubleshooting
**Disable javascript**
Many sites have frontend loaders, these can sometimes transform the HTML for the browser. Stash does not see this unless useCDP is enabled, which is slower, intensive with RAM and not as accessible. Diabling javascript and scraping the sites elements usually does the trick