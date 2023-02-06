import {AuthorQueryResultDetails} from "./authorQueryResultDetails";

export class AuthorQueryResult {
    numFound!: number;
    start!: number;
    numFoundExact!: boolean
    docs!: [AuthorQueryResultDetails];

    constructor() {
    }

}