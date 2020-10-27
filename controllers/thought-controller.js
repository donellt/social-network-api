const { Thought, User } = require('../models');

const thoughtController = {
  //get all the thoughts in api
  getThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      //catch any errors
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //get one thought found by ID
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          //error message (no thought with specified ID)
          return res.status(404).json({ message: 'There are no thoughts with this ID' });
        }
        res.json(dbThoughtData);
      })
      //catch any errors
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //create one thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
        //error message (no user data)
          return res.status(404).json({ message: 'The thought was created but there is no user with that ID' });
        }
        //success message
        res.json({ message: 'The thought was created' });
      })
      //catch any errors
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //update one thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          //error message (no thought with specified ID)
          return res.status(404).json({ message: 'There are no thoughts with this ID' });
        }
        res.json(dbThoughtData);
      })
      //catch any errors
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //delete one thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          //error message (no thought with specified ID) 
          return res.status(404).json({ message: 'There are no thoughts with this ID' });
        }

        //get rid of the thought id from users thoughts
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
        //error message (no user data)
          return res.status(404).json({ message: 'The thought was created but there is no user with that ID' });
        }
        //success message
        res.json({ message: 'The thought was deleted' });
      })
      //catch any errors
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //add one reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          //error message (no thought with specified ID)
          return res.status(404).json({ message: 'There are no thoughts with this ID' });
        }
        res.json(dbThoughtData);
      })
      //catch any errors
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //remove one reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          //error message (no thought with specified ID)
          return res.status(404).json({ message: 'There are no thoughts with this ID' });
        }
        res.json(dbThoughtData);
      })
      //catch any errors
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
