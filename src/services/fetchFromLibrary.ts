import {AuthorQueryResult} from "../components/authorQueryResult";
import {BookQueryResult} from "../components/bookQueryResult";

export async function getOpenLibrary(queryString: string):Promise<string> {
    const respons = await fetch(queryString);
    const result = await respons.json();
    console.debug("result", JSON.stringify(result, null, 2));
    return result;
}

export const queryOpenLibrary = async (queryString: string, resultObject: Object): Promise<AuthorQueryResult | BookQueryResult|string > => {
    try {
        let returnValue: any;
        if (resultObject instanceof AuthorQueryResult) {
            returnValue = new AuthorQueryResult()
        }
        if (resultObject instanceof BookQueryResult) {
            returnValue = new BookQueryResult()
        }

        if (queryString.length === 0) {
            return returnValue;
        }
        const result = await getOpenLibrary(queryString);

        return Object.assign(resultObject, result);
    } catch (e) {
        console.error("Fail", e)
        return "Fehler in der Abfrage";
    }
}