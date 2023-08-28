const router = require('express').Router();

const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, createReaction, deleteReaction } = require('../../controllers/thoughtController');

// /api/thoughts route
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId route
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions route
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;