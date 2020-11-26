# maple-roller

Automate rolling the die for maplestory using OCR through tesseract

Stops rolling when it detects two 4s or a 10+

Tested on windows 10 with node 10

Assumes a static window size, and that the window is in the top left of the screen

Run as administrator since it moves mouse and creates images

## setup

`npm install` in server

install tesseract, windows installer here https://github.com/UB-Mannheim/tesseract/wiki

I had to manually edit `node-tesseract`'s `teserract.js`:

change `fs.unlink(files[0])` to `fs.unlink(files[0],(err)=>{ if(err){ console.log(err); } })`

psm command is now two dashed lines not 1, in tesseract.js change to

`command.push('--psm ' + options.psm)`

## run

`npm start`

## compile

compile a .exe using `npm run compile`

GIF of usage:

https://imgur.com/a/tOTvWv0