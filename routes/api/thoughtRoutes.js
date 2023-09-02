const router = require('express').Router();

const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, createReaction, deleteReaction } = require('../../controllers/thoughtController');

// /api/thoughts route
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId route
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// Define the route for POST reaction to a Thought
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thoughts/:thoughtId/reactions route
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;