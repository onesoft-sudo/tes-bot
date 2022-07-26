import { Client } from 'discord.js';

export default abstract class Service {
	constructor(protected client: Client) {
				
	}

	public async boot(): Promise<any> {}
}
