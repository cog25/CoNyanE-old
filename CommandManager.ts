import { Command } from "./Command.ts";

const isCommandFile = (e:Deno.DirEntry) => e.isFile && e.name.endsWith(".ts") && !e.name.startsWith('_');
// {
//   if (!e.isFile) return;
//   if (!e.name.endsWith(".ts")) return;
//   if (e.name.startsWith("_")) return;
// }

const cmdMap = new Map<string, Command>();
const aliasMap = new Map<string, string>();

export default {
  get(name: string) {
    let cmd = cmdMap.get(name);
    if (cmd === undefined) {
      const key = aliasMap.get(name);
      if (key) cmd = cmdMap.get(key);
    }
    return cmd;
  },
  async load() {
    const tmp = Date.now();

    Deno.readDir("./command");
    for await (const e of Deno.readDir("./command")) {
      if(!isCommandFile(e)) return;

      const cmd = (await import(`./command/${e.name}#${tmp}`)).default as Command;

      cmdMap.set(cmd.name,cmd);

      cmd.alias.forEach(e=> aliasMap.set(e,cmd.name));
    }
  },
  async reload(filename:string){
    
  }
};
