import {createInterface} from "readline/promises";

export const readFromConsole = async (consoleText: string) : Promise<string> => {
    const cli = createInterface({
        input: process.stdin,
        output: process.stdout
    })
    const inputText = await cli.question(consoleText);
    cli.close();
    return  inputText;
}