import {concatQueryString} from "./util/util";
import {AuthorQueryResult} from "./components/authorQueryResult";
import {Author} from "./components/author";
import {BookQueryResult} from "./components/bookQueryResult";
import {inputAuthorLastName, inputAuthorName, readFromConsole} from "./services/readingService";
import {setAuthor, setBooksForAuthor} from "./services/mapperService";
import {queryOpenLibrary} from "./services/fetchFromLibrary";


//console.log('http://openlibrary.org/authors/OL4064586A/works.json');
/*
var sucheButton: HTMLButtonElement;
sucheButton = document.getElementById("autorbutton") as HTMLButtonElement;
//sucheButton.addEventListener()

var inputEingabeElement : HTMLInputElement;
inputEingabeElement = document.getElementById("autortext") as HTMLInputElement;
*/

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
 */
async function checkNameAndGetKey(authorQueryResult :AuthorQueryResult) {
        for (let i = 0; i < authorQueryResult.docs.length; i++) {
            const nameTest = authorQueryResult.docs[i].name;
            console.log(authorQueryResult.docs[i].name);
            if (nameTest === inputAuthorName) {
                keyDetails = authorQueryResult.docs[i].key;
                setAuthor(authorQueryResult, i);
                console.log(keyDetails);
                return;
            }
        }
}

async function findAutorName() {
    // Pipeline
    while (keyDetails === undefined) {
        await readFromConsole("Bitte gib den Nachnamen des gesuchten Autors ein: ", "LASTNAME");
        const authorQueryResult: AuthorQueryResult | BookQueryResult = await queryOpenLibrary(concatQueryString(query, inputAuthorLastName), new AuthorQueryResult());

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
                    setAuthor(authorQueryResult, 0);
                    break;
                }
                default : {
                    console.log("Es wurden mehrere Datensätze gefunden!");
                    await readFromConsole("Bitte geben Sie den Namen detaillierter ein: ", "FULLNAME")
                    // Liste durchgehen und mit ID abgleichen
                    await checkNameAndGetKey(authorQueryResult);
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
        await findAutorName();
        const detailsAuthor : AuthorQueryResult|BookQueryResult = await queryOpenLibrary(concatQueryString(queryDetailsAuthor,keyDetails), new BookQueryResult());
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