import { Command } from "../Command.ts"

export default {
    name: "link",
    alias: ['링크','주소','초대','invite'],
    description: "",
    handler: (msg)=>{
        msg.reply(`https://discord.com/oauth2/authorize?client_id=884991982299148358&scope=bot&permissions=8589410137`);
    }
} as Command;