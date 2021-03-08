import { GetOptions } from "../src/utils/GetOptions"

describe("URL options", () => {
    it("Returns url and query params", () => {
        const getOptions = new GetOptions();
        const response = getOptions.urlOptions();
        const objectKeys = ["url", "queryParams", "options", "timeout"];

        expect(Object.keys(response)).toEqual(objectKeys);
    })
})