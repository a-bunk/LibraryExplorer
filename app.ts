import {createInterface} from "readline/promises";

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
    console.log(fillInString);
}


// Test der ReadlineAPI


//console.log('http://openlibrary.org/authors/OL4064586A/works.json');
/*
var sucheButton: HTMLButtonElement;
sucheButton = document.getElementById("autorbutton") as HTMLButtonElement;
//sucheButton.addEventListener()

var inputEingabeElement : HTMLInputElement;
inputEingabeElement = document.getElementById("autortext") as HTMLInputElement;
*/




var query = 'http://openlibrary.org/search/authors.json?q={1}';
// http://openlibrary.org/authors/OL4064586A/works.json
var queryDetailsAuthor1 = 'http://openlibrary.org/authors/{1}/works.json';

// kann nach Util rein


function concatQueryString(query:string, parameter:string) {
    if (parameter === "") return "";
    var newStr = query.replace("{1}", parameter);
    console.log(newStr);
    return newStr;
}

//concatQueryString(query, "Siegner");
//concatQueryString(queryDetailsAuthor1, "Test");

var keyDetails = "";


class AuthorQueryResultDetails {
    key!:string;
    type! :string;

    name!:string;
}

class AuthorQueryResult {
    numFound!: number;
    start!: number;
    numFoundExact!: boolean
    docs!:[AuthorQueryResultDetails];

    constructor() {
    }

}

// TODO wird die noch benötigt?
class Autor{
    autorName!: string;
    anzahlEintraege!: number;

    constructor(autorName = "") {
        this.autorName = autorName;
    }

}

class Books{
    title!: string;

    //created!: {type!: string, value!: string }
    constructor() {
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


var  ergebnisO : AuthorQueryResult|AuthorQueryResultDetails;
var counter : number;

/*
async function asyncTestFunction(inputAuthorLastName: string) {
    try {
        console.log(query + inputAuthorLastName);
        if (inputAuthorLastName === "")
             return;
        const respons = await fetch(query + inputAuthorLastName);
        const result = await respons.json();
        console.log("result", JSON.stringify(result, null, 2));

        //let ergebnisL = plainToClass(Ergebnis, result);
        ergebnisO = Object.assign(new AuthorQueryResult(), result);

        console.log("Anzahl Einträge: " + ergebnisO.numFound);
        counter = ergebnisO.numFound;
        return ergebnisO;
    } catch (e) {
        console.error("Fail", e)
    }
}
 */

async function queryOpenLibrary(queryString: string, resultObject : Object) {
    try {
        console.log("openLibraryQuery:" +  queryString );
        if (queryString.length === 0){
            return "";
        }
        const respons = await fetch(queryString);
        const result = await respons.json();
        console.log("result", JSON.stringify(result, null, 2));

        //let ergebnisL = plainToClass(Ergebnis, result);
        ergebnisO = Object.assign(resultObject, result);

    } catch (e) {
        console.error("Fail", e)
    }
}

async function checkNameAndGetKey() {
    if ("docs" in ergebnisO) {
        for (let i = 0; i < ergebnisO.docs.length; i++) {
            var nameTest = ergebnisO.docs[i].name;
            console.log(ergebnisO.docs[i].name);
            if (nameTest === inputAuthorName) {
                keyDetails = ergebnisO.docs[i].key;
                console.log(ergebnisO.docs[i].name);
                console.log(keyDetails);
                return;
            }
        }
    }
}

function checkFirstQuery(){
    {
        if (counter > 1) {
            return CounterResults.MORERESULTS;
        }
        if (counter == 0) {
            return CounterResults.NORESULT;
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
        const respons = await fetch(queryDetailsAuthor1 + keyDetails + queryDetailsAuthor3);
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

        await queryOpenLibrary(concatQueryString(query,inputAuthorLastName), new AuthorQueryResult());
        //await asyncTestFunction(inputAuthorLastName);
        if ("numFound" in ergebnisO ) {
            counter = ergebnisO.numFound as number;
            console.log("Einträge counter " + counter);
        }
        if (checkFirstQuery()===CounterResults.MORERESULTS){
            await readFromConsole("Bitte geben Sie den Namen detaillierter ein.", "FULLNAME")
            // Liste durchgehen und mit ID abgleichen
            await checkNameAndGetKey();
        }


        await queryOpenLibrary(concatQueryString(queryDetailsAuthor1,keyDetails), new DetailAbfrage());
        if ("size" in ergebnisO) {
            console.log(`Einträge für ${inputAuthorName} ${ergebnisO.size}`);
        }

        if ("entries" in ergebnisO) {
            var books : [Books] = ergebnisO.entries as [Books];
            for (let i = 0; i < books.length; i++) console.log(books[i].title);
        }


    } catch (e) {
        console.error("Fail", e)
    }
}


fuehreAbfragenAus();