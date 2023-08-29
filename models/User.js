const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String, required: true, unique: true, match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ]
  },
  thoughts: [{ type: Schema.Types.ObjectID, ref: 'Thought' }],
  friends: [{ type: Schema.Types.ObjectID, ref: 'User' }]
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

//get length of User's 'friends' array field 
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
})

//create the User model using userSchema
const User = model('User', userSchema);

//export the User model
module.exports = User;