import {describe, jest, it, expect} from "@jest/globals";
import { queryOpenLibrary} from "../services/fetchFromLibrary";
import {BookQueryResult} from "../components/bookQueryResult";


const RESULT_AUTHOR = {
    "numFound": 1,
    "start": 0,
    "numFoundExact": true,
    "docs": [
        {
            "key": "OL8263705A",
            "type": "author",
            "name": "Helmholtz-Zentrum Potsdam Helmholtz-Zentrum Potsdam - Deutsches GeoForschungsZentrum GFZ",
            "top_work": "Fokus : Erde : Focus",
            "top_subjects": [
                "Geology, history",
                "Geodesy",
                "Earth sciences"
            ]
            ,
            "_version_": 1735711982926954500
        }
    ]
}

const RESULT_BOOK = {
    "links": {
        "self": "/authors/OL8263705A/works.json",
        "author": "/authors/OL8263705A"
    },
    "size": 1,
    "entries": [
        {
            "last_modified": {
                "type": "/type/datetime",
                "value": "2020-08-24T21:47:46.442951"
            },
            "title": "Fokus : Erde : Focus",
            "created": {
                "type": "/type/datetime",
                "value": "2020-08-24T21:47:46.442951"
            },
            "subjects": [
                "Geodesy",
                "Earth sciences",
                "Geology, history"
            ],
            "latest_revision": 1,
            "key": "/works/OL21605151W",
            "authors": [
                {
                    "type": {
                        "key": "/type/author_role"
                    },
                    "author": {
                        "key": "/authors/OL8263705A"
                    }
                }
            ],
            "type": {
                "key": "/type/work"
            },
            "revision": 1
        }
    ]
};


const queryString = 'http://openlibrary.org/search/authors.json?q=gfz';
const queryBook = "http://openlibrary.org/authors/OL8263705A/works.json";


let mockFetch = jest.mocked(queryOpenLibrary);

jest.mock("../services/fetchFromLibrary");


describe('testet Abfrage von openLibrary', () => {
/*
    global.fetch = jest.fn() as jest.Mock;
    let mockFetch  = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(RESULT_AUTHOR),
        })
    );
//mockFetch.mock(fetch);

    jest.mock("../services/fetchFromLibrary");



    it('Test Author ', async() => {




        const authorTest = await queryOpenLibrary(queryString, AuthorQueryResult);
        expect(jest.mocked(mockFetch).mock.calls.length).toBe(0);

        console.log(authorTest);
        //expect(authorTest).toBeDefined();
        let test: AuthorQueryResult;
        test = authorTest as AuthorQueryResult;
        console.log(test);
        console.log ("if");
        //expect(test.docs[0].key).toBe("blub");


    });
*/
    //let mockFetch = jest.mocked(queryOpenLibrary);

    //jest.mock("../services/fetchFromLibrary");

    it('Test Book ', async() => {
        /*
        jest.mocked(mockFetch).mockImplementation((): Promise<any> => {
            return Promise.resolve({
                text() {
                    return Promise.resolve(JSON.stringify(RESULT_BOOK))}})});
*/

        jest.mocked(mockFetch).mockImplementation((): Promise<any> => {
                return Promise.resolve(JSON.stringify(RESULT_BOOK))});

        /*
        jest.mocked(mockFetch).mockImplementation(() => {
            return Promise.resolve(JSON.stringify(RESULT_BOOK));
        });
         */

        const bookTest = await queryOpenLibrary(queryBook, BookQueryResult);
        console.debug(bookTest);
        expect(jest.mocked(mockFetch).mock.calls.length).toBe(1);
        const bqR : BookQueryResult = bookTest as BookQueryResult;
        console.debug(bqR);
        expect(bqR).toBeDefined();
        if (bqR instanceof BookQueryResult) {
            console.log("bookTest is instance of queryResult");
            if (expect(bqR) instanceof BookQueryResult) {
                expect(bqR.entries[0].title).toBe("OL8263705A")
            }
        }
    });

});


