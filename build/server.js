'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
	return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var path_1 = __importDefault(require('path'));
var resize_1 = __importDefault(require('./utilities/resize'));
var port = 8000;
var app = (0, express_1.default)();
app.get('/image', function (req, res) {
	var imgName = req.query.name;
	var widthString = req.query.width;
	var heightString = req.query.height;
	var w = parseInt(''.concat(widthString));
	var h = parseInt(''.concat(heightString));
	if (imgName == null) {
		res.send('Waiting');
	}
	else {
		if (widthString == null && heightString == null) {
			res.sendFile(path_1.default.resolve('./assets/'.concat(imgName, '.jpg')));
		}
		else {
			(0, resize_1.default)(''.concat(imgName), w, h).then(function () {
				res.sendFile(path_1.default.resolve('./thumbs/'.concat(imgName, 'Thumb.jpg')));
			});
		}
	}
});
app.listen(port, function () {
	console.log('server started at http://localhost:'.concat(port));
});
exports.default = app;
