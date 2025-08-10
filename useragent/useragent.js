const getRemoteUA = () => fetch("https://jnrbsn.github.io/user-agents/user-agents.json")
    .then(res => res.json())

async function setUA() {
  const remoteUA = await getRemoteUA()
  document.getElementById('chrome-latest').textContent = remoteUA[3]
  document.getElementById('firefox-latest').textContent = remoteUA[9]
  document.getElementById('current-browser').textContent = window.navigator.userAgent
}
setUA()

const copyClipboard = (id) => navigator.clipboard.writeText(document.getElementById(id).textContent)