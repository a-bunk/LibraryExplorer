import {AuthorQueryResultDetails} from "./authorQueryResultDetails";

export class AuthorQueryResult {
    numFound!: number;
    docs!: [AuthorQueryResultDetails];

    constructor() {
    }

}