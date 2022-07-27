import mongoose from 'mongoose';
import { Client } from 'discord.js';

export default class Database {
	constructor(protected client: Client) {
		
	}

	async connect() {
		await mongoose.connect(process.env.MONGO_CLUSTER!);
	}
}
