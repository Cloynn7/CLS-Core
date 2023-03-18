const { Client, GatewayIntentBits, Options, Collection } = require('discord.js');

class Bot extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
      ],
      makeCache: Options.cacheWithLimits({
        ...Options.DefaultMakeCacheSettings,
        ReactionManager: 0,
      }),
      sweepers: {
        ...Options.DefaultSweeperSettings,
        messages: {
          interval: 3600,
          lifetime: 1800,
        },
      },
    });

    this.commands = new Collection();
    this.config = require('./handler/config');

    require('./handler')(this);
    require('dotenv').config();
  };
};

const client = new Bot();
client.login(process.env.token);