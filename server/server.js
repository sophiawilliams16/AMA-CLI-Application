const express = require('express');
const promptFunc = require("./script");
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.use(express.json());

// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Add a custom middleware to set the correct MIME type for .jsx files
app.use((req, res, next) => {
  if (req.url.endsWith('.jsx')) {
    res.type('application/javascript');
  }
  next();
});

app.post("/api/ask", async (req, res) => {
  try {
    const userQuestion = req.body.question;
    const response = await promptFunc(userQuestion);
    res.json({ response });
  } catch (error){
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve 'index.html' for all other routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is live at port ${PORT}`);
});
