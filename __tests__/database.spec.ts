import dotenv from 'dotenv';
dotenv.config();

import { describe, expect, test } from "@jest/globals";
import { Database } from "../src/repositories/Database";
import * as sql from 'mssql';

jest.unmock('axios');
jest.unmock('mssql');

const resetDatabase = async () => {
    const config = {
        user: process.env.DB_USERID_TEST,
        password: process.env.DB_PASS_TEST,
        server: process.env.DB_SERVER_TEST,
        database: process.env.DB_NAME_TEST,
        options: {
            encrypt: true,
            enableArithAbort: true
        }
    }
    
    const connPool = new sql.ConnectionPool(config);

    await connPool.connect();

    await connPool.query('TRUNCATE TABLE requestStatus');

    await connPool
        .query("INSERT INTO [requestStatus](id_status, requestStatus, lastTimeRequest) VALUES(1, 1, '2021-05-11T13:59:32.750Z')");
}

describe("Database", () => {

    beforeEach(async () => {
        await resetDatabase();
    });
    
    test("#For - Should return a database class instance", () => {
        const instance = new Database();
        expect(instance).toBeInstanceOf(Database);
    })

    test("#build - Should return the empty object instance", async () => {

        const result = await new Database().createConnection().build();
        
        expect(result).toEqual([{}])
    });
    
    test("#From - Given a table name, it shoulds return all fields", async () => {
        const db = new Database().createConnection();

        const result = await db.from("requestStatus").build();

        const expected = [{
            id_status: 1,
            lastTimeRequest: new Date("2021-05-11T13:59:32.750Z"),
            requestStatus: true
        }]

        expect(result).toEqual(expected);
    });

    test("#Select - Should return only specified columns", async () => {
        const db = new Database().createConnection();

        const result = await db
            .select('lastTimeRequest')
            .from('requestStatus')
            .build();

        const expected = [{
            lastTimeRequest: new Date("2021-05-11T13:59:32.750Z")
        }];
        
        const resultChained = await db
            .select('lastTimeRequest')
            .from('requestStatus')
            .select('id_status')
            .from('requestStatus')
            .build();

        const expectedSelectChained = [
            {
                lastTimeRequest: new Date('2021-05-11T13:59:32.750Z') 
            },
            {
                id_status: 1
            }
        ];

        expect(result).toStrictEqual(expected);
        expect(resultChained).toStrictEqual(expectedSelectChained);
    });

    test('#Insert - should insert datas in the table', async () => {
        const db = new Database().createConnection();

        const insertResult = await db
            .insertInto('requestStatus')
            .values({
                id_status:2,
                requestStatus: 0,
                lastTimeRequest: "'" + new Date().toISOString() + "'"
            })
            .build();

        const expected = [1];

        const insertResultChained = await db.
            insertInto('requestStatus')
            .values({
                id_status:3,
                requestStatus: 0,
                lastTimeRequest: "'" + new Date().toISOString() + "'"
            })
            .insertInto('requestStatus')
            .values({
                id_status:4,
                requestStatus: 1,
                lastTimeRequest: "'" + new Date().toISOString() + "'"
            })
            .build();

        const expectedResultInsertChained = [1,1];

        const insertResultArrayValues = await db
            .insertInto('requestStatus')
            .values([
                {
                    id_status:5,
                    requestStatus: 0,
                    lastTimeRequest: "'" + new Date().toISOString() + "'"
                },
                {
                    id_status:6,
                    requestStatus: 0,
                    lastTimeRequest: "'" + new Date().toISOString() + "'"
                }
            ])
            .build();

        const expectedResultArray = [2];

        expect(insertResult).toStrictEqual(expected);
        expect(insertResultChained).toStrictEqual(expectedResultInsertChained);
        expect(insertResultArrayValues).toStrictEqual(expectedResultArray);
    });

    test('#Update - should update a row in the table', async () => {
        const db = new Database().createConnection();

        const result = await db
            .update('requestStatus')
            .set({
                requestStatus: 0
            })
            .where('id_status=1')
            .build();

        const expected = [1];

        const resultChained = await db
            .update('requestStatus')
            .set({
                lastTimeRequest: "'" + new Date('2021-05-10T13:59:32.750Z').toISOString() + "'"
            })
            .where('id_status=1')
            .update('requestStatus')
            .set({
                lastTimeRequest: "'" + new Date('2021-05-11T13:59:32.750Z').toISOString() + "'"
            })
            .where('id_status=1')
            .build();

        const expectedChained = [1,1];

        expect(result).toStrictEqual(expected);
        expect(resultChained).toStrictEqual(expectedChained);
    });

    test("#Delete - should remove a row", async () => {
        const db = new Database().createConnection();

        await db.insertInto('requestStatus')
            .values({
                id_status:2,
                requestStatus: 0,
                lastTimeRequest: "'" + new Date().toISOString() + "'"
            })
            .build();

        const result = await db
            .deleteFrom('requestStatus')
            .where('id_status=2')
            .build();

        const expected = [1];

        expect(result).toStrictEqual(expected);
    });

    test('#error - should return a request error', async () => {
        const db = new Database().createConnection();

        const result = await db.from('fakeTable')
            .select('anyColumn')
            .build();

        expect(result).toBeInstanceOf(sql.RequestError);
    });

    test.only('#error - should return a erro in sql.Transaction create', async () => {

        sql.ConnectionPool.prototype.connect = jest.fn().mockImplementation(() => {
            throw new Error('ENOTOPEN (ConnectionError)');
        });
        
        const db = new Database().createConnection();

        const result = await db
            .insertInto('requestStatus')
            .values({
                id_status:2,
                requestStatus: 0,
                lastTimeRequest: "'" + new Date().toISOString() + "'"
            })
            .build();
            
        expect(result).toEqual(new Error('ENOTOPEN (ConnectionError)'));
    })
})