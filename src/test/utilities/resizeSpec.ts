import resize from '../../utilities/resize';
import sizeOf from 'image-size';

describe('Resize', () => {
	beforeAll(() => {

		const path = 'fjord';
		const w = 1000;
		const h = 1000;
		resize(`${path}`, w, h);
	});

	it('Matching width & height', () => {
		sizeOf('thumbs/fjordThumb.jpg', function (err, dim) {
			expect(dim?.height).toEqual(1000);
		});
		sizeOf('thumbs/fjordThumb.jpg', function (err, dim) {
			expect(dim?.width).toEqual(1000);
		});

	});
});