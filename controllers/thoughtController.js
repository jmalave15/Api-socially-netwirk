const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    getThought(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // get one thought by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => 
            !thought 
            ? res.status(404).json({ message: 'No thought found with this id!' }) : res.json(thought))

            .catch((err) => res.status(500).json(err));
    },
    // create thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                console.log(req.body.userId);
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) => 
            !user
            ? res.status(404).json({ message: 'No user found with this id!' }) : res.json('Thought created'))
            .catch((err) => res.status(500).json(err));
    },
    // update thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true },
            )
            .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought found with this id!' }) 
            : res.json(thought))
            .catch((err) => { 
                console.log(err);
                res.status(500).json(err)
        });
    },
    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                ? res.status(404).json({ message: 'No thought found with this id!' }) 
                : User.findOneAndUpdate(
                    { applications: req.params.applicationId },
                    { $pull: { applications: req.params.applicationId } },
                    { new: true }
                )
            )       
            .then((user) => 
            !user
            ? res.status(404).json({ message: 'No user found with this id!' }) 
            : res.json('Thought deleted'))
            .catch((err) => res.status(500).json(err));
    },
    // add reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true },
            )
            .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought found with this id!' })
            : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // remove reaction
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true },
            )
            .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought found with this id!' })
            : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
};