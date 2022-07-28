import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
	discordID: {
		type: String,
		required: true,
		unique: true
	},
	guildID: {
		type: String,
		required: true,
	},
	xp: {
		total: Number,
		level: Number
	}
});

export default mongoose.model("User", userSchema);
