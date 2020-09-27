const {Thought, User} = require('../models');

const thoughtController = {

    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //get a single thought by id
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with this id.'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //create a new thought and push it to the associated user's thoughts array
    addThought({body}, res) {
        //create the new thought
        Thought.create(body)
            //destruct the _id as we only need that part from the query to add to the user's thoughts array
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {_id: body.userId}, //user id is provided by req.body instead of params per the example challenge data
                    {$push: {thoughts: _id}}, //add the destructed id to the user's thoughts array
                    {new: true, runValidators: true} //validate the data and return the updated user data
                );
            })
            .then (dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'No user found with this id.'});
                    return;
                }
                res.json(dbUserData); //respond with the updated user data showing the new thought added to the thoughts array.
            })
            .catch(err => res.status(400).json(err));
    },

    //update a thought by its id
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id:params.id}, body, {new:true, runValidators:true})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with that id.'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch (err => res.status(400).json(err));
    },

    //delete a thought by its id
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id:params.id})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with that id.'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    
    //add a reaction to a thought's reactions array
    addReaction ({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with that id.'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    //delete a reaction from a thought's reactions array
    deleteReaction ({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: body.reactionId}}},
            {new: true}
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};


module.exports = thoughtController;