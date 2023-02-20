import {createInterface} from "readline/promises";

export let inputAuthorName: string = '';
export let inputAuthorLastName: string = '';

export async function readFromConsole(consoleText: string, fillInString: string) {
    const cli = createInterface({
        input: process.stdin,
        output: process.stdout
    })
    const cText: string = await cli.question(consoleText);
    if (fillInString === "FULLNAME") {
        inputAuthorName = cText;
    } else {
        inputAuthorLastName = cText;
    }

    cli.close();
}