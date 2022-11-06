const { promises: fs } = require("fs");
const path = require("path");

async function copyFromTo(fromDir, toDir) {
    if (await dirExist(toDir)) {
        await fs.rm(toDir, { recursive: true });
    }

    return copyFromToRec(fromDir, toDir);
}

async function copyFromToRec(fromDir, toDir) {
    if (!(await dirExist(toDir))) {
        await fs.mkdir(toDir);
    }

    const files = await fs.readdir(fromDir);
    for (const file of files) {
        const filePath = path.join(fromDir, file);
        const copyPath = path.join(toDir, file);
        const stat = await fs.lstat(filePath);
        if (stat.isDirectory()) {
            await copyFromToRec(filePath, copyPath);
            continue;
        }

        await fs.copyFile(filePath, copyPath);
    }
}

async function dirExist(dir) {
    return fs.access(dir).then(
        () => true,
        () => false
    );
}

copyFromTo(
    path.resolve(__dirname, "files"),
    path.resolve(__dirname, "files-copy")
);
