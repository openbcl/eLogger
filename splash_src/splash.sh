#!/bin/bash
array=( 750x1334x2 640x1136x2 768x1024x1 828x1792x2 1080x1920x3 1080x2340x3 1125x2436x3 1170x2532x3 1242x2208x3 1242x2688x3 1284x2778x3 1488x2266x2 1536x2048x2 1620x2160x2 1640x2360x2 1668x2224x2 1668x2388x2 2048x2732x2 )
rm -f ./index_splash.html
for i in "${array[@]}"
do
  split=(${i//x/ })
  width=${split[0]}
  height=${split[1]}
  dpr=${split[2]}
  portrait="${width}x${height}"
  landscape="${height}x${width}"
  #gm convert -background '#333333' -geometry $((10#${width}/5)) "logo.png" -gravity center -extent ${portrait}  portrait_${portrait}.png
  #gm convert -background '#333333' -geometry $((10#${width}/5)) "logo.png" -gravity center -extent ${landscape} landscape_${landscape}.png
  echo "<link rel=\"apple-touch-startup-image\" href=\"assets/splashscreens/portrait_${portrait}.png\" media=\"(device-width: $((width/dpr))px) and (device-height: $((height/dpr))px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: portrait)\">" >> index_splash.html
  echo "<link rel=\"apple-touch-startup-image\" href=\"assets/splashscreens/landscape_${landscape}.png\" media=\"(device-width: $((height/dpr))px) and (device-height: $((width/dpr))px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: landscape)\">" >> index_splash.html
done
