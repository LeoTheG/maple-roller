const screenshot = require("screenshot-desktop");
const tesseract = require("node-tesseract");
const Clipper = require("image-clipper");
var Canvas = require("canvas");

var clipper = Clipper();

clipper.injectNodeCanvas(Canvas);

screenshot({ filename: "testshot.png" })
  .then((img) => {
    clipper.image("testshot.png", function () {
      this.crop(660, 346, 75, 100).toFile("testshotcropped.png", function () {
        console.log("saved cropped image!");

        tesseract.process(
          "testshotcropped.png",
          { l: "eng", psm: 6 },
          function (err, text) {
            if (err) {
              console.error(err);
            } else {
              console.log("processed image as: ");
              console.log(text);
              const numCount = (text.match(/4/g) || []).length;
              console.log("got ", numCount, " 4s!");
              if (numCount === 2) {
                console.log("DOUBLE 4");
              }
            }
          }
        );
      });
    });
  })
  .catch((err) => {
    console.log("errrrr", err);
    // ...
  });
