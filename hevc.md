# I'm *pretty sure* I have HEVC support
- Make sure your file is in an `.mp4` container instead of `.mkv`. MKVs almost always have to be transcoded because the format is so open and [firefox explicitly does not support it](https://bugzilla.mozilla.org/show_bug.cgi?id=1422891)

You can test HEVC support [on this site](https://tools.woolyss.com/html5-audio-video-tester/) or by playing back [this video](https://feederbox.cc/pub/bbb_testfile/bbb_h265_1080p60f-30s.mp4) or by downloading the [Jellyfin test videos](https://repo.jellyfin.org/test-videos/)

# Windows
Make sure you have the [HEVC Video Extensions](https://apps.microsoft.com/detail/9n4wgh0z6vhq)  
~~You can also [pay $1 for them](https://apps.microsoft.com/detail/9nmzlz57r3t7)~~ or grab it from a [mirror](hevc-extensions.md)

## Windows/ Firefox
- Install the aforementioned `HEVC Video Extensions`
- Make sure you are updated (> 120)
- Go to `about:config`
- Change `media.wmf.hevc.enabled` to `1` and restart Firefox
- Search for `HEVC` in `about:support` - it should now show `Supported`