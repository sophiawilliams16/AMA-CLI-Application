const router = require('express').Router();
const askRoutes = require('./ask-routes.js');

router.use('/ask', askRoutes);

module.exports = router;
