import {
  Client,
  GatewayIntents,
  Message,
} from "https://deno.land/x/harmony@v2.1.2/mod.ts";
import { config } from "./config.ts";
import { colors } from "./util.ts";

export const client = new Client();

// Listen for event when client is ready (Identified through gateway / Resumed)
client.on("ready", () => {
  console.log("Ready!", colors.magenta(`${client.user?.tag}`));
});

// Listen for event whenever a Message is sent
client.on("messageCreate", (msg: Message): void => {

});

// Connect to gateway
client.connect(config.token, [
  GatewayIntents.DIRECT_MESSAGES,
  GatewayIntents.GUILDS,
  GatewayIntents.GUILD_MESSAGES,
]);
