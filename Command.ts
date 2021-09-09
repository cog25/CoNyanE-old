import { Message } from "https://deno.land/x/harmony@v2.1.2/mod.ts";

export class Command {
    name!: string;
    alias!: string[];
    description!: string;
    handler!: (msg: Message) => (void|Promise<void>);
}

export class CommandWithPath extends Command{
    path!: string;
}