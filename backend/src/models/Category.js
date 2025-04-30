const mongoose = require('mongoose');
const Counter = require('./Counter');

const categorySchema = new mongoose.Schema({
    _id: Number,
    name: { type: String, required: true },
    icon: String
})

categorySchema.pre('save', async function (next){
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            'Category',
            { $inc: { sequence_value: 1 }},
            { new: true, upsert: true }
        );
        this._id = counter.sequence_value;
    }
    next();
})

module.exports = mongoose.model('Category', categorySchema);