const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());

// Serve static files from the `api` directory
const publicPath = path.join(__dirname, 'api');
app.use('/api/localize', express.static(publicPath));

// Root route
app.get("/", (req, res) => {
    res.send("OK");
});

// Route to serve language files
app.get("/api/localize/:lang", (req, res) => {
    const lang = req.params.lang;
    if (lang === 'en') {
        const filePath = path.join(publicPath, `localize/${lang}.json`);
        res.sendFile(filePath, err => {
            if (err) {
                console.error("Error serving file:", err);
                res.status(404).send("Language file not found");
            }
        });
    } else {
        res.status(404).send("Language file not found");
    }
});

// Route to provide language information (optional)
app.get("/api/localize/info", (req, res) => {
    res.json({
        "en": "English"
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
