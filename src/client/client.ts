import { Client, ClientOptions, Collection } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import BaseCommand from '../utils/structures/BaseCommand';
import LevelManager from '../services/LevelManager';
import Database from './Database';
import config from '../../config/config.json';

type ConfigType = {
	[key: string]: any;
};

export default class DiscordClient extends Client {
  private _commands = new Collection<string, BaseCommand>();
  private _events = new Collection<string, BaseEvent>();
  private _prefix: string = '!';
  levelManager: LevelManager;
  db: Database;
  config: ConfigType = {};

  constructor(options: ClientOptions) {
    super(options);
    this.levelManager = new LevelManager(this);
    this.db = new Database(this);
    this.db.connect()
		.then(() => console.log('Database connected'))
    	.catch(console.error);

    this.config = config as ConfigType;
  }

  get commands(): Collection<string, BaseCommand> { 
  	return this._commands;
  }

  get events(): Collection<string, BaseEvent> { 
  	return this._events;
  }
  
  get prefix(): string { 
  	return this._prefix; 
  }

  set prefix(prefix: string) { 
  	this._prefix = prefix; 
  }
}
