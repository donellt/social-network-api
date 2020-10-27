//import express and the api routes from /api
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Incorrect route...');
});

//exports router to be used outside of file
module.exports = router;
