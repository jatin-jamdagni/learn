import { program } from "commander"
import { parseYAMLConfig, validateConfig } from "./config";


const main = async () => {
    program.option('--config <path>');
    program.parse()

    const options = program.opts();

    if (options && 'config' in options) {
        const validatedConfig = await validateConfig(await parseYAMLConfig(options.config));

        console.log("these are validated congigurations: ", validatedConfig)
        // return validatedConfig;
    }
}



main();