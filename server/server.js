const express = require('express');
const path = require('path');
//const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is live at port ${PORT}`);
});

// if we're in production, serve client/dist as static assets
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/')));
}

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/index.html'));
});

// db.once('open', () => {
// 	app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`));
// });
