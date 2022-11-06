const fs = require("fs");
const path = require("path");
const readStream = fs.createReadStream(
    path.join(__dirname, "/text.txt"),
    "utf-8"
);
// const readStream = fs.createReadStream("./text.txt");

readStream.on("data", (chunk) => {
    console.log(chunk);
});
