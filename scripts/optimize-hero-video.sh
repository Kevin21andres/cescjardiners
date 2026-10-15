#!/usr/bin/env bash
set -euo pipefail

source="public/video/fondohome.mp4"
tempfile="public/video/.fondohome-optimized.mp4"
test -f "$source"
command -v ffmpeg >/dev/null
# Preserve the original composition while dramatically reducing transferred bytes.
ffmpeg -hide_banner -loglevel error -y -i "$source"   -map 0:v:0 -an   -vf "scale='min(1600,iw)':-2,fps=24"   -c:v libx264 -preset medium -crf 28 -maxrate 1800k -bufsize 3600k   -pix_fmt yuv420p -movflags +faststart "$tempfile"
test -s "$tempfile"
old=$(wc -c < "$source")
new=$(wc -c < "$tempfile")
echo "Video: $old -> $new bytes"
if (( new < old )); then
  mv "$tempfile" "$source"
else
  echo "Optimized file was not smaller; keeping source."
  rm "$tempfile"
fi
