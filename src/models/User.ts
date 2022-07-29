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
		total: {
			type: Number,
			required: true
		},
		level: {
			type: Number,
			required: true
		}
	}
});

export default mongoose.model("User", userSchema);
