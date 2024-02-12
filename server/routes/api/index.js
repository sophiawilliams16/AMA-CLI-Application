const router = require('express').Router();
const chatRoutes = require('./ask-routes.js');

router.use('/ask', userRoutes);

module.exports = router;
