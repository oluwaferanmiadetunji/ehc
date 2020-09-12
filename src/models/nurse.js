const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const NurseSchema = new Schema(
	{
		_id: mongoose.Types.ObjectId,
		name: {type: String, required: true},
		email: {type: String},
		imageURL: {type: String},
		type: {type: String},
		phone: {type: String},
		hours: {type: String},
		location: {type: String},
		password: {type: String},
	},
	{
		timestamps: true,
	}
);

module.exports = Model('Nurse', NurseSchema);
