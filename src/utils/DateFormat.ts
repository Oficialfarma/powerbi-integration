export class DateFormat
{
    /**
     * 
     * @param date - date string
     * @returns date object in the ISO string format (YYYY-dd-mmT00:00:00.000Z) formated as the VTEX query params
     */
    public static dateFormatToQueryParams(date: Date): string
    {
        return new Date(date).toISOString().replace(/:/g, '%3A');
    }

    public static getActualTime(): Date 
    {
        return new Date();
    }
}