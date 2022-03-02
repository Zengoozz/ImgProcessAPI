import resize from '../../utilities/resize';



describe('Resize', () => {
	const testName = 'palmtunnel';
	const testWidth = 1000;
	const testHeight = 1000;

	it('Fn not to throw errors', () => {
		expect(async() : Promise<void> =>{
			await resize(testName,testWidth,testHeight)
		}).not.toThrow();	
	});
});