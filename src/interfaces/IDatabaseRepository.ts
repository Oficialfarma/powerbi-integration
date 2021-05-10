import { Database } from "../repositories/Database";

export interface IDatabaseRepository
{
    createConnection(): Database;
    select(columns: string): Database;
    from(tableName: string): Database;
    insertIntoTable(tableName: string): Database;
    values(values: object | object[]): Database;
    build(): Promise<object[] | string[]>;
}