const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

//set up GET and POST routes for /api/thoughts/
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought)


//set up GET, PUT, and DELETE routes for /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

//set up POST and DELETE routes for /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction)

module.exports = router;