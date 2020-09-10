const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const FeedbacksSchema = new Schema(
	{
		_id: mongoose.Types.ObjectId,
		sender: {type: String},
		message: {type: String},
		readStatus: {type: Boolean},
	},
	{
		timestamps: true,
	}
);

module.exports = Model('Feedbacks', FeedbacksSchema);
