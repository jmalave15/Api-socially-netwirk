const { Schema, Types } = require('mongoose');

const friendSchema = new Schema(
    {
        friendId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        friendBody: {
            type: String,
            minLength: 1,
        },
    },
    {
        toJSON: {
            virtuals: false,
        },
        id: true,
    }
);

module.exports = friendSchema;