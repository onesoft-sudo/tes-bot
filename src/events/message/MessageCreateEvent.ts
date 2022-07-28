import BaseEvent from '../../utils/structures/BaseEvent';
import { Message, ChannelType } from 'discord.js';
import DiscordClient from '../../client/client';

export default class MessageCreateEvent extends BaseEvent {
	 constructor() {
	 	super('messageCreate');
	 }

	 async run(client: DiscordClient, message: Message) {
		if (message.author.bot || !message.guild || message.channel.type === ChannelType.DM) 
			return;

		console.log(client.config[message.guild!.id], message.content);
		
		if (message.content.startsWith(client.config[message.guild!.id].prefix)) {
			  const [cmdName, ...cmdArgs] = message.content
			    .slice(client.prefix.length)
			    .trim()
			    .split(/ +/);
			
			  const command = client.commands.get(cmdName);

			  if (command) {
			    command.run(client, message, cmdArgs);
			    return;
			  }
		}

		const user = await client.userManager.get(message.author.id, message.guild!.id);

		if (!user) {
			await client.userManager.create(message.author.id, message.guild!.id);
		}

		const xpData = await client.levelManager.increaseLevel(message.member!);
		
		if (xpData) {
			await message.channel.send({
				content: `GG ${message.author.toString()}, you just reached level ${xpData}!`
			});
		}	
	 }
}
