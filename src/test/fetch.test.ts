import {describe,  it, expect} from "@jest/globals";
import {queryOpenLibrary} from "../services/fetchFromLibrary";
import {BookQueryResult} from "../components/bookQueryResult";
import {AuthorQueryResult} from "../components/authorQueryResult";



const RESULT_AUTHOR = {
    "numFound": 1,
    "start": 0,
    "numFoundExact": true,
    "docs": [
        {
            "key": "keyTest",
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


describe('testet Abfrage von openLibrary',
    () => {

        global.fetch = jest.fn() as jest.Mock;

        beforeEach(() => {
            jest.mocked(fetch).mockClear();
        });


        it('Test Author ', async () => {
            jest.mocked(fetch).mockImplementation((): Promise<any> => {
                return Promise.resolve({
                    json() {
                        return Promise.resolve(RESULT_AUTHOR)
                    }
                })
            });


            const authorTest = await queryOpenLibrary(queryString, AuthorQueryResult);
            expect(jest.mocked(fetch).mock.calls.length).toBe(1);
            expect(authorTest).toBeDefined();

            let test: AuthorQueryResult;
            test = authorTest as AuthorQueryResult;

            expect(test.docs[0].key).toBe("keyTest");

        });

    it('Test Book ', async() => {

        jest.mocked(fetch).mockImplementation((): Promise<any> => {
            return Promise.resolve({
                json() {
                    return Promise.resolve(RESULT_BOOK)}})});

                const bookTest = await queryOpenLibrary(queryBook, BookQueryResult);
                expect(jest.mocked(fetch).mock.calls.length).toBe(1);
                const bqR : BookQueryResult = bookTest as BookQueryResult;
                expect(bqR).toBeDefined();
                expect(bqR.entries[0].title).toBe("Fokus : Erde : Focus")
            });

    });


