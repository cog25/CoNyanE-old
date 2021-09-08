import { Message } from "https://deno.land/x/harmony@v2.1.2/mod.ts";

export default {
    name: "hi",
    alias: [],
    handler: (msg:Message)=>{
        msg.channel.send(`Hello, ${msg.author.mention}`);
    }
}