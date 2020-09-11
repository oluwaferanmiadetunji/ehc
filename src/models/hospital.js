const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const HospitalSchema = new Schema(
	{
		_id: mongoose.Types.ObjectId,
		name: {type: String, required: true},
		email: {type: String, required: true},
		type: {type: String},
		specialty: {type: String},
		location: {type: String},

	},
	{
		timestamps: true,
	}
);

module.exports = Model('Hospital', HospitalSchema);
