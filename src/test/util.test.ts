import {concatQueryString, formatStringToDate} from "../util/util";
import {test, describe, expect} from "@jest/globals";

describe('testet concatQueryString', () => {
    test ('ein Paramter', () => {

        expect(concatQueryString("Test {1}","1")).toBe("Test 1");
    });
})

describe('testet stringToDate', () => {
    test ('richtiges Datum', () => {
        const dateTest : Date = new Date("1976-03-13");
        const testResult = formatStringToDate("13.03.1976");
        expect(testResult).not.toBeUndefined();
        if (testResult !== undefined){
            expect(testResult.getFullYear()).toBe(dateTest.getFullYear());
            expect (testResult.getMonth()).toBe(dateTest.getMonth());
            expect(testResult.getDay()).toBe(dateTest.getDay());
        }
    });
})

describe ('testet stringToDate', () => {
    test ("ungültiges Datum", () => {
        expect(formatStringToDate("13.XX.1976")).toBeUndefined();
    });

    test ("98 als Monat : was passiert?", () => {
        expect(formatStringToDate("13.98.1976")).toBeUndefined();
    });
})

