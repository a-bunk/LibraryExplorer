import {concatQueryString} from "./src/util.js";
import {test, describe, expect} from "@jest/globals";

/*
import {Config} from 'jest';

const config: Config = {
    verbose: true,
};

export default config;
*/
describe('testet concatQueryString', () => {
    test ('ein Paramter', () => {

        expect(concatQueryString("Test {1}","1")).toBe("Test 1");
    });
})