const { Schema, model } = require('mongoose');
const User = require('./User');

// creating a new instance of Reaction Schema to define each document
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


// creating a new instance of Thought Schema to define each document
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

//create a new instance of Thought model using thoughtSchema
const Thought = model('Thought', thoughtSchema);


//export Thought model
module.exports = Thought;