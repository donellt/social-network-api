const router = require('express').Router();
//imports the userRoutes
const userRoutes = require('./user-routes');
//imports the thoughtRoutes
const thoughtRoutes = require('./thought-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

//exports both the user and thought routes
module.exports = router;
