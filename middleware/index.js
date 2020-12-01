const express = require('express');
const app = express();
const port = 2000;

app.get('/', (req, res) => {
	res.send('Middleware');
});

app.listen(port, () => {
	console.log(`Middlewar -> ${port}`);
});
