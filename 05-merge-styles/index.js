const { promises: fs } = require("fs");
const path = require("path");
const { createWriteStream, createReadStream } = require("fs");

const fromDir = path.join(__dirname, "styles");
const toDir = path.join(__dirname, "project-dist/bundle.css");
const writeStream = createWriteStream(toDir, { withFileTypes: true });

async function filesPack(files) {
    let isFiles = false;

    for (const file of files) {
        const fileName = file.name;
        const isCss = fileName.match(/\.(css)$/);
        if (file.isFile() && isCss) {
            isFiles = true;
            const pathToFile = path.join(__dirname, `styles/${file.name}`);
            const readStream = createReadStream(pathToFile);
            readStream.on("data", (data) => {
                writeStream.write(data);
            });
        }
    }
    if (!isFiles) {
        await fs.rm(toDir);
    }
}

async function readFiles(directory) {
    try {
        const files = await fs.readdir(directory, { withFileTypes: true });
        filesPack(files);
    } catch (error) {
        console.error(error);
    }
}

readFiles(fromDir);
