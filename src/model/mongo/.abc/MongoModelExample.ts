import mongoose from 'mongoose';
const { Schema } = mongoose;

const UnformedDataSchema = new Schema({
	_id: { type: String, required: true, unique: true },
	data: {
		type: Object,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const UnformedData = mongoose.model('UnformedData', UnformedDataSchema);

export { UnformedData };
