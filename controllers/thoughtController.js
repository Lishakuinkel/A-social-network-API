const { User, Thought } = require("../models");

module.exports = {

    //GET all thoughts
    async getThoughts(req, res){
        try {
            const thoughtData = await Thought.find();
            res.json(thoughtData);
        } 
        catch (err) {
            res.status(500).json(err);
        }
    },

    //GET thought by _id
    async getSingleThought(req, res){
        try {
            const thoughtData = await Thought.findOne( {_id: req.params.thoughId} ).select("-__v");
            
            if (!thoughtData){
                return res.status(404).json({message:'no data found with that id'});
            }
            res.json(thoughtData);
        } 
        catch (err) {
            res.status(500).json(err);
        }
    },

    //POST to create a new thought (push the created thought's _id to the associated user's thoughts array field)
    async createThought(req, res) {
        try {
            const thoughtData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: _id } },
                { new: true });
            res.json(thoughtData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    //PUT to update a thought by _id
    async updateThought(req, res){
        try{
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, New: true});
            
            res.json(thoughtData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE a thought by _id
    async deleteThought(req, res){
        try{
            const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            
            if(!thoughtData){
                res.status(404).json({message: 'no thought data found with that id'});
            }

            res.json(thoughtData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    //POST to create a reaction stored in a single thought's reactions array field
    async createReaction(req, res){
        try{
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true}
            );

            if(!thoughtData){
                res.status(404).json({ message: 'No thought data found with this id'});
            }
            res.status(200).json(thoughtData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE to pull and remove a reaction by the reaction's reactionId value
    async deleteReaction(req, res){
        try{
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId : req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            
            if(!thoughtData){
                res.status(404).json({ message: 'No thought data found with this id'});
            }
            res.status(200).json(thoughtData);

        }
        catch (err) {
            res.status(500).json(err);
        }
    }

};