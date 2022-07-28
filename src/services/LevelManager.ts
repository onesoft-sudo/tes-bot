import Service from '../client/Service';
import { GuildMember } from 'discord.js';
import User from '../models/User';

export default class LevelManager extends Service {
	public async boot() {
		console.log('Levelmanager booting...');
	}

	public getRequiredXPs(level: number) {
		if (level === 0) {
			return 50;
		}
		
		return (level ** 2) * 100;
	}

	public getTotalXPs(level: number, xps?: number) {
		if (level === 0) {
			return 50;
		}

		let xp = 0;

		for (let i = level; i >= 0; i--) {
			xp += this.getRequiredXPs(i);
		}

		return xp + (xps ?? 0);
	}
	
	public async increaseLevel(member: GuildMember) {
		const user = await User.findOneAndUpdate({
			discordID: member.id,
			guildID: member.guild.id
		}, {
			$inc: {
				"xp.total": 25
			}
		});

		if (!user)
			return;

		const requiredXPs = this.getRequiredXPs(user.xp!.level!);
		console.log('Needed', requiredXPs);
		console.log('Current', user.xp!.total! + 25);

		if ((user.xp!.total! + 25) >= requiredXPs) {
			console.log(user.xp!);

			await User.findOneAndUpdate({
				discordID: member.id,
				guildID: member.guild.id
			}, {
				$inc: {
					"xp.level": 1,
				},
				"xp.total": user.xp!.total! + 25 - this.getRequiredXPs(user.xp!.level!)
			});
			
			console.log(user.xp!);

			return user.xp!.level! + 1;
		}

		return false;
	}

	public levelReward() {
			
	}
}
