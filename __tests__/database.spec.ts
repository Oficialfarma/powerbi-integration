import dotenv from 'dotenv';
dotenv.config();

import { describe, expect, test } from "@jest/globals";
import { Database } from "../src/repositories/Database";
import * as sql from 'mssql';

jest.unmock('axios');

describe("Database", () => {
    test("#For - Should return a database class instance", () => {
        const instance = Database.for();
        expect(instance).toBeInstanceOf(Database);
    })

    test("#build - Should return the empty object instance", async () => {

        const result = await Database.for().build().catch(err => err);
        
        expect(result).toEqual([{}])
    });
    
    test("#From - Given a table name, it shoulds return all fields", async () => {
        const db = Database.for().createConnection();

        const result = await db.from("requestStatus").build();

        const expected = [{
            id_status: 1,
            lastTimeRequest: new Date("2021-05-04T11:35:45.480Z"),
            requestStatus: true
        }]

        expect(result).toEqual(expected);
    });

    test("#Select - Should return only specified columns", async () => {
        const db = Database.for().createConnection();

        const result = await 
            db.from('requestStatus')
            .select('lastTimeRequest')
            .build();

        const expected = [{
            lastTimeRequest: new Date("2021-05-04T11:35:45.480Z")
        }];

        expect(result).toStrictEqual(expected);
    });

    test('#error - should return a request error', async () => {
        const db = Database.for().createConnection();

        const result = await db.from('fakeTable')
            .select('anyColumn')
            .build();

        expect(result).toBeInstanceOf(sql.RequestError);
    });
})