//import express
const router = require('express').Router();
//assigns the functions from user-controller.js
const {
  getUsers, getUser, createUser, updateUser, deleteUser, addFriend, removeFriend,
} = require('../../controllers/user-controller');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

//exports user routes to be used outside of file
module.exports = router;
