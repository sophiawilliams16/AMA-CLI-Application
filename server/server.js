const express = require('express');
const path = require('path');
//const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Add a custom middleware to set the correct MIME type for .jsx files
app.use((req, res, next) => {
  if (req.url.endsWith('.jsx')) {
    res.type('application/javascript');
  }
  next();
});

// Serve 'index.html' for all other routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is live at port ${PORT}`);
});

// db.once('open', () => {
// 	app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`));
// });
