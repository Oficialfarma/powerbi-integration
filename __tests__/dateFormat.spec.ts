import { DateFormat } from "../src/utils/DateFormat";

describe("Date format", () => {
    it("Returns a date formated as the VTEX query params", () => {

        const date = new Date("04/03/2021 14:00:00.000Z");
        const dateObject = DateFormat.dateFormatToQueryParams(date);

        expect(dateObject).toBe('2021-04-03T14%3A00%3A00.000Z');
    })
});