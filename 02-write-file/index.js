const { stdin, stdout } = process;
const fs = require("fs");
const path = require("path");
const writeStream = fs.createWriteStream(path.join(__dirname, "./text.txt"));

stdout.write('Enter the text:\n')

stdin.on("data", (data) => {
    const dataStringified = data.toString();
    writeStream.write(data);
    if (dataStringified.indexOf("exit") !== -1) {
        process.exit();
    }
});

process.on('exit', () => stdout.write('Good luck!'));
process.on('SIGINT', () => process.exit())