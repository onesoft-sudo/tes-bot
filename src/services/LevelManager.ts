import Service from '../client/Service';
import { GuildMember, Collection } from 'discord.js';
import User from '../models/User';

export default class LevelManager extends Service {
	users = new Collection <string, { time: number, member?: GuildMember }> ();
	limit = 8000;
	
	public async boot() {
		console.log('Levelmanager booting...');
	}

	public sentMessageInLimit(member: GuildMember) {
		if (!this.users.has(member.guild.id + '-' + member.id)) {
			this.users.set(member.guild.id + '-' + member.id, {
				time: Date.now(),
			});

			return false;
		}

		const user = {...this.users.get(member.guild.id + '-' + member.id)!};

		console.log(user.time);

		this.users.set(member.guild.id + '-' + member.id, {
			time: Date.now(),
		});
		
		console.log(user.time, Date.now());

		if (Date.now() <= (user.time + this.limit)) {
			return true;
		}

		return false;
	}
	
	public getRequiredXPs(level: number) {
		if (level === 0) {
			return 50;
		}

		if (level === 1) {
			return 200;
		}
		
		return (level ** 2) * 100;
	}

	public getTotalXPs(level: number, xps?: number) {
		if (level === 0) {
			return 50;
		}

		if (level === 1) {
			return 100;
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
				"xp.total": 23
			}
		});

		if (!user)
			return;

		const requiredXPs = this.getRequiredXPs(user.xp!.level!);
		console.log('Needed', requiredXPs);
		console.log('Current', user.xp!.total! + 23);

		if ((user.xp!.total! + 23) >= requiredXPs) {
			console.log(user.xp!);

			await User.findOneAndUpdate({
				discordID: member.id,
				guildID: member.guild.id
			}, {
				$inc: {
					"xp.level": 1,
				},
				"xp.total": user.xp!.total! + 23 - this.getRequiredXPs(user.xp!.level!)
			});
			
			console.log(user.xp!);

			return user.xp!.level! + 1;
		}

		return false;
	}

	public levelReward() {
			
	}
}
