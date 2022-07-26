import mongoose from 'mongoose';

export const userSchema = mongoose.Schema({
	discordID: {
		type: String,
		required: true,
		unique: true
	},
	xp: {
		total: number;
		level: number;
	}
});

export default mongoose.model("User", userSchema);
