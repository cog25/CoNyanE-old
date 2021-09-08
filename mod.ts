import {
  Client,
  GatewayIntents,
  Message,
} from "https://deno.land/x/harmony@v2.1.2/mod.ts";
import * as colors from "https://deno.land/std@0.106.0/fmt/colors.ts";

import "https://deno.land/x/dot_env@0.2.0/load.ts";

const client = new Client();

// Listen for event when client is ready (Identified through gateway / Resumed)
client.on("ready", () => {
  console.log("Ready!", colors.magenta(`${client.user?.tag}`));
});

// Listen for event whenever a Message is sent
client.on("messageCreate", (msg: Message): void => {
  if (msg.content === "!ping") {
    msg.channel.send(`Pong! WS Ping: ${client.gateway.ping}`);
  }
});

// Connect to gateway
client.connect("super secret token comes here", [
  GatewayIntents.DIRECT_MESSAGES,
  GatewayIntents.GUILDS,
  GatewayIntents.GUILD_MESSAGES,
]);
