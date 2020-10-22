const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

//constructor for new Thought
const thoughtSchema = new Schema(
    {
        thoughtInfo: {
            //indicates a thought is required
            required: 'A thought is required...',
            //indicates thoughts are formatted as Strings
            type: String
        },

        //grabs current time and assigns it to thought
        createTime: {
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a'),
            type: Date
        },

        username: {
            //indicates username is required
            required: true,
            //indicates username is a String
            type: String
        },

        //calls the reactionSchema
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  
  const Thought = model('Thought', thoughtSchema);
  
  //exports Thought model to be used outside of file
  module.exports = Thought;
  