import "https://deno.land/x/dotenv@v2.0.0/load.ts";
import { colors } from "./util.ts";
let isEnvExist:boolean = true;

function getEnv(key:string):string{
    const value = Deno.env.get(key);
    if(value===undefined){
        console.log(colors.red(`Environment Variable '${colors.bold(key)}' Not found.`))
        isEnvExist = false;
        return '';
    }
    return value;
}

export const config = {
    token: getEnv("TOKEN"),
    prefix: getEnv("PREFIX"),
    isProduction: ["production","prod"].includes(Deno.env.get("MODE")??''),
}

if(!isEnvExist){
    console.log(colors.yellow(`You can also set Environment Variable on '${colors.bold('.dotenv')}'`));
    Deno.exit(-1);
}
