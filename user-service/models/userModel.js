const mongoose = require('mongoose');
const { nanoid } = require("nanoid");
const moment = require('moment');

const userSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: () => nanoid(),
	},
	first_name: { 
		type: String, 
		required: true 

	},
	last_name: { 
		type: String, 
		required: true 

	},
  	email: { 
		type: String, 
		required: true, 
		unique: true 
	},
	age: {
		type: Number,
	},
	password: {
		type: String,
	},
	createdAt: {
		type: Number, 
		default: () => moment().unix(),
	},
	updatedAt: {
		type: Number, 
		default: () => moment().unix(),
	},
});

module.exports = mongoose.model('User', userSchema);
