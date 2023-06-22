const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getUser(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // get one user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')         
            .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user found with this id!' })
            : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // create user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // delete user by id and remove associated thoughts
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) => 
                !user
                ? res.status(404).json({ message: 'No user found with this id!' })
                : Thought.deleteMany({ _id: { $in: user.Thoughts } })
            )
            .then(() => res.json('User deleted and associated thoughts deleted'))
            .catch((err) => res.status(500).json(err));
    },
};