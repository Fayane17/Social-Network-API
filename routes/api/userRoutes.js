const router = require('express').Router();

const {
    getUser,
    getUserById,
    createUser,
    updateUser,
    addFriend,
    deleteUser,
    deleteFriend
} = require('../../controllers/user-controller');


router
.route('/')
.get(getUser)
.post(createUser);

router.route('/:userId')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);


router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;