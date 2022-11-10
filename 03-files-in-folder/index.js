const fs = require("fs");
const path = require("path");

fs.readdir(
    "03-files-in-folder/secret-folder",
    { withFileTypes: true },
    (err, data) => {
        if (err) throw err;

        data.forEach((file) => {
            if (!file.isDirectory())
                fs.stat(
                    path.join("03-files-in-folder/secret-folder", file.name),
                    (error, stats) => {
                        if (error) {
                            console.log(error);
                        }
                        console.log(
                            file.name,
                            " - ",
                            path.extname(file.name),
                            " - ",
                            stats.size,
                            "bytes"
                        );
                    }
                );
        });
    }
);
