import {
  Client,
  GatewayIntents,
  Message,
} from "https://deno.land/x/harmony@v2.1.2/mod.ts";
import { config } from "./config.ts";
import { colors } from "./util.ts";
import CommandManager from "./CommandManager.ts";

export const client = new Client();

// Listen for event when client is ready (Identified through gateway / Resumed)
client.on("ready", () => {
  console.log("Ready!", colors.magenta(`${client.user?.tag}`));
});

// Listen for event whenever a Message is sent
client.on("messageCreate", (msg: Message): void => {
  if(!msg.content.startsWith(config.prefix)) return;

  const name = msg.content.split(' ')[0].substr(1);
  const cmd = CommandManager.get(name);
  
  if(cmd===undefined){
    //TODO: print command recommendation
  }else{
      try {
        cmd.handler(msg);
      } catch (e:unknown) {
        if(!config.isProduction){
          msg.reply(`Error!\n${(e as Error).stack}`);
        }
      }
  }
});

await CommandManager.loadall().then(()=>{
  console.log(colors.green('Command All Loaded.'));
});

// Connect to gateway
client.connect(config.token, [
  GatewayIntents.DIRECT_MESSAGES,
  GatewayIntents.GUILDS,
  GatewayIntents.GUILD_MESSAGES,
]);

import("./Watcher.ts");