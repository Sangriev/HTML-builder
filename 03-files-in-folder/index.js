const fs = require("fs");
const path = require("path");

fs.readdir(
    "03-files-in-folder/secret-folder",
    { withFileTypes: true },
    (err, data) => {
        if (err) throw err;

        data.forEach((file) => {
            if (!file.isDirectory())
                console.log(
                    file.name +
                        " \t\t " +
                        path.extname(file.name) +
                        " \t\t " +
                        fs.statSync(
                            "03-files-in-folder/secret-folder/" + file.name
                        ).size
                );
        });
    }
);
