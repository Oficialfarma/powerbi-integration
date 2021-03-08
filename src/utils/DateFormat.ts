export class DateFormat
{
    /**
     * 
     * @param date - date string
     * @returns date object in the ISO string format
     */
    public static dateFormatToQueryParams(date: Date): string
    {
        return date.toISOString().replace(/:/g, '%3A');
    }
}