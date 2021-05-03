const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EmpSchema = new Schema({
	Id: { type: String, require: false },
	name: { type: String, require: true },
	jobTitle: { type: String, require: true },
	department: { type: String, require: true },
	location: { type: String, require: true },
	age: { type: Number, require: true },
	salary: { type: Number, require: true },
	joinDate: { type: String, default: Date.now }
});
EmpSchema.index({ '$**': 'text' });
module.exports = Emp = mongoose.model('employee', EmpSchema);