'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
	return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
var resize_1 = __importDefault(require('../../utilities/resize'));
var image_size_1 = __importDefault(require('image-size'));
describe('Resize', function () {
	beforeAll(function () {
		var path = 'fjord';
		var w = 1000;
		var h = 1000;
		(0, resize_1.default)(''.concat(path), w, h);
	});
	it('Matching width & height', function () {
		(0, image_size_1.default)('thumbs/fjordThumb.jpg', function (err, dim) {
			expect(dim === null || dim === void 0 ? void 0 : dim.height).toEqual(1000);
		});
		(0, image_size_1.default)('thumbs/fjordThumb.jpg', function (err, dim) {
			expect(dim === null || dim === void 0 ? void 0 : dim.width).toEqual(1000);
		});
	});
});
