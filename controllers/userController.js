const { User, Thought } = require("../models");

module.exports = {

    //GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        }
        catch (err) {
            res.status(500).json(err);
        }

    },

    //GET a single user by _id and populate thought and friend data
    async getSingleUser(req, res) {
        try {
            const dbUserData = await User.findOne({ _id: req.params.userId }).populate("thoughts").populate("friends").select("-__v");

            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.json(dbUserData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    //POST a new user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    //POST to add a new friend to user's friend list
    async addFriend(req, res){
        try{
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: req.params.friendId} },
                { runValidators: true, new: true}
            )

            if(!dbUserData){
                res.status(404).json(err);
            }

            res.status(200).json(dbUserData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE a friend from user's friend list
    async deleteFriend(req, res){
        try{
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )

            if (!dbUserData){
                res.status(404).json( { message: 'no data found with that id'} )
            }

            res.status(200).json(dbUserData);
        } 
        catch (err) {
            res.status(500).json(err);
        }
    },


    //PUT to update a user by _id
    async updateUser(req, res) {
        try{
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $set: req.body },
                { runValidators: true, new: true}
            );

            if (!dbUserData){
                return res.status(404).json({ message: 'No student found with that ID' });
            }
            res.json(dbUserData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    
    //DELETE to remove a user by _id
    async deleteUser(req, res) {
        try{
            const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });
            if (!dbUserData){
                return res.status(404).json({ message: 'No student found with that ID' });
            }
            return res.json(dbUserData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }


};