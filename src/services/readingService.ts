import {createInterface} from "readline/promises";

export var inputAuthorName: string = '';
export var inputAuthorLastName: string = '';

export async function readFromConsole(consoleText: string, fillInString: string) {
    const cli = createInterface({
        input: process.stdin,
        output: process.stdout
    })
    var cText: string = await cli.question(consoleText);
    if (fillInString === "FULLNAME") {
        inputAuthorName = cText;
    } else {
        inputAuthorLastName = cText;
    }

    cli.close();
}