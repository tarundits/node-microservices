const mongoose = require('mongoose');
const { nanoid } = require("nanoid");
const moment = require('moment');

const productSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: () => nanoid(),
	},
  	name: { 
		type: String, 
		required: true 
	},
  	price: { 
		type: Number, 
		required: true 
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

module.exports = mongoose.model('Product', productSchema);
