import express from 'express';
import fs from 'fs';
import path from 'path';
import resize from './utilities/resize';

const port = 8000;
const app = express();

function isValid(x: number): boolean {
	if (x > 0 && isNaN(x) == false) {
		return true;
	}
	else return false;

}


app.get('/image', (req:express.Request, res:express.Response): void => {
	const imgName = req.query.name;
	const wS = req.query.width;
	const hS = req.query.height;
	const w = parseInt(`${wS}`);
	const h = parseInt(`${hS}`);
	//ImgName not def
	if (imgName == null) {
		res.send('Please specify image name via parameters.');
	}
	//ImgName def
	else if (imgName) {
		//ImgName def but not exist
		if (fs.existsSync(path.join('assets', `${imgName}.jpg`)) == false) {
			res.send('Error: Invalid input; Image doesn\'t exist. Please specify image name correctly.');
		}
		//ImgName def and existed
		else if (fs.existsSync(path.join('assets', `${imgName}.jpg`))) {
			//Width and height are'nt defined
			if (wS == null && hS == null) {
				res.sendFile(path.resolve(path.join('assets', `${imgName}.jpg`)));
			}
			//Width or Height is not defined
			else if ((wS == null && hS != null) || (wS != null && hS == null)) {
				res.send('Error: Please specify both height and width via parameters or Just specify name only to show the original image.');
			}
			//Width and height are defined
			else if (wS != null && hS != null) {
				//Width or height is invalid
				if (isValid(parseInt(`${wS}`)) == false || isValid(parseInt(`${hS}`)) == false) {
					res.send('Error: Invalid input; Width and height must be postive integers.');
				}
				//Width and height are valid
				else if (isValid(parseInt(`${wS}`)) && isValid(parseInt(`${hS}`))) {
					//Image existed in the specified parameters
					if (fs.existsSync(path.join('thumbs', `${imgName}Thumb${w}_${h}.jpg`))) {
						res.sendFile(path.resolve(path.join('thumbs', `${imgName}Thumb${w}_${h}.jpg`)));
					}
					//Image doesn't exist in the specified parameters
					else {
						resize(`${imgName}`, w, h,res.send('Unable to perform operation right now, Just refresh and try again.')).then(():void => {
							res.sendFile(path.resolve(`./thumbs/${imgName}Thumb${w}_${h}.jpg`))
						});
					}

				}
			}

		}
	}
});


app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});

export default app;