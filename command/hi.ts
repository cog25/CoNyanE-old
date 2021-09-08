import { Command } from "../Command.ts"

export default {
    name: "hi",
    alias: ['안녕','하이','방가'],
    handler: (msg)=>{
        msg.addReaction('‼️');
        msg.channel.send(`Hello✋, ${msg.author.mention}`);
    }
} as Command;