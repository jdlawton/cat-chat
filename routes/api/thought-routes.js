const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

//set up POST route for /api/thoughts/
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought)


//set up routes for /api/thoughts/:thoughtId
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

module.exports = router;