const { Schema, model } = require('mongoose');

const photoSchema = new Schema(
    {
        photographer: {
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
        },
        category: {
            type: String,
        }
    }
);

const Photo = model('Photo', photoSchema);
const MullenPhoto = model('MullenPhoto', photoSchema)

module.exports = {
    Photo,
    MullenPhoto
};