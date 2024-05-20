# I'm pretty sure I have HEVC support
- Make sure your file is in an `.mp4` container instead of `.mkv`. MKVs almost always have to be transcoded because the format is so open

You can test HEVC support [on this site](https://tools.woolyss.com/html5-audio-video-tester/) or by playing back [this video](https://feederbox.cc/pub/bbb_testfile/bbb_h265_1080p60f-30s.mp4)


## Windows/ Firefox
- Make sure you are updated (> 120)
- Go to `about:config`
- Change `media.wmf.hevc.enabled` to `1` and restart firefox
- Search for `HEVC` in `about:support` - it should now show `Supported`