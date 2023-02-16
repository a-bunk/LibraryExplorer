import {describe, jest, it, expect} from "@jest/globals";
import {queryOpenLibrary} from "../services/fetchFromLibrary";
import {AuthorQueryResult} from "../components/authorQueryResult";
import {BookQueryResult} from "../components/bookQueryResult";

const RESULT_AUTHOR = {"numFound": 1,
    "start": 0,
    "numFoundExact": true,
    "docs": [
    {
        "key": "OL8263705A",
        "type": "author",
        "name": "Helmholtz-Zentrum Potsdam Helmholtz-Zentrum Potsdam - Deutsches GeoForschungsZentrum GFZ",
        "top_work": "Fokus : Erde : Focus",
        "work_count": 1,
        "top_subjects": [
            "Geology, history",
            "Geodesy",
            "Earth sciences"
        ],
        "_version_": 1735711982926954500
    }
]}


let mockFetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve( RESULT_AUTHOR  ),
}));

describe('testet stringToDate', () => {
    it('should ', async () => {
        const queryString = 'http://openlibrary.org/search/authors.json?q=gfz';
        const queryResult : AuthorQueryResult|BookQueryResult = await queryOpenLibrary(queryString, AuthorQueryResult);
        //expact(queryResult.)
        // TODO hier weitermachen
        expect(mockFetch).toHaveBeenCalledTimes(1);


    });
});





/*
import * as misc from "./misc";


function mockFetch(status: number, data?: { [key: string]: string }) {
    const response = { status, json: () => Promise.resolve(data) };

    window = jest.spyOn(misc, "getGlobalObject");

    window.mockReturnValue({ fetch: () => Promise.resolve(response) });
}

 */
/*
const data = {
    id: "1234",
    name: "My Repository",
    url: "https://api.github.com/repos/cesarwbr/overreacted.io"
};

const results = [
    {
        info: {
            pages: 2,
            count: 6,
            next: "https://rickandmortyapi.com/api/character?page=2",
            prev: null,
        },
        results: [
            {
                id: 1,
                name: "Rick Sanchez",
                status: "Alive",
                species: "Human",
                gender: "Male",
                origin: {
                    name: "Earth (C-137)",
                    url: "https://rickandmortyapi.com/api/location/1",
                },
                image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            },
            //...
        ],
    },

    {
        info: {
            //...
        },
        results: [
            //...
        ],
    },
];

//mockFetch(200, data);

my-class.ts:

import fetch from 'node-fetch';

export class MyClass {
    async postEvent(event) {
        const headers = {
            'Content-type': 'application/json',
            'Api-Key': 'APIKEY',
        };

        const response = await fetch('url', {
            method: 'POST',
            body: event,
            headers: headers,
        });
        return response.json();
    }
}
*/
/*
//import { MyClass } from './my-class';
import fetch from 'node-fetch';

jest.mock('node-fetch');
const { Response } = jest.requireActual('node-fetch');

describe('69579937', () => {
    it('Calls mockedFetch and gets the mocked values', async () => {
        expect(fetch).toHaveBeenCalledTimes(0);

        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
            new Response(JSON.stringify({ name: 'teresa teng' }), { url: 'url', status: 200, statusText: 'OK' })
        );
        const myclass = new MyClass();
        const response = await myclass.postEvent('testMsg');
        expect(response).toEqual({ name: 'teresa teng' });
    });
});
*/