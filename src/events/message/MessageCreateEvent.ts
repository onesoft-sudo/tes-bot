import BaseEvent from '../../utils/structures/BaseEvent';
import { Message } from 'discord.js';
import DiscordClient from '../../client/client';

export default class MessageCreateEvent extends BaseEvent {
	 constructor() {
	 	super('messageCreate');
	 }

	 async run(client: DiscordClient, message: Message) {
		if (message.author.bot) 
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

		client.levelManager.increaseLevel(message.member!);	
	 }
}
