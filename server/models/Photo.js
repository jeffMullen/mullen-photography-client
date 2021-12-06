const { Schema, model } = require('mongoose');

const photoSchema = new Schema(
    {
        author: {
            type: String,
            required: true,
        },
        fileName: {
            type: String,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        }
    }
);

const Photo = model('Photo', photoSchema);

module.exports = Photo;