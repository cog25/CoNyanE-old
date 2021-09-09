import { Command, CommandWithPath } from "./Command.ts";

const isCommandFile = (e:Deno.DirEntry) => e.isFile && e.name.endsWith(".ts") && !e.name.startsWith('_');

let cmdMap:Map<string, CommandWithPath> = new Map();
let aliasMap:Map<string, string> = new Map();

export default {
  get(name: string) {
    let cmd = cmdMap.get(name);
    if (cmd === undefined) {
      const key = aliasMap.get(name);
      if (key) cmd = cmdMap.get(key);
    }
    return cmd;
  },
  async loadall() {
    cmdMap = new Map();
    aliasMap = new Map();

    const tmp = Date.now();
    
    for await (const e of Deno.readDir("./command")) {
      if(!isCommandFile(e)) return;

      try {
        const path = await Deno.realPath(`./command/${e.name}#${tmp}`)
        const cmd = (await import(path)).default as Command;
        cmdMap.set(cmd.name, { ...cmd , path: path } as CommandWithPath);

        cmd.alias.forEach(e=> aliasMap.set(e,cmd.name));
      } catch (e:unknown) {
        console.log((e as Error).stack);
      }
    }
  }
};
