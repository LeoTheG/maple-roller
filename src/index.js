const screenshot = require("screenshot-desktop");
const tesseract = require("node-tesseract");
const Canvas = require("canvas");
const robot = require("robotjs");
const clipper = require("image-clipper")();
const fs = require("fs");

clipper.injectNodeCanvas(Canvas);

let interval;

const desktopImageName = "ms-roll-desktop-screenshot.png";
const croppedImageName = "cropped.png";

function screenshotAnalyze() {
  screenshot({ filename: desktopImageName })
    .then((img) => {
      clipper.image(desktopImageName, function () {
        this.crop(660, 346, 75, 100).toFile(croppedImageName, function () {
          tesseract.process(
            croppedImageName,
            { l: "eng", psm: 6 },
            function (err, text) {
              if (err) {
                console.error(err);
              } else {
                console.log("processed image as: ");
                console.log(text);
                const numCount = (text.match(/4/g) || []).length;

                const hasHighNum = text.match(/[1][1-9]/g);

                console.log("detected high number? ", !!hasHighNum);

                if (numCount === 2) {
                  console.log("detected 2 4s");
                }

                if (numCount === 2 || hasHighNum) {
                  clearInterval(interval);
                  console.log("found good nums, stopping rolling");
                  fs.unlink(desktopImageName, console.log);
                  fs.unlink(croppedImageName, console.log);
                } else {
                  console.log("clicking mouse");
                  robot.moveMouse(645, 350);
                  robot.mouseClick();
                }
              }
            }
          );
        });
      });
    })
    .catch((err) => {
      console.log(err);
      clearInterval(interval);
    });
}

function main() {
  robot.moveMouse(645, 350);
  robot.mouseClick();
  interval = setInterval(screenshotAnalyze, 1000);
}

module.exports = main;
