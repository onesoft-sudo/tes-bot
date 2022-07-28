import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class RankCommand extends BaseCommand {
  constructor() {
    super('rank', 'leveling', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const data = await client.userManager.get(message.author.id, message.guild!.id);

    if (data) {
    	await message.reply({
    		embeds: [
    			{
    				color: 0x007bff,
    				author: {
    					name: message.author.tag,
    					icon_url: message.author.displayAvatarURL()
    				},
    				fields: [
    					{
    						name: 'Level',
    						value: data.xp!.level! + ''
    					},
    					{
    						name: 'XPs',
    						value: data.xp!.total! + ''
    					},
    					{
    						name: 'Required XPs to Level Up',
    						value: (client.levelManager.getRequiredXPs(data.xp!.level!) - data.xp!.total!) + ''
    					}
    				]
    			}
    		]
    	});
    }
  }
}
