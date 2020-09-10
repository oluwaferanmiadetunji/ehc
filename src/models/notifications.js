const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const NotificationsSchema = new Schema(
	{
		_id: mongoose.Types.ObjectId,
		userId: {type: String},
		sender: {type: String},
		message: {type: String},
		readStatus: {type: Boolean},
	},
	{
		timestamps: true,
	}
);

module.exports = Model('Notifications', NotificationsSchema);
