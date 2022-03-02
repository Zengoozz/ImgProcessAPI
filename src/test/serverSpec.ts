	import supertest from 'supertest';
import app from '../server';

describe('Test EndPoint', () => {

	const request = supertest(app);

	it('Get to EndPoint', async () => {
		const response = await request.get('/image');
		expect(response.status).toBe(200);
	});
});