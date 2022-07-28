import Service from '../client/Service';
import { Client } from 'discord.js';
import User from '../models/User';

export default class UserManager extends Service {
	async create(id: string, guild: string, defaultXP: number = 1) {
		const user = new User({
			discordID: id,
			guildID: guild,
			xp: {
				level: 0,
				total: defaultXP				
			}
		});

		await user.save();

		return user;
	}

	async get(id: string, guild: string) {
		return await User.findOne({
			discordID: id,
			guildID: guild
		});
	}

	async delete(id: string, guild: string) {
		return await User.findOneAndDelete({
			discordID: id,
			guildID: guild
		});
	}
}
