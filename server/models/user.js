const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	Id: { type: String, require: true },
	email: {
		type: String, require: true,
		trim: true, unique: true,
		match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
	},
	password: { type: String, require: false },
	name: { type: String, require: true },
	joinDate: { type: String, default: Date.now },
	online: { type: Boolean, require: false, default: false },
	resetPasswordToken: { type: String },
	resetPasswordExpires: { type: Number }
});

module.exports = User = mongoose.model('user', UserSchema);