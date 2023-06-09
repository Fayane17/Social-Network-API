const { User, Thought } = require("../models");

module.exports = {

      User.find({})
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
          .populate("thoughts")
          .populate("friends")
          .select("-__v")
          .then((userData) =>
            !userData
              ? res.status(404).json({ message: "No User found with this Id" })
              : res.json(userData)
          )
          .catch((err) => res.status(500).json(err));
      },

      createUser(req, res) {
        User.create(req.body)
          .then((userData) => res.json(userData))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },

      updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((userData) =>
            !userData
              ? res.status(404).json({ message: "No User found with this Id" })
              : res.json(userData)
          )
          .catch((err) => res.status(500).json(err));
      },

      addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((userData) =>
            !userData
              ? res.status(404).json({ message: "No User found with this Id" })
              : res.json(userData)
          )
          .catch((err) => res.status(500).json(err));
      },

      deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((userData) =>
            !userData
              ? res.status(404).json({ message: "No User found with this Id" })
          )
          .then(() => res.json({ message: "User was deleted" }))
          .catch((err) => res.status(500).json(err));
      },

      deleteFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { new: true }
        )
          .then(
            (userData) =>
              !userData
                ? res.status(404).json({ message: "No User found with this Id" })
                : res.json(userData)
          )
          .catch((err) => res.status(500).json(err));
      },
    