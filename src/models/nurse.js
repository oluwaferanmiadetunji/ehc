const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const NurseSchema = new Schema(
	{
		_id: mongoose.Types.ObjectId,
		name: {type: String, required: true},
		imageURL: {type: String, required: true},
		type: {type: String},
		phone: {type: String},
		hours: {type: String},
	},
	{
		timestamps: true,
	}
);

module.exports = Model('Nurse', NurseSchema);
