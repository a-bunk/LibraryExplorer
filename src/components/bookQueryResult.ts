import {Books} from "./books";

export class BookQueryResult {
    size!: number;

    entries!: [Books];

    constructor() {
    }
}