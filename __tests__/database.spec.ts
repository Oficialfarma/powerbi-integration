import { describe, expect, test } from "@jest/globals";
import { Database } from "../src/repositories/Database";

jest.unmock('axios');

describe("Database", () => {
    test("#For - Should return a database class instance", () => {
        const instance = Database.for();
        expect(instance).toBeInstanceOf(Database);
    })

    test("#build - Should return the empty object instance", async () => {

        const result = await Database.for().build().catch(err => err);
        
        expect(result).toEqual({})
    });
    
    test.todo("#From - Given a table name, it shoulds return all fields");

    test.todo("#Select - Should return only specified columns");
})