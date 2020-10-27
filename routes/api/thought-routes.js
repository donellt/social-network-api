//import express
const router = require('express').Router();
//assigns the functions from thought-controller.js
const {
  getThoughts, getThought, createThought, updateThought, deleteThought, addReaction, removeReaction,
} = require('../../controllers/thought-controller');


router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

//export thought routes to be used in api/index.js
module.exports = router;