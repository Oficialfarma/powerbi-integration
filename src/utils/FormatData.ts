export class DateFormat
{
    public static dateFormatToQueryParams(date: Date): string
    {
        return new Date(date).toISOString().replace(/:/g, '%3A');
    }

    public static getActualTime(): Date 
    {
        return new Date();
    }
}