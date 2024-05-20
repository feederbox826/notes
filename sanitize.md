# Sanitize your stash screenshot for public consumption

```js
// remove images with transparent png
// https://feederbox.cc/pub/transparent.png
const imgSrc = "https://feederbox.cc/pub/transparent.png"
document.querySelectorAll(".scene-card img").forEach(img => img.src=imgSrc)

// replace scene images with blurred
document.querySelectorAll(".scene-card img.scene-card-preview-image").forEach(img => img.style.filter='blur(10px)')

// replace all titles with Lorem Ipsum
const lipsum = "Lorem Ipsum"
document.querySelectorAll(".card-section-title>div").forEach(title => title.textContent = lipsum)

// replace all descriptions with longer lorem ipsum
const lipsumBody = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo a diam sollicitudin tempor id eu nisl nunc. Massa tincidunt dui ut ornare lectus sit amet. Euismod quis viverra nibh cras pulvinar mattis."
document.querySelectorAll(".scene-card__description").forEach(txt => txt.textContent = lipsumBody)

// replace dates with linux epoch
const epoch = "1970-01-01"
document.querySelectorAll(".scene-card__date").forEach(date => date.textContent = epoch)
```