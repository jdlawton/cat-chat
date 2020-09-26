const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
} = require('../../controllers/user-controller');

//set up GET and POST routes for /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)


//set up GET one, PUT, and DELETE for /api/users/:id
router
    .route('/:id')
    .get(getUserById)




module.exports = router;