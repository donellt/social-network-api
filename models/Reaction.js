const { Schema, Types } = require('mongoose');
const moment = require('moment');

//constructor for Reactions
const reactionSchema = new Schema(
    {
        reactionId: {
            default: () => new Types.ObjectId(),
            type: Schema.Types.ObjectId
        },

        reactionBody: {
            //indicates the reaction is required
            required: true,
            //indicates the reaction is in String format
            type: String
        },

        username: {
            //indicates username is required
            required: true,
            //indicates the username is in String format
            type: String
        },

        //gets the time at which reaction was created
        createTime: {
            default: Date.now,
            get: (createdAtTime) => moment(createdAtTime).format('MMM Do, YYYY [at] hh:mm a'),
            type: Date
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

//exports reaction Schema to be used outside of file
module.exports = reactionSchema;