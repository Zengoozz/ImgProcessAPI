import sharp from 'sharp';
import { promises as fs } from 'fs';

async function resize(path: string, w?: number, h?: number) {
	try {
		const convertedImg = sharp(`./assets/${path}.jpg`)
			.resize(w, h);
		await fs.writeFile(`./thumbs/${path}Thumb${w}_${h}.jpg`,convertedImg);
	} catch (err) {
		console.log(err);
	}
}
export default resize;