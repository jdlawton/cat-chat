const {Schema, model, Types} = require ('mongoose');
const moment = require('moment');

//Reaction schema exists in Thought.js because the reactions are only going to exists as subdocuments of a Thought document
const ReactionSchema = new Schema (
    {
        //reactionId is a separate ObjectId from _id, used to make distinguishing the Thought id and the Reaction id easier.
        reactionId: { 
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: "Please share your reaction.",
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: "Please enter your name."
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') //formatting the date using Moment
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);


const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: "Please share your thoughts.",
            minlength: 1, //minlength and maxlength are built-in Mongoose validators for Strings
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') //formatting the date using Moment
        },
        username: {
            type: String,
            required: "Please provide your name."
        },
        reactions: [ReactionSchema] //The reactions array in Thoughts will contain subdocuments using the ReactionSchema that is defined above
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//virtual reactionCount supplies the number of reactions to a thought on query
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;