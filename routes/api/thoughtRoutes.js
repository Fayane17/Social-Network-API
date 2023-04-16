const router = require('express').Router();

const {
    getThought,
    getThoughtById,
    addNewThought,
    updateThought,
    addReaction,
    deleteThought,
    deleteReaction
} = require('../../controllers/thought-controller');


router
.route('/')
.get(getThought)
.post(addNewThought);

router.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions')
.post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);


module.exports = router;