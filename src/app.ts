import {concatQueryString} from "./util/util";
import {AuthorQueryResult} from "./components/authorQueryResult";
import {Author} from "./components/author";
import {BookQueryResult} from "./components/bookQueryResult";
import {readFromConsole} from "./services/readingService";
import {setAuthor, setBooksForAuthor} from "./services/mapperService";
import {queryOpenLibrary} from "./services/fetchFromLibrary";

const query : string = 'http://openlibrary.org/search/authors.json?q={1}';
const queryDetailsAuthor : string  = 'http://openlibrary.org/authors/{1}/works.json';
let keyDetails : string;


enum CounterResults {
    NORESULT,
    ONERESULT,
    MORERESULTS

}


let counter : number;

/**
 * Sucht den Key für den eigegebenen Namen
 * @param authorQueryResult
 * @param inputName
 */
async function checkNameAndGetKey(authorQueryResult :AuthorQueryResult, inputName: string) {
        for (let i = 0; i < authorQueryResult.docs.length; i++) {
            const nameTest = authorQueryResult.docs[i].name;
            console.log(authorQueryResult.docs[i].name);
            if (nameTest === inputName) {
                keyDetails = authorQueryResult.docs[i].key;
                setAuthor(authorQueryResult, i, nameTest);
                console.log(keyDetails);
                return;
            }
        }
}

async function findAuthorName() {
    // Pipeline
    let inputAuthorLastName;
    while (keyDetails === undefined) {
        inputAuthorLastName = await readFromConsole("Bitte gib den Nachnamen des gesuchten Autors ein: ");
        const authorQueryResult = await queryOpenLibrary(concatQueryString(query, inputAuthorLastName), new AuthorQueryResult());

        if (authorQueryResult instanceof AuthorQueryResult) {
            counter = authorQueryResult.numFound as number;
            console.log("Counter vor dem Switch" + counter);
            switch (counter) {
                case undefined : {
                    console.log('Undefined!!!!!!')
                    break;
                }
                case CounterResults.NORESULT: {
                    console.log("Es wurden keine Datensätze gefunden! Wir versuchen es noch einmal!");
                    break;
                }
                case CounterResults.ONERESULT: {
                    keyDetails = authorQueryResult.docs[0].key
                    setAuthor(authorQueryResult, 0, inputAuthorLastName);
                    break;
                }
                default : {
                    console.log("Es wurden mehrere Datensätze gefunden!");
                    inputAuthorLastName = await readFromConsole("Bitte geben Sie den Namen detaillierter ein: ");
                    // Liste durchgehen und mit ID abgleichen
                    await checkNameAndGetKey(authorQueryResult, inputAuthorLastName);
                    if (keyDetails === undefined) {
                        console.log("Der vollständige Name wurde nicht gefunden. Wir beginnen noch einmal von Beginn an!");
                    }
                    break;
                }
            }
        }

    }
}



async function fuehreAbfragenAus(){
    try {
        await findAuthorName();
        const detailsAuthor  = await queryOpenLibrary(concatQueryString(queryDetailsAuthor,keyDetails), new BookQueryResult());
        if (detailsAuthor instanceof BookQueryResult) {
            setBooksForAuthor(detailsAuthor)
        }
        const author = Author.getInstance();
        author.printAuthor();
    } catch (e) {
        console.error("Fail", e)
    }
}


fuehreAbfragenAus();