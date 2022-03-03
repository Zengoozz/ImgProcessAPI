	import supertest from 'supertest';
import app from '../server';

describe('Test EndPoint', () => {

	const request = supertest(app);

	it('Get to endPoint', async () => {
		const response = await request.get('/image');
		expect(response.status).toBe(200);
	});

	it('Get to resize endPoint',async() => {
		const response = await request.get('/image?name=fjord&width=100&height=100');
		expect(response.status).toBe(200);
	})
});