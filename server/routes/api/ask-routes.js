const express = require("express");
const router = express.Router();
const promptFunc = require("../../script.js");

router.post("/ask", async (req, res) => {
    try {
        const prompt = req.body.question;
        const response = await promptFunc(prompt);
        res.json({ response });
    } catch (error) {
        console.log("Error processing the request");
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
