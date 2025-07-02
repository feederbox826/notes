function cookieTxtParser(cookieTxt, filename = "") {
  const cookies = []
  for (const line of cookieTxt.split('\n')) {
    // skip comments
    if (line.startsWith('#') || line.trim() == "") continue
    // split by tabs
    const [domain, subdomains, path, httpsonly, expiry, name, value] = line.split('\t').map(l => l.trim())
    if (!filename && domain && subdomains !== "TRUE") filename = domain
    cookies.push({
      domain,
      subdomain: subdomains == 'TRUE',
      path,
      secure: httpsonly == 'TRUE',
      expiry, name, value
    })
  }
  return [cookies, filename]
}

const stashCookieYML = (cookies, filename) => {
  const cookieText = cookies.map(cookie => `
        - Name: "${cookie.name}"
          Value: "${cookie.value}"
          Domain: "${cookie.domain}"
          Path: "${cookie.path}"`).join('')
  return `driver:
  cookies:
    - CookieURL: "https://${filename.split('_cookies.txt')[0]}/"
      Cookies:${cookieText}`
}

const convertCookies = async (text, filename) => {
  const finishText = await text
  const [cookies, extrafilename] = cookieTxtParser(finishText, filename)
  const yml = stashCookieYML(cookies, filename.length ? filename : extrafilename)
  document.getElementById('yml').textContent = yml
}
const convertText = () => convertCookies(document.getElementById('txt').value, "")
const uploadFile = (file) => convertCookies(file.text(), file.name)
const fileHandler = (files) => [...files].forEach(file => convertCookies(file.text(), file.name))
const dropHandler = (e) => {
  e.preventDefault()
  fileHandler(e.dataTransfer.files)
}
const chooseHandler = (e) => fileHandler(e.target.files)
const dragOverHandler = (e) => e.preventDefault()
const copyToClipboard = () => navigator.clipboard.writeText(document.getElementById('yml').textContent)
