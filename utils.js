const fs = require('fs');

const writeFile = (path, contents)=> {
    fs.writeFile(path, JSON.stringify(contents),(err)=> {
        if(err) {
            console.error(err);
        }
        console.log("saved")
    })
}

module.exports = {
    writeFile
}