const router = require('express').Router();
const askRoutes = require('./ask-routes.js');

router.use('/api', askRoutes);

module.exports = router;
