export function concatQueryString(query: string, parameter: string) {
    if (parameter === "") return "";
    var newStr = query.replace("{1}", parameter);
    console.log(newStr);
    return newStr;
}