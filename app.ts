import {createInterface} from "readline/promises";
import {concatQueryString} from "./src/util.js";
import {AuthorQueryResultDetails} from "./src/components/authorQueryResultDetails.js";
import {AuthorQueryResult} from "./src/components/authorQueryResult.js";
import {Books} from "./src/components/books.js";
import any = jasmine.any;

var inputAuthorLastName:string  = '';
var inputAuthorName: string = '';

async function readFromConsole(consoleText:string, fillInString: string) {
    const cli = createInterface({
        input: process.stdin,
        output: process.stdout
    })
    var cText : string = await cli.question(consoleText);
    if (fillInString==="FULLNAME" ){
        inputAuthorName = cText;
    } else {
        inputAuthorLastName = cText;
    }

    cli.close();
}


//console.log('http://openlibrary.org/authors/OL4064586A/works.json');
/*
var sucheButton: HTMLButtonElement;
sucheButton = document.getElementById("autorbutton") as HTMLButtonElement;
//sucheButton.addEventListener()

var inputEingabeElement : HTMLInputElement;
inputEingabeElement = document.getElementById("autortext") as HTMLInputElement;
*/

var query : string = 'http://openlibrary.org/search/authors.json?q={1}';
var queryDetailsAuthor : string  = 'http://openlibrary.org/authors/{1}/works.json';
var keyDetails : string = "";


// TODO wird die noch benötigt?
class Author{
    autorName!: string;
    anzahlEintraege!: number;

    topWork!: string;

    constructor(autorName = "") {
        this.autorName = autorName;
    };

    bookTitle!:  [string] ;

    printAuthor() {
        console.log("Autor: " + this.autorName);
        console.log("Anzahl gefundener Einträge: " + this.anzahlEintraege);
        // TODO Hier noch abfragen, ob definiert oder nicht
        console.log("Hauptwerk: " + this.topWork);
        console.log("Titel")
        for (let i = 0; i < this.bookTitle.length; i++) {
            console.log("      " + this.bookTitle[i]);

        }
    }
}

class DetailAbfrage {
    size!: number;

    entries!: [Books];

    constructor() {
    }
}

enum CounterResults {
    NORESULT,
    ONERESULT,
    MORERESULTS

}


var  resultObject : AuthorQueryResult|AuthorQueryResultDetails;
var counter : number;



const queryOpenLibrary = async (queryString: string, resultObject: Object): Promise<AuthorQueryResult|DetailAbfrage> => {
    //const { data } = await fetch(url)
    try {
        var returnValue: AuthorQueryResult|DetailAbfrage;
        if (resultObject instanceof AuthorQueryResult) {returnValue = new AuthorQueryResult()};
        if (resultObject instanceof DetailAbfrage) {returnValue = new DetailAbfrage()};

       if (queryString.length === 0){
            return returnValue;
        }
        const respons = await fetch(queryString);
        const result = await respons.json();
        console.log("result", JSON.stringify(result, null, 2));

        //let ergebnisL = plainToClass(Ergebnis, result);
        const dataObject = Object.assign(resultObject, result);
        //console.log( ("numFound" in resultObject ) ? resultObject.numFound:"kein Objekt");
        return dataObject;
    } catch (e) {
        console.error("Fail", e)
        return returnValue;
    }
    //return data
}


async function queryOpenLibrary(queryString: string, resultObject : Object) {
    try {
        if (queryString.length === 0){
            return "";
        }
        const respons = await fetch(queryString);
        const result = await respons.json();
        console.log("result", JSON.stringify(result, null, 2));

        //let ergebnisL = plainToClass(Ergebnis, result);
        resultObject = Object.assign(resultObject, result);
        //console.log( ("numFound" in resultObject ) ? resultObject.numFound:"kein Objekt");
        return resultObject;
    } catch (e) {
        console.error("Fail", e)
    }
}



async function checkNameAndGetKey(authorQueryResult :AuthorQueryResult) {
        for (let i = 0; i < authorQueryResult.docs.length; i++) {
            var nameTest = authorQueryResult.docs[i].name;
            console.log(authorQueryResult.docs[i].name);
            if (nameTest === inputAuthorName) {
                keyDetails = authorQueryResult.docs[i].key;
                console.log(authorQueryResult.docs[i].name);
                console.log(keyDetails);
                return;
            }
        }
}


/*
async function asyncTestFunctionDetails(keyDetails :string) {
    console.log("start asyncTestFunctionDetails");
    try {
        if (keyDetails.length === 0) {
            console.log("in asyncTestFunction: " + keyDetails)
            return;
        }
        const respons = await fetch(queryDetailsAuthor + keyDetails + queryDetailsAuthor3);
        const result = await respons.json();
        //console.log("result", JSON.stringify(result, null, 2));


        let ergebnisDetailAbfrage = Object.assign(new DetailAbfrage(), result);

        console.log(`Einträge für ${inputAuthorName} ${ergebnisDetailAbfrage.size}`);

        for (let i = 0; i < ergebnisDetailAbfrage.entries.length; i++) console.log(ergebnisDetailAbfrage.entries[i].title);

        return ergebnisDetailAbfrage;


    } catch (e) {
        console.error("Fail", e)
    }
}
*/


async function fuehreAbfragenAus(){
    try {
        // Pipeline
        await readFromConsole("Bitte gib den Nachnamen des gesuchten Autors ein: ", "LASTNAME");
        var authorQueryResult : AuthorQueryResult = await queryOpenLibrary(concatQueryString(query,inputAuthorLastName), new AuthorQueryResult());
        //await asyncTestFunction(inputAuthorLastName);
        console.log("Nach der Abfrage");
        counter = authorQueryResult.numFound as number;
        console.log("Einträge counter " + counter);

        if (counter >= CounterResults.MORERESULTS){
            await readFromConsole("Bitte geben Sie den Namen detaillierter ein: ", "FULLNAME")
            // Liste durchgehen und mit ID abgleichen
            await checkNameAndGetKey(authorQueryResult);
        }

        if (counter === CounterResults.NORESULT){
            console.log("Keine Ergebnise gefunden!")
            return;
        }

        if (counter===CounterResults.ONERESULT){
            keyDetails = authorQueryResult.docs[0].key;
            console.log(keyDetails);
        }
/*
        await queryOpenLibrary(concatQueryString(queryDetailsAuthor,keyDetails), new DetailAbfrage());
        if ("size" in resultObject) {
            console.log(`Einträge für ${inputAuthorName} ${resultObject.size}`);
        }

        // Mapping Objekt in Autor
        var author: Author = new Author(inputAuthorName);

        if ("entries" in resultObject) {
            var books : [Books] = resultObject.entries as [Books];
            author.anzahlEintraege = books.length;
            for (let i = 0; i < books.length; i++) console.log(books[i].title);
        }

        author.printAuthor();
*/
    } catch (e) {
        console.error("Fail", e)
    }
}


fuehreAbfragenAus();