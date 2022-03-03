import sharp from 'sharp';
import express from 'express'

async function resize(path: string, w?: number, h?: number,res?:express.Response): Promise<void> {
	try {
		await sharp(`./assets/${path}.jpg`)
			.resize(w, h)
			.toFile(`./thumbs/${path}Thumb${w}_${h}.jpg`);
	} catch (err) {
		res?.send('Error: Unable to do operations right now, Please refresh and try again');
	}
}
export default resize;