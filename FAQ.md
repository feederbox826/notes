# feederbox FAQ

# [Transcoding](hwaccel)

# Video Playback issues
- HEVC playback is slow? Try [hevc](hevc) first
- Check if you are transcoding
  - [I understand, I can only stream it transcoded](hwaccel)
- It shouldn't be transcoded
  - Check if your codec [combination](https://github.com/stashapp/stash/blob/develop/pkg/ffmpeg/browser.go) is supported
  - Ah darn, how do I transcode?
    - See the discord for instruction on how to transcode without breaking your files
    - [Tdarr](https://home.tdarr.io/)
    - [Unmaniac](https://docs.unmanic.app/)
    - [HandBrake](https://handbrake.fr/)
  - Check if your [browser](https://tools.woolyss.com/html5-audio-video-tester/) supports playback

# WebSockets
## NPM (Nginx Proxy Manager)
- Enable Websockets support in your site page

## Synology DSM
https://mlohr.com/websockets-for-synology-dsm/ is a good writeup for enabling websockets

## Other webservers:
Check the [docs](https://docs.stashapp.cc/networking/reverse-proxy/) for the most up-to-date configurations

# Overall network issues
- Don't use [CF Tunnels](https://blog.cloudflare.com/updated-tos/)