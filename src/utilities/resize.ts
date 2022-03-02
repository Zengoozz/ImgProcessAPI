import sharp from 'sharp';
import { promises as fs } from 'fs';
import express from 'express'

async function resize(path: string, w?: number, h?: number, res?: express.Response): Promise<void> {
	try {
		const convertedImg = sharp(`./assets/${path}.jpg`)
			.resize(w, h);
		await fs.writeFile(`./thumbs/${path}Thumb${w}_${h}.jpg`, convertedImg);
	} catch (err) {
		res;
	}
}
export default resize;