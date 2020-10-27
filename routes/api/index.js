//import express and the thought-routes.js & user-routers.js files
const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

//export to be used in routes/index.js
module.exports = router;
