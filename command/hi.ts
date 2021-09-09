import { Command } from "../Command.ts"
import { sleep } from "../util.ts";

export default {
    name: "hi",
    alias: ['안녕','하이','방가'],
    description:"",
    handler:async (msg)=>{
        msg.addReaction('‼️');
        await sleep(1000);
        msg.channel.send(`Hello✋, ${msg.author.mention}`);

    }
} as Command;