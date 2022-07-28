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
    	await message.reply("Your level is: " + data.xp!.level! +  ", you need more " + (client.levelManager.getRequiredXPs(data.xp!.level! + 1) - data.xp!.total!) + "XPs to level up!");
    }
  }
}
