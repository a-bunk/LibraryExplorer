import {AuthorQueryResult} from "../components/authorQueryResult";
import {BookQueryResult} from "../components/bookQueryResult";

export const queryOpenLibrary = async (queryString: string, resultObject: Object): Promise<AuthorQueryResult | BookQueryResult> => {
    try {
        var returnValue: any;
        if (resultObject instanceof AuthorQueryResult) {
            returnValue = new AuthorQueryResult()
        }
        ;
        if (resultObject instanceof BookQueryResult) {
            returnValue = new BookQueryResult()
        }
        ;

        if (queryString.length === 0) {
            return returnValue;
        }
        const respons = await fetch(queryString);
        const result = await respons.json();
        console.debug("result", JSON.stringify(result, null, 2));

        const dataObject = Object.assign(resultObject, result);
        return dataObject;
    } catch (e) {
        console.error("Fail", e)
        return returnValue;
    }
}