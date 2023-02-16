export class Author {

    private static instance:Author;
    autorName!: string;
    anzahlEintraege!: number;

    topWork!: string;

    birthdate! : Date;

    birthyear! : number;

    keyWords!: string[];

    constructor() {
    };

    static getInstance() {
        if (Author.instance) {
            return this.instance;
        }
        this.instance = new Author();
        return this.instance;
    }

    bookTitle!: string[];

    printAuthor() {
        console.log("------------------------------------------------------------------------------------------------");
        console.log("AUTOR")
        console.log("Autor: " + this.autorName);
        if (this.birthdate !== undefined){
            console.log("Geburtsdatum: " + this.birthdate.getDate().toString() + "." + (this.birthdate.getMonth() + 1).toString() + "." + this.birthdate.getFullYear());
        }
        if (this.birthyear !== undefined){
            console.log("Geburtsjahr: " + this.birthyear);
        }
        if (this.keyWords !== undefined) {
            var keywordsOutput: string = "Schlagwörter: ";
            for (let i = 0; i < this.keyWords.length; i++) {
                keywordsOutput = keywordsOutput + this.keyWords[i];
            }
            console.log(keywordsOutput);
        }
        console.log("Anzahl gefundener Einträge: " + this.anzahlEintraege);
        if (this.topWork !== undefined) console.log("Hauptwerk: " + this.topWork);
        if (this.bookTitle !== undefined) {
            console.log("Titel")
            for (let i = 0; i < this.bookTitle.length; i++) {
                console.log("      " + this.bookTitle[i]);
            }
        }


    }


}