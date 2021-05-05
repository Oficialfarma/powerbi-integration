export class DateFormat
{
    /**
     * @description Converts the date to the iso format that will
     * be passed in the api's query params
     * @param date - date string
     * @returns date object in the ISO string format
     */
    public static dateFormatToQueryParams(date: Date): string
    {
        return date.toISOString().replace(/:/g, '%3A');
    }
}