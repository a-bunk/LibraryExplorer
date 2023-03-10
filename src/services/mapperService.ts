import {BookQueryResult} from "../components/bookQueryResult";
import {Books} from "../components/books";
import {Author} from "../components/author";
import {AuthorQueryResult} from "../components/authorQueryResult";
import {formatStringToDate} from "../util/util";

export function setAuthor(queryResults: AuthorQueryResult, i: number, authorName : string) {
    const author = Author.getInstance();

    author.authorName = authorName;
    author.topWork = queryResults.docs[i].top_work;
    author.keyWords = queryResults.docs[i].top_subjects;

    if (queryResults.docs[i].birth_date !== undefined) {
        const tempDateString: string = queryResults.docs[i].birth_date;
        if (queryResults.docs[i].birth_date.length === 4) {
            author.birthyear = !isNaN(parseInt(tempDateString)) ? parseInt(tempDateString) : 9999;
        } else {
            let tempBirthdate = formatStringToDate(tempDateString);
            if (tempBirthdate !== undefined) {
                author.birthdate = tempBirthdate; // Format: "birth_date": "22.02.1925"
            }
        }
    }
}

export function setBooksForAuthor(queryResults: BookQueryResult) {
    const books: [Books] = queryResults.entries as [Books];
    const author = Author.getInstance();
    author.anzahlEintraege = books.length;
    let tempBookTitle: string[] = [];

    for (let i = 0; i < books.length; i++) {
        console.log(books[i].title);
        tempBookTitle.push(books[i].title);
    }
    author.bookTitle = tempBookTitle;
}