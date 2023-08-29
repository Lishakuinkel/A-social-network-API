const { Schema, model } = require('mongoose');
const User = require('./User');

//Reaction Schema
const reactionSchema = new Schema({
    reactionID: { type: Schema.Types.ObjectID, default: () => new Types.ObjectID() },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a") },
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);


//Thought Schema
const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now, get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a") },
    username: { type: String, required: true },
    reactions: [reactionSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

//get total count of friends
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

//create User model using UserSchema
const Thought = model('Thought', thoughtSchema);

//export Thought model
module.exports = Thought;