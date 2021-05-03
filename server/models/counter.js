const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
    key: { type: String, require: true },
    value: { type: Number, require: true }
});

module.exports = Counter = mongoose.model('counter', CounterSchema);