# Transcoding

## Transcoding without breaking stash
Stash identifies files based on two (or optionally 3) properties, `oshash` [^1], `filepath` and optionally `md5` [^2] if enabled in the settings.

`phash` is designed to be consistent across transcodes but cannot be guaranteed to be exactly the same if transcoded and is also not used for matching files

### Renaming
Using the example file `MyVideo.mov` and `MyVideo.mp4`

1. Run a scan and make sure the file is picked up in the original format and filename (MOV, .mov)
2. Rename the file to the target extension `MyVideo.mov` -> `MyVideo.mp4`
3. Run a scan in stash again to pick up the renamed file, matched by `oshash`
4. Rename the file back to `MyVideo.mov`
5. Transcode the file from `MyVideo.wmv` to `MyVideo.mp4` (assuming `MyVideo.wmv` is destroyed)
6. Run scan again to pick up the renamed file, matched by `filepath`

### In-Place transcoding
In some transcoders, there's an option for in-place transcoding, where you keep the filename and overwrite the exsting file. After transcoding, stash will match the file by `filepath`

## .mkv
`mkv` is the format that most transcoders aim for because it supports everything. You can have `flac` audio alongside `wmv` video. This is why they are preferred by encoders as they can throw everything and anything in as they support [an unlimited number of any video/audio/picture/subtitle tracks](https://en.wikipedia.org/wiki/Matroska). You could merge your entire stash library into an mkv file and it would still be spec compliant ~~but you shouldn't~~

This leads to [problems](./hevc) in decoding for firefox and for some combinations in web browsers, even though it works well in other app decoders like VLC, mpv etc...

## on codecs
You ***will*** experience quality loss. That is inevitable. The question is not if, but how much quality loss is acceptable to you

- H264 / x264 / AVC
  - Widespread support
  - Never worth reencoding back into from x265/av1 unless you have compatibility issues
- H265 / x265 / HEVC
  - Support is not as widespread as 264
  - Not usually worth reencoding unless you are short on space or combining with downscaling (4k -> 1080p)
  - Transcoding from x264 usually comes with [noticeable quality loss](https://trash-guides.info/Misc/x265-4k/#microsized-wrong-source)
  - Expect [25-50%](https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding) space savings compared to x264
  - Encoding is cheap, fast and available (HW and SW)
- AV1
  - [Support is a lot more sparse](https://en.wikipedia.org/wiki/AV1#Hardware_encoding_and_decoding_support) but software decoders like `dav1d` are becoming more widespread and faster
  - Hardware encoding is rare, specialized and software encoding is extremely slow
  - Space savings of [50.3%, 46.2% over x264 main and high](https://engineering.fb.com/2018/04/10/video-engineering/av1-beats-x264-and-libvpx-vp9-in-practical-use-case/)
  - In my _personal_ experience, space savings up to 80% at 95VMAF but averaging closer to 65%

# Footnotes
[^1]: `oshash` is based on the head and tail of the file. This will change during transcoding and any "properties" being edited https://github.com/r-salas/oshash?tab=readme-ov-file#how-it-works
[^2]: `md5` is a cryptographic hash that will change if any part of the file is changed, transcoding and "properties" included
[^3]: `phash` is based on the video contents https://github.com/stashapp/stash/blob/develop/pkg/hash/videophash/phash.go