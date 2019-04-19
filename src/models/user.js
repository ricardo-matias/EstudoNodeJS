const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const schema = new Schema({
    // o _id é criado automaticamente
    /**
     * _id: {type: String, required: true},
        seq: { type: Number, default: 0 }
     */

    name: {
        type: String,
        required: true,
        trim: true
    },

    age: {
        type: Number,
        required: true
    },

    active: {
        type: Boolean,
        required: true,
        default: true
    },

    phones: [{
        type: String,
        required: false
    }]
});

module.exports = mongoose.model('User', schema);