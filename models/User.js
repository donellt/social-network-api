const { Schema, model } = require('mongoose');


//username, email, thoughts, friends will be data attached to the User
const userSchema = new Schema({
    username: {
        //makes it so the username is required
        required: 'You must enter a username...',
        //removes whitespace from input
        trim: true,
        //indicates that each username must be unique
        unique: true,
        //indicates the username is accepted in a String format
        type: String
    },

    email: {
        //makes it so email is required
        required: true,
        //uses the email Regex to make sure email's are formatted correctly
        match: [/.+@.+\..+/, 'Email must be formatted correctly...'],
        //indicates emails must be unique
        unique: true,
        //indicates the emails is accepted in a String format
        type: String
    },

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
    ],

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
    }
);


userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
  
  const User = model('User', userSchema);
  
  //export the User model
  module.exports = User;