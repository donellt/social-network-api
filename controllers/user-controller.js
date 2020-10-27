const { User, Thought } = require('../models');

const userController = {
  //get all the users in api
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      //catch any errors
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //get one user found by ID
  getUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((dbUserData) => {
        if (!dbUserData) {
          //error message (no user with specified ID)
          return res.status(404).json({ message: 'There are no users with that ID!' });
        }
        res.json(dbUserData);
      })
      //catch any errors
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      //catch any errors
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //update an existing user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          //error message (no user with specified ID)
          return res.status(404).json({ message: 'There are no users with that ID!' });
        }
        res.json(dbUserData);
      })
      //catch any errors
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //delete one user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          //error message (no user with specified ID)
          return res.status(404).json({ message: 'There are no users with that ID!' });
        }
      })
      .then(() => {
        //success message (user and user info deleted)
        res.json({ message: 'User and User Data has been deleted' });
      })
      //catch any errors
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //add a friend to user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          //error message (no user with specified ID)
          return res.status(404).json({ message: 'There are no users with that ID!' });
        }
        res.json(dbUserData);
      })
      //catch any errors
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //fremove a friend from user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          //error message (no user with specified ID)
          return res.status(404).json({ message: 'There are no users with that ID!' });
        }
        res.json(dbUserData);
      })
      //catch any errors
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

//exports user controller for use outside of file
module.exports = userController;
