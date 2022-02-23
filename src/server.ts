import express from 'express';
import path from 'path';
import resize from './utilities/resize';

const port = 8000;
const app = express();

app.get('/image', (req, res) => {
	const imgName = req.query.name;
	const widthString = req.query.width;
	const heightString = req.query.height;
	const w = parseInt(`${widthString}`);
	const h = parseInt(`${heightString}`);

	if (imgName == null) {
		res.send('No placed image yet!');
	}
	else {
		if (widthString == null && heightString == null) {
			res.sendFile(path.resolve(`./assets/${imgName}.jpg`), (err) => {
				if (err) {
					console.error(err);
					res.send('Image Not Found');

				}
			});
		}
		else {
			resize(`${imgName}`, w, h).then(() => {
				res.sendFile(path.resolve(`./thumbs/${imgName}Thumb${w}_${h}.jpg`), (err) => {
					if (err) {
						console.error(err);
						res.send('Image Not Found');
					}
				});
			});
		}
	}
});

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});

export default app;