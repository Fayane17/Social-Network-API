const { Thought, User } = require('../models');

module.exports = {
    getThought(req, res) {
        ThoughtData.find({})
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
},

    getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: "No thought found with this Id" });
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
},

addNewThought(req, res) {
    Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then((thoughtData) =>
            !thoughtData
                ? res.status(404).json({ message: "No User found with this Id" })
                : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err));
},

updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, New: true }
    )
        .then((user) =>
            !user
                ? res.status(404).json({ message: "No thought found with this Id" })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
},

addReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
    )
        .then((thoughtData) =>
            !thoughtData
                ? res.status(404).json({ message: "No thought found with Id" })
                : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err));
},

deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: "No thought found with this Id" })
                : User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'Thought was deleted, but user not found' })
                : res.json({ message: 'Thought deleted successfully' })
        )
        .catch((err) => res.status(500).json(err));
},

deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
    )
        .then((thoughtData) =>
            !thoughtData
                ? res.status(404).json({ message: "No thought found with this Id" })
                : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err));
};

