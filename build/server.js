"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var resize_1 = __importDefault(require("./utilities/resize"));
var port = 8000;
var app = (0, express_1.default)();
function isValid(x) {
    if (x > 0 && isNaN(x) == false) {
        return true;
    }
    else
        return false;
}
app.get('/image', function (req, res) {
    var imgName = req.query.name;
    var wS = req.query.width;
    var hS = req.query.height;
    var w = parseInt("".concat(wS));
    var h = parseInt("".concat(hS));
    //ImgName not def
    if (imgName == null) {
        res.send('Please specify image name via parameters.');
    }
    //ImgName def
    else if (imgName) {
        //ImgName def but not exist
        if (fs_1.default.existsSync(path_1.default.join('assets', "".concat(imgName, ".jpg"))) == false) {
            res.send('Error: Invalid input; Image doesn\'t exist. Please specify image name correctly.');
        }
        //ImgName def and existed
        else if (fs_1.default.existsSync(path_1.default.join('assets', "".concat(imgName, ".jpg")))) {
            //Width and height are'nt defined
            if (wS == null && hS == null) {
                res.sendFile(path_1.default.resolve(path_1.default.join('assets', "".concat(imgName, ".jpg"))));
            }
            //Width or Height is not defined
            else if ((wS == null && hS != null) || (wS != null && hS == null)) {
                res.send('Error: Please specify both height and width via parameters or Just specify name only to show the original image.');
            }
            //Width and height are defined
            else if (wS != null && hS != null) {
                //Width or height is invalid
                if (isValid(parseInt("".concat(wS))) == false || isValid(parseInt("".concat(hS))) == false) {
                    res.send('Error: Invalid input; Width and height must be postive integers.');
                }
                //Width and height are valid
                else if (isValid(parseInt("".concat(wS))) && isValid(parseInt("".concat(hS)))) {
                    //Image existed in the specified parameters
                    if (fs_1.default.existsSync(path_1.default.join('thumbs', "".concat(imgName, "Thumb").concat(w, "_").concat(h, ".jpg")))) {
                        res.sendFile(path_1.default.resolve(path_1.default.join('thumbs', "".concat(imgName, "Thumb").concat(w, "_").concat(h, ".jpg"))));
                    }
                    //Image doesn't exist in the specified parameters
                    else {
                        (0, resize_1.default)("".concat(imgName), w, h, res.send('Unable to perform operation right now, Just refresh and try again.')).then(function () {
                            res.sendFile(path_1.default.resolve("./thumbs/".concat(imgName, "Thumb").concat(w, "_").concat(h, ".jpg")));
                        });
                    }
                }
            }
        }
    }
});
app.listen(port, function () {
    console.log("server started at http://localhost:".concat(port));
});
exports.default = app;
