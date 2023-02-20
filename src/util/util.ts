export function concatQueryString(query: string, parameter: string) {
    if (parameter === "") return "";
    const newStr = query.replace("{1}", parameter);
    console.log(newStr);
    return newStr;
}

export function formatStringToDate(dateString: string){
    // Api schickt folgendes Format
    // Format XX-MM-DDDD
    const [day, month, year] = dateString.split('.');
    let dateToConvert;
    if ((!isNaN(+day) && !isNaN(+month) && !isNaN(+year)) &&
        ((1 <= +day) && (+day <= 31)) && (1 <= +month) && (+month <= 12)){
        dateToConvert = new Date();
        dateToConvert.setDate(+day);
        dateToConvert.setMonth(+month - 1);
        dateToConvert.setFullYear(+year);
    }
    return dateToConvert;
}