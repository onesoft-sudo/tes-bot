import { registerCommands, registerEvents } from './utils/registry';
import DiscordClient from './client/client';
import { IntentsBitField, Partials } from 'discord.js';
import { config } from 'dotenv';

config();

const client = new DiscordClient({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.DirectMessages,
		IntentsBitField.Flags.MessageContent,
		IntentsBitField.Flags.GuildMembers,
	],
	partials: [
		Partials.Channel,
		Partials.Message,
		Partials.Reaction
	]
});

(async () => {
  // client.prefix = config.prefix || client.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.TOKEN);
})();

